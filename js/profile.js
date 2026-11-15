/**
 * WorkSphere - Profile & Services Management Controller
 * Week 3: Profile Overview, Edit Profile Form, and "My Services" Dashboard
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initProfileTabs();
  loadAndRenderProfile();
  initEditProfileForm();
  renderMyServices();
});

let selectedProfileAvatar = "";

/* ===================================================================
   Tab Navigation Controller
   =================================================================== */
function initProfileTabs() {
  const tabLinks = document.querySelectorAll(".profile-tab-link");
  const tabPanes = document.querySelectorAll(".tab-pane");
  const btnGoToEdit = document.getElementById("btnGoToEdit");
  const btnCancelEdit = document.getElementById("btnCancelEdit");
  const ovEditShortcutBtn = document.getElementById("ovEditShortcutBtn");

  function switchTab(tabKey) {
    tabLinks.forEach(link => {
      if (link.getAttribute("data-tab") === tabKey) {
        link.classList.add("active");
        link.setAttribute("aria-selected", "true");
      } else {
        link.classList.remove("active");
        link.setAttribute("aria-selected", "false");
      }
    });

    tabPanes.forEach(pane => {
      pane.style.display = "none";
      pane.classList.remove("active");
    });

    const targetPane = document.getElementById(`pane${capitalize(tabKey)}`);
    if (targetPane) {
      targetPane.style.display = "block";
      targetPane.classList.add("active");
    }

    // Update URL hash without reload
    history.replaceState(null, null, `?tab=${tabKey}`);
  }

  tabLinks.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabKey = btn.getAttribute("data-tab");
      switchTab(tabKey);
    });
  });

  if (btnGoToEdit) btnGoToEdit.addEventListener("click", () => switchTab("edit"));
  if (btnCancelEdit) btnCancelEdit.addEventListener("click", () => switchTab("overview"));
  if (ovEditShortcutBtn) ovEditShortcutBtn.addEventListener("click", () => switchTab("edit"));

  // Check initial URL param
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get("tab") || "overview";
  switchTab(initialTab);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ===================================================================
   Load & Render User Profile
   =================================================================== */
function loadAndRenderProfile() {
  const profile = window.MARKETPLACE_DATA.getCurrentUserProfile();

  // Header display elements
  setText("userNameDisplay", profile.name);
  setText("userTitleDisplay", profile.title);
  setText("userLocationDisplay", `📍 ${profile.location}`);
  setText("userRatingDisplay", `⭐ ${profile.rating} (${profile.reviewsCount} reviews)`);
  setText("userRateDisplay", `💵 $${profile.hourlyRate}/hr`);
  setText("userBadgeDisplay", profile.badge);

  const avatarImg = document.getElementById("userAvatarDisplay");
  if (avatarImg) {
    avatarImg.src = profile.avatar;
    avatarImg.alt = profile.name;
  }
  const avatarPreview = document.getElementById("editAvatarPreview");
  if (avatarPreview) {
    avatarPreview.src = profile.avatar;
    avatarPreview.alt = `${profile.name} profile photo preview`;
  }

  // Overview Tab elements
  setText("ovHourlyRate", `$${profile.hourlyRate} / hr`);
  setText("ovStartingPrice", `$${profile.startingPrice}`);
  setText("ovExperience", profile.experienceLevel || "Senior Specialist");
  setText("ovCategory", profile.category);
  setText("ovLocation", profile.location);
  setText("ovLanguages", profile.languages);
  setText("ovBioText", profile.bio);

  // Overview skills
  const skillsContainer = document.getElementById("ovSkillsList");
  if (skillsContainer && profile.skills) {
    skillsContainer.innerHTML = profile.skills.map(skill => `
      <span class="fl-skill-tag" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${skill}</span>
    `).join("");
  }

  // Pre-fill Edit form
  setVal("editFullName", profile.name);
  setVal("editTitle", profile.title);
  setVal("editCategory", profile.category);
  setVal("editExperience", profile.experienceLevel);
  setVal("editHourlyRate", profile.hourlyRate);
  setVal("editStartingPrice", profile.startingPrice);
  setVal("editLocation", profile.location);
  setVal("editLanguages", profile.languages);
  setVal("editAvatarUrl", profile.avatar);
  setVal("editBio", profile.bio);
  setVal("editSkills", Array.isArray(profile.skills) ? profile.skills.join(", ") : profile.skills);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.value = val;
}

/* ===================================================================
   Edit Profile Form Submission & Validation
   =================================================================== */
function initEditProfileForm() {
  const form = document.getElementById("editProfileForm");
  const btnReset = document.getElementById("btnResetProfile");
  const avatarFileInput = document.getElementById("editAvatarFile");
  const avatarUrlInput = document.getElementById("editAvatarUrl");
  const avatarPreview = document.getElementById("editAvatarPreview");
  const photoStatus = document.getElementById("profilePhotoStatus");

  if (avatarFileInput) {
    avatarFileInput.addEventListener("change", () => {
      const file = avatarFileInput.files && avatarFileInput.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        photoStatus.textContent = "Choose an image file.";
        avatarFileInput.value = "";
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        photoStatus.textContent = "Choose an image smaller than 8 MB.";
        avatarFileInput.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const maxDimension = 512;
          const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext("2d");
          if (!context) {
            photoStatus.textContent = "This image could not be processed. Try another file.";
            return;
          }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          selectedProfileAvatar = canvas.toDataURL("image/jpeg", 0.82);
          avatarUrlInput.value = "";
          avatarPreview.src = selectedProfileAvatar;
          photoStatus.textContent = "Photo ready. Save profile changes to keep it on this device.";
        };
        image.onerror = () => {
          photoStatus.textContent = "This image could not be opened. Try another file.";
        };
        image.src = reader.result;
      };
      reader.onerror = () => {
        photoStatus.textContent = "The selected photo could not be read.";
      };
      reader.readAsDataURL(file);
    });
  }

  if (avatarUrlInput) {
    avatarUrlInput.addEventListener("input", () => {
      selectedProfileAvatar = "";
      if (avatarFileInput) avatarFileInput.value = "";
      if (avatarUrlInput.value.trim()) {
        avatarPreview.src = avatarUrlInput.value.trim();
        photoStatus.textContent = "Image URL selected. Save profile changes to apply it.";
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("editFullName").value.trim();
      const title = document.getElementById("editTitle").value.trim();
      const category = document.getElementById("editCategory").value;
      const experience = document.getElementById("editExperience").value;
      const hourlyRate = parseInt(document.getElementById("editHourlyRate").value, 10);
      const startingPrice = parseInt(document.getElementById("editStartingPrice").value, 10);
      const location = document.getElementById("editLocation").value.trim() || "Global Remote";
      const languages = document.getElementById("editLanguages").value.trim() || "English";
      let avatar = selectedProfileAvatar || document.getElementById("editAvatarUrl").value.trim();
      const bio = document.getElementById("editBio").value.trim();
      const skillsRaw = document.getElementById("editSkills").value.trim();

      // Basic Validation
      if (!name || name.length < 2) {
        alert("Please enter a valid full name.");
        return;
      }
      if (!title || title.length < 5) {
        alert("Please enter a professional title (minimum 5 characters).");
        return;
      }
      if (isNaN(hourlyRate) || hourlyRate < 5) {
        alert("Hourly rate must be at least $5/hr.");
        return;
      }
      if (isNaN(startingPrice) || startingPrice < 10) {
        alert("Starting price must be at least $10.");
        return;
      }
      if (!bio || bio.length < 20) {
        alert("Please write a bio of at least 20 characters.");
        return;
      }

      if (!avatar) avatar = window.MARKETPLACE_DATA.getCurrentUserProfile().avatar;
      if (!avatar.startsWith("data:image/") && !/^https?:\/\//i.test(avatar)) {
        alert("Enter a valid http(s) image URL or choose a photo from your device.");
        return;
      }

      const skills = skillsRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);

      const updatedProfile = {
        name,
        title,
        category,
        experienceLevel: experience,
        hourlyRate,
        startingPrice,
        location,
        languages,
        avatar,
        bio,
        skills,
        rating: 4.95,
        reviewsCount: 128,
        completedJobs: 94,
        badge: "Top Rated Plus"
      };

      window.MARKETPLACE_DATA.saveCurrentUserProfile(updatedProfile);
      selectedProfileAvatar = "";
      if (avatarFileInput) avatarFileInput.value = "";
      loadAndRenderProfile();

      showToast("Profile information successfully updated!");

      // Switch back to overview tab
      const tabNavOverview = document.getElementById("tabNavOverview");
      if (tabNavOverview) tabNavOverview.click();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      if (confirm("Reset profile details back to default demonstration values?")) {
        localStorage.removeItem("worksphere_user_profile");
        selectedProfileAvatar = "";
        if (avatarFileInput) avatarFileInput.value = "";
        loadAndRenderProfile();
        showToast("Profile reset to default values.");
      }
    });
  }
}

/* ===================================================================
   "My Services" Dashboard Section (View, Edit, Delete)
   =================================================================== */
function renderMyServices() {
  const container = document.getElementById("myServicesListContainer");
  const emptyState = document.getElementById("noServicesEmptyState");
  const countBadge = document.getElementById("myServicesCountBadge");
  const ovServicesGrid = document.getElementById("ovServicesGrid");

  const services = window.MARKETPLACE_DATA.getLocalServices();

  if (countBadge) countBadge.innerText = services.length;

  if (services.length === 0) {
    if (container) {
      container.innerHTML = "";
      container.style.display = "none";
    }
    if (emptyState) emptyState.style.display = "block";
    if (ovServicesGrid) {
      ovServicesGrid.innerHTML = `
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          No active services listed yet. Click <strong>+ Add Service</strong> to post your first gig!
        </p>
      `;
    }
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (container) {
    container.style.display = "flex";
    container.innerHTML = services.map(srv => `
      <div class="my-service-card-row" id="service-row-${srv.id}">
        <div class="my-service-img-col">
          <img src="${srv.thumbnail}" alt="${srv.title}">
          <span class="service-category-badge" style="font-size:0.7rem; top:8px; left:8px;">${srv.category}</span>
        </div>

        <div class="my-service-info-col">
          <h4 class="my-service-title">${srv.title}</h4>
          <p class="my-service-desc">${srv.description ? srv.description.substring(0, 110) + '...' : ''}</p>
          <div class="my-service-meta">
            <span>💵 Price: <strong>$${srv.startingPrice}</strong></span>
            <span>⏱️ Delivery: <strong>${srv.deliveryDays} Days</strong></span>
            <span>⭐ Rating: <strong>${srv.rating || '5.0'} (${srv.reviewsCount || 0})</strong></span>
            <span class="badge badge-success" style="font-size: 0.7rem;">Active</span>
          </div>
        </div>

        <div class="my-service-actions-col">
          <a href="service-details.html?id=${srv.id}" class="btn btn-sm btn-outline" title="View live public page">
            👁️ View
          </a>
          <button type="button" class="btn btn-sm btn-secondary edit-service-btn" data-id="${srv.id}" title="Edit service details">
            ✏️ Edit
          </button>
          <button type="button" class="btn btn-sm btn-danger delete-service-btn" data-id="${srv.id}" data-title="${srv.title}" title="Delete service">
            🗑️ Delete
          </button>
        </div>
      </div>
    `).join("");
  }

  // Also render preview inside overview tab
  if (ovServicesGrid) {
    ovServicesGrid.innerHTML = services.map(srv => `
      <div class="service-card" style="margin-bottom: 1rem;">
        <div class="service-thumb-wrap" style="height: 160px;">
          <img src="${srv.thumbnail}" alt="${srv.title}">
          <span class="service-category-badge">${srv.category}</span>
        </div>
        <div class="service-body">
          <h4 class="service-title" style="font-size: 0.95rem; margin-bottom: 0.5rem;">
            <a href="service-details.html?id=${srv.id}">${srv.title}</a>
          </h4>
          <div class="service-footer" style="padding-top: 0.5rem;">
            <div class="service-price-block">
              <span class="price-label">Starting at</span>
              <span class="price-val" style="font-size: 1.1rem;">$${srv.startingPrice}</span>
            </div>
            <a href="service-details.html?id=${srv.id}" class="btn btn-sm btn-primary">
              View Service
            </a>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Attach Delete and Edit listeners
  attachServiceActionListeners();
}

function attachServiceActionListeners() {
  // Delete action
  document.querySelectorAll(".delete-service-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const title = btn.getAttribute("data-title");

      if (confirm(`Are you sure you want to delete the service:\n"${title}"?\nThis action cannot be undone.`)) {
        window.MARKETPLACE_DATA.deleteLocalService(id);
        renderMyServices();
        showToast("Service successfully deleted from marketplace.");
      }
    });
  });

  // Edit action (Quick edit modal / prompt)
  document.querySelectorAll(".edit-service-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const service = window.MARKETPLACE_DATA.getServiceById(id);

      const newTitle = prompt("Update Service Title:", service.title);
      if (newTitle === null) return; // user cancelled

      const newPriceStr = prompt("Update Starting Price ($):", service.startingPrice);
      if (newPriceStr === null) return;
      const newPrice = parseInt(newPriceStr, 10);

      const newDaysStr = prompt("Update Delivery Days:", service.deliveryDays);
      if (newDaysStr === null) return;
      const newDays = parseInt(newDaysStr, 10);

      if (newTitle.trim().length >= 10 && !isNaN(newPrice) && newPrice > 0 && !isNaN(newDays) && newDays > 0) {
        service.title = newTitle.trim();
        service.startingPrice = newPrice;
        service.deliveryDays = newDays;

        const allServices = window.MARKETPLACE_DATA.getLocalServices();
        const idx = allServices.findIndex(s => s.id === id);
        if (idx !== -1) {
          allServices[idx] = service;
          window.MARKETPLACE_DATA.saveLocalServices(allServices);
        }

        renderMyServices();
        showToast("Service updated successfully!");
      } else {
        alert("Invalid input! Title must be at least 10 chars, price and delivery must be positive numbers.");
      }
    });
  });
}

/* ===================================================================
   Shared Helpers
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.innerHTML = isOpen ? "✕" : "☰";
    });
  }
}

function showToast(message) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

