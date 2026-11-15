/**
 * WorkSphere - Create a Service Controller
 * Week 3: Service Gig Creation Form Validation & Catalog Integration
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCreateServiceForm();
});

function initCreateServiceForm() {
  const form = document.getElementById("createServiceForm");
  const titleInput = document.getElementById("serviceTitle");
  const categorySelect = document.getElementById("serviceCategory");
  const deliveryInput = document.getElementById("serviceDelivery");
  const priceInput = document.getElementById("servicePrice");
  const tagsInput = document.getElementById("serviceTags");
  const imageInput = document.getElementById("serviceImage");
  const descInput = document.getElementById("serviceDesc");
  const featuresInput = document.getElementById("serviceFeatures");

  const previewBox = document.getElementById("imagePreviewContainer");
  const livePreviewImg = document.getElementById("liveImagePreview");
  const presetButtons = document.querySelectorAll(".preset-img-btn");

  // Handle Preset Image Buttons
  presetButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      imageInput.value = url;
      updateImagePreview(url);
    });
  });

  // Handle manual image URL input
  if (imageInput) {
    imageInput.addEventListener("input", () => {
      updateImagePreview(imageInput.value.trim());
    });
  }

  function updateImagePreview(url) {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      livePreviewImg.src = url;
      previewBox.style.display = "block";
    } else {
      previewBox.style.display = "none";
    }
  }

  // Form Submission & Multi-field Validation
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      clearErrors();

      const title = titleInput.value.trim();
      const category = categorySelect.value;
      const delivery = parseInt(deliveryInput.value, 10);
      const price = parseInt(priceInput.value, 10);
      const tags = tagsInput.value.trim();
      const image = imageInput.value.trim();
      const desc = descInput.value.trim();
      const featuresRaw = featuresInput.value.trim();

      // Title validation
      if (!title || title.length < 10) {
        showFieldError("titleFeedback", "Title must be at least 10 characters long.");
        isValid = false;
      }

      // Category validation
      if (!category) {
        showFieldError("categoryFeedback", "Please choose a relevant category.");
        isValid = false;
      }

      // Delivery validation
      if (isNaN(delivery) || delivery < 1 || delivery > 90) {
        showFieldError("deliveryFeedback", "Delivery time must be between 1 and 90 days.");
        isValid = false;
      }

      // Price validation
      if (isNaN(price) || price < 15) {
        showFieldError("priceFeedback", "Minimum starting price is $15.");
        isValid = false;
      }

      // Tags validation
      if (!tags || tags.length < 2) {
        showFieldError("tagsFeedback", "Enter at least 1 skill or tag (e.g. React, Figma).");
        isValid = false;
      }

      // Image validation
      if (!image || (!image.startsWith("http://") && !image.startsWith("https://"))) {
        showFieldError("imageFeedback", "Please provide a valid web image URL starting with http:// or https:// (or choose a preset above).");
        isValid = false;
      }

      // Description validation
      if (!desc || desc.length < 30) {
        showFieldError("descFeedback", "Description must be at least 30 characters long to inform buyers.");
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Split features by newline
      const features = featuresRaw
        ? featuresRaw.split("\n").map(f => f.trim()).filter(f => f.length > 0)
        : [
            "Complete delivery with clean source code",
            "Quality assurance & cross-browser testing",
            "Post-delivery revision support"
          ];

      // Current user profile
      const userProfile = window.MARKETPLACE_DATA.getCurrentUserProfile();

      // Assemble new service object
      const newService = {
        id: `srv-custom-${Date.now()}`,
        title: title,
        category: category,
        freelancerId: "fl-1", // associated with current user
        seller: {
          name: userProfile.name,
          avatar: userProfile.avatar,
          level: userProfile.badge || "Top Rated"
        },
        thumbnail: image,
        startingPrice: price,
        rating: 5.0,
        reviewsCount: 0,
        deliveryDays: delivery,
        description: desc,
        features: features
      };

      // Add to Central Store & localStorage
      window.MARKETPLACE_DATA.addLocalService(newService);

      alert(`🎉 Success! Your new service:\n"${newService.title}" ($${newService.startingPrice})\nhas been published to the marketplace.`);

      // Redirect to My Services tab
      window.location.href = "profile.html?tab=services";
    });
  }
}

function showFieldError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerText = message;
    el.style.color = "#dc2626";
    el.style.fontSize = "0.8rem";
    el.style.marginTop = "0.25rem";
    el.style.display = "block";
  }
}

function clearErrors() {
  document.querySelectorAll(".field-feedback").forEach(el => {
    el.innerText = "";
    el.style.display = "none";
  });
}

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

