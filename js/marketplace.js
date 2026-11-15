/**
 * WorkSphere - Freelancing Marketplace Platform
 * Week 2: Marketplace Search, Filtering, Sorting & Catalog Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initAuthModal();
  initMarketplace();
});

/* ===================================================================
   Marketplace State & Logic
   =================================================================== */
const marketState = {
  activeTab: "services",
  searchQuery: "",
  category: "all",
  priceRange: "all",
  rating: "all",
  delivery: "all",
  experience: "all",
  sortBy: "recommended"
};

const MARKETPLACE_FAVORITES_KEY = "worksphere-week7-favorites";

function initMarketplace() {
  parseUrlParams();
  setupFilterEventListeners();
  switchTab(marketState.activeTab);
}

function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);

  // Tab
  const tabParam = urlParams.get("tab") || urlParams.get("type");
  if (tabParam === "freelancers") {
    marketState.activeTab = "freelancers";
  } else if (tabParam === "jobs") {
    marketState.activeTab = "jobs";
  } else {
    marketState.activeTab = "services";
  }

  // Search query
  const queryParam = urlParams.get("q");
  if (queryParam) {
    marketState.searchQuery = queryParam.trim();
    const searchInput = document.getElementById("marketSearchInput");
    if (searchInput) {
      searchInput.value = marketState.searchQuery;
      document.getElementById("clearSearchBtn").style.display = "block";
    }
  }

  // Category
  const catParam = urlParams.get("cat") || urlParams.get("category");
  if (catParam) {
    marketState.category = catParam;
    const catSelect = document.getElementById("marketCategoryFilter");
    if (catSelect) catSelect.value = catParam;
  }
}

function setupFilterEventListeners() {
  const tabServices = document.getElementById("tabServices");
  const tabFreelancers = document.getElementById("tabFreelancers");
  const searchInput = document.getElementById("marketSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const categoryFilter = document.getElementById("marketCategoryFilter");
  const priceFilter = document.getElementById("marketPriceFilter");
  const ratingFilter = document.getElementById("marketRatingFilter");
  const deliveryFilter = document.getElementById("marketDeliveryFilter");
  const experienceFilter = document.getElementById("marketExperienceFilter");
  const sortFilter = document.getElementById("marketSortFilter");
  const cardsGrid = document.getElementById("marketplaceCardsGrid");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const emptyResetBtn = document.getElementById("emptyResetBtn");

  // Tab switching
  if (tabServices && tabFreelancers) {
    tabServices.addEventListener("click", () => switchTab("services"));
    tabFreelancers.addEventListener("click", () => switchTab("freelancers"));
  }
  const tabJobs = document.getElementById("tabJobs");
  if (tabJobs) tabJobs.addEventListener("click", () => switchTab("jobs"));

  // Search input live filtering
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      marketState.searchQuery = e.target.value.trim();
      clearSearchBtn.style.display = marketState.searchQuery ? "block" : "none";
      renderMarketplace();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      marketState.searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderMarketplace();
    });
  }

  // Category change
  if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) => {
      marketState.category = e.target.value;
      renderMarketplace();
    });
  }

  // Price range change
  if (priceFilter) {
    priceFilter.addEventListener("change", (e) => {
      marketState.priceRange = e.target.value;
      renderMarketplace();
    });
  }

  [
    [ratingFilter, "rating"],
    [deliveryFilter, "delivery"],
    [experienceFilter, "experience"]
  ].forEach(([filter, stateKey]) => {
    if (!filter) return;
    filter.addEventListener("change", event => {
      marketState[stateKey] = event.target.value;
      renderMarketplace();
    });
  });

  // Sort change
  if (sortFilter) {
    sortFilter.addEventListener("change", (e) => {
      marketState.sortBy = e.target.value;
      renderMarketplace();
    });
  }

  // Reset buttons
  if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);
  if (cardsGrid) {
    cardsGrid.addEventListener("click", event => {
      const favoriteButton = event.target.closest(".favorite-toggle");
      if (!favoriteButton) return;
      event.preventDefault();
      toggleFavorite(favoriteButton.dataset.favoriteKey);
      renderMarketplace();
    });
  }
}

function switchTab(tabName) {
  marketState.activeTab = tabName;
  const tabServices = document.getElementById("tabServices");
  const tabFreelancers = document.getElementById("tabFreelancers");
  const tabJobs = document.getElementById("tabJobs");
  const tabButtons = [tabServices, tabFreelancers, tabJobs].filter(Boolean);

  tabButtons.forEach(button => {
    const active = button.dataset.tab === tabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });
  const placeholders = {
    services: "Search services by title, skills, or category...",
    freelancers: "Search freelancers by name, title, or skills...",
    jobs: "Search jobs by title, skills, client, or category..."
  };
  document.getElementById("marketSearchInput").placeholder = placeholders[tabName];
  document.getElementById("marketDeliveryFilter").disabled = tabName === "freelancers";
  document.getElementById("marketExperienceFilter").disabled = tabName === "services";
  if (tabName === "freelancers") {
    marketState.delivery = "all";
    document.getElementById("marketDeliveryFilter").value = "all";
  }
  if (tabName === "services") {
    marketState.experience = "all";
    document.getElementById("marketExperienceFilter").value = "all";
  }

  renderMarketplace();
}

function resetAllFilters() {
  marketState.searchQuery = "";
  marketState.category = "all";
  marketState.priceRange = "all";
  marketState.rating = "all";
  marketState.delivery = "all";
  marketState.experience = "all";
  marketState.sortBy = "recommended";

  document.getElementById("marketSearchInput").value = "";
  document.getElementById("clearSearchBtn").style.display = "none";
  document.getElementById("marketCategoryFilter").value = "all";
  document.getElementById("marketPriceFilter").value = "all";
  document.getElementById("marketRatingFilter").value = "all";
  document.getElementById("marketDeliveryFilter").value = "all";
  document.getElementById("marketExperienceFilter").value = "all";
  document.getElementById("marketSortFilter").value = "recommended";
  document.getElementById("marketDeliveryFilter").disabled = marketState.activeTab === "freelancers";
  document.getElementById("marketExperienceFilter").disabled = marketState.activeTab === "services";

  renderMarketplace();
}

/* ===================================================================
   Filter & Sort Data Processing
   =================================================================== */
function filterAndSortData() {
  const isServices = marketState.activeTab === "services";
  const isFreelancers = marketState.activeTab === "freelancers";
  let items = isServices
    ? getMarketplaceServices()
    : isFreelancers
      ? [...window.MARKETPLACE_DATA.freelancers]
      : [...window.MARKETPLACE_DATA.getLocalJobs()];

  // 1. Keyword Search
  if (marketState.searchQuery) {
    const q = marketState.searchQuery.toLowerCase();
    items = items.filter(item => {
      if (isServices) {
        return (
          `${item.title} ${item.category} ${item.seller.name} ${item.description} ${(item.features || []).join(" ")}`.toLowerCase().includes(q)
        );
      }
      if (isFreelancers) {
        return (
          item.name.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          (item.skills || []).some(skill => skill.toLowerCase().includes(q)) ||
          (item.location || "").toLowerCase().includes(q)
        );
      }
      return `${item.title} ${item.category} ${item.description} ${item.client && item.client.name} ${(item.requiredSkills || item.skills || []).join(" ")}`.toLowerCase().includes(q);
    });
  }

  // 2. Category Filter
  if (marketState.category && marketState.category !== "all") {
    items = items.filter(item => item.category === marketState.category);
  }

  // 3. Price Filter
  if (marketState.priceRange && marketState.priceRange !== "all") {
    items = items.filter(item => {
      const price = item.startingPrice ?? item.budget;
      if (marketState.priceRange === "0-200") return price <= 200;
      if (marketState.priceRange === "200-350") return price > 200 && price <= 350;
      if (marketState.priceRange === "350-500") return price > 350 && price <= 500;
      if (marketState.priceRange === "500+") return price >= 500;
      return true;
    });
  }

  if (marketState.rating !== "all") {
    items = items.filter(item => Number(item.rating ?? (item.client && item.client.rating) ?? 0) >= Number(marketState.rating));
  }

  if (marketState.delivery !== "all") {
    items = items.filter(item => {
      const days = getDeliveryDays(item);
      if (!days) return false;
      if (marketState.delivery === "1-3") return days <= 3;
      if (marketState.delivery === "4-7") return days >= 4 && days <= 7;
      return days >= 8;
    });
  }

  if (marketState.experience !== "all") {
    items = items.filter(item => getExperienceLevel(item) === marketState.experience);
  }

  // 4. Sorting
  items.sort((a, b) => {
    switch (marketState.sortBy) {
      case "price-asc":
        return getPrice(a) - getPrice(b);
      case "price-desc":
        return getPrice(b) - getPrice(a);
      case "rating":
        return getRating(b) - getRating(a);
      case "reviews":
        return getPopularity(b) - getPopularity(a);
      case "newest":
        return getItemSequence(b) - getItemSequence(a);
      case "recommended":
      default:
        return getRating(b) * getPopularity(b) - getRating(a) * getPopularity(a);
    }
  });

  return items;
}

function getPrice(item) {
  return Number(item.startingPrice ?? item.budget ?? 0);
}

function getMarketplaceServices() {
  const services = [...window.MARKETPLACE_DATA.services];
  window.MARKETPLACE_DATA.getLocalServices().forEach(service => {
    const existingIndex = services.findIndex(item => item.id === service.id);
    if (existingIndex >= 0) services[existingIndex] = service;
    else services.unshift(service);
  });
  return services;
}

function getRating(item) {
  return Number(item.rating ?? (item.client && item.client.rating) ?? 0);
}

function getPopularity(item) {
  return Number(item.reviewsCount ?? item.proposalsCount ?? item.proposals ?? 0);
}

function getItemSequence(item) {
  const postedDate = String(item.postedDate || "").toLowerCase();
  const relativeAge = postedDate.match(/(\d+)\s+(minute|hour|day|week)s?/);
  if (relativeAge) {
    const unitsInMinutes = { minute: 1, hour: 60, day: 1440, week: 10080 };
    return -Number(relativeAge[1]) * unitsInMinutes[relativeAge[2]];
  }
  const match = String(item.id || "").match(/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

function getDeliveryDays(item) {
  if (item.deliveryDays) return Number(item.deliveryDays);
  const duration = String(item.duration || item.deadline || "");
  const number = Number((duration.match(/\d+/) || [])[0]);
  return number ? number * (/week/i.test(duration) ? 7 : 1) : 0;
}

function getExperienceLevel(item) {
  const level = String(item.experienceLevel || item.level || "").toLowerCase();
  if (/expert|senior|lead|principal/.test(level)) return "senior";
  if (/intermediate|mid/.test(level)) return "intermediate";
  if (/entry|junior/.test(level)) return "entry";
  if (item.completedJobs >= 80) return "senior";
  if (item.completedJobs >= 50) return "intermediate";
  return "entry";
}

function getFavoriteKeys() {
  const data = window.MARKETPLACE_DATA;
  const favorites = data.getLocalFavorites();
  let legacyKeys = [];
  try {
    const stored = JSON.parse(localStorage.getItem(MARKETPLACE_FAVORITES_KEY) || "[]");
    legacyKeys = Array.isArray(stored) ? stored : [];
  } catch {
    legacyKeys = [];
  }
  legacyKeys.forEach(key => {
    if (typeof key !== "string" || favorites.some(item => `${item.type}:${item.id}` === key)) return;
    const [type, id] = key.split(":");
    const item = type === "service"
      ? getMarketplaceServices().find(service => service.id === id)
      : type === "freelancer"
        ? data.freelancers.find(freelancer => freelancer.id === id)
        : null;
    if (!item) return;
    data.toggleFavorite(type === "service" ? {
      id: item.id,
      type,
      title: item.title,
      category: item.category,
      price: item.startingPrice,
      rating: item.rating,
      thumbnail: item.thumbnail,
      sellerName: item.seller.name
    } : {
      id: item.id,
      type,
      title: item.name,
      category: item.category,
      price: item.startingPrice,
      rating: item.rating,
      thumbnail: item.avatar,
      sellerName: item.title
    });
  });
  return data.getLocalFavorites().map(item => `${item.type}:${item.id}`);
}

function toggleFavorite(key) {
  const [type, id] = key.split(":");
  const data = window.MARKETPLACE_DATA;
  const item = type === "service"
    ? getMarketplaceServices().find(service => service.id === id)
    : type === "freelancer"
      ? data.freelancers.find(freelancer => freelancer.id === id)
      : null;
  if (!item) return;
  data.toggleFavorite(type === "service" ? {
    id: item.id,
    type,
    title: item.title,
    category: item.category,
    price: item.startingPrice,
    rating: item.rating,
    thumbnail: item.thumbnail,
    sellerName: item.seller.name
  } : {
    id: item.id,
    type,
    title: item.name,
    category: item.category,
    price: item.startingPrice,
    rating: item.rating,
    thumbnail: item.avatar,
    sellerName: item.title
  });
}

/* ===================================================================
   Render Output
   =================================================================== */
function renderMarketplace() {
  const container = document.getElementById("marketplaceCardsGrid");
  const emptyState = document.getElementById("emptyStateContainer");
  const countLabel = document.getElementById("resultsCountLabel");
  const activeTagsContainer = document.getElementById("activeFilterTags");
  const resetBtn = document.getElementById("resetFiltersBtn");

  if (!container) return;

  const filteredItems = filterAndSortData();
  const isServices = marketState.activeTab === "services";
  const isFreelancers = marketState.activeTab === "freelancers";

  // Update counter
  const itemTypeLabel = isServices ? "services" : isFreelancers ? "freelancers" : "jobs";
  countLabel.innerHTML = `Showing <strong>${filteredItems.length}</strong> ${itemTypeLabel}`;

  document.getElementById("marketStatServices").textContent = getMarketplaceServices().length;
  document.getElementById("marketStatFreelancers").textContent = window.MARKETPLACE_DATA.freelancers.length;
  document.getElementById("marketStatJobs").textContent = window.MARKETPLACE_DATA.getLocalJobs().length;
  document.getElementById("favoriteCount").textContent = getFavoriteKeys().length;

  // Update active tags & reset button visibility
  renderActiveFilterTags(activeTagsContainer, resetBtn);

  // Check empty state
  if (filteredItems.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  container.style.display = "grid";

  // Render cards
  if (isServices) {
    container.innerHTML = filteredItems.map(srv => createServiceCardHtml(srv)).join("");
  } else if (isFreelancers) {
    container.innerHTML = filteredItems.map(fl => createFreelancerCardHtml(fl)).join("");
  } else {
    container.innerHTML = filteredItems.map(job => createJobCardHtml(job)).join("");
  }
}

function renderActiveFilterTags(container, resetBtn) {
  if (!container) return;

  const tags = [];

  if (marketState.searchQuery) {
    tags.push({ label: `"${marketState.searchQuery}"`, key: "query" });
  }
  if (marketState.category !== "all") {
    tags.push({ label: marketState.category, key: "category" });
  }
  if (marketState.priceRange !== "all") {
    const priceLabels = {
      "0-200": "Under $200",
      "200-350": "$200 - $350",
      "350-500": "$350 - $500",
      "500+": "$500+"
    };
    tags.push({ label: priceLabels[marketState.priceRange] || marketState.priceRange, key: "price" });
  }
  if (marketState.rating !== "all") tags.push({ label: `${marketState.rating}+ stars`, key: "rating" });
  if (marketState.delivery !== "all") tags.push({ label: `${marketState.delivery} days`, key: "delivery" });
  if (marketState.experience !== "all") tags.push({ label: `${marketState.experience} level`, key: "experience" });

  if (tags.length > 0) {
    container.innerHTML = tags.map(tag => `
      <span class="active-tag-pill">
        ${escapeMarketplaceText(tag.label)}
        <button type="button" class="remove-tag-btn" data-key="${tag.key}">✕</button>
      </span>
    `).join("");

    if (resetBtn) resetBtn.style.display = "inline-flex";

    // Attach click to remove specific filter
    container.querySelectorAll(".remove-tag-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key === "query") {
          marketState.searchQuery = "";
          document.getElementById("marketSearchInput").value = "";
          document.getElementById("clearSearchBtn").style.display = "none";
        } else if (key === "category") {
          marketState.category = "all";
          document.getElementById("marketCategoryFilter").value = "all";
        } else if (key === "price") {
          marketState.priceRange = "all";
          document.getElementById("marketPriceFilter").value = "all";
        } else if (key === "rating") {
          marketState.rating = "all";
          document.getElementById("marketRatingFilter").value = "all";
        } else if (key === "delivery") {
          marketState.delivery = "all";
          document.getElementById("marketDeliveryFilter").value = "all";
        } else if (key === "experience") {
          marketState.experience = "all";
          document.getElementById("marketExperienceFilter").value = "all";
        }
        renderMarketplace();
      });
    });
  } else {
    container.innerHTML = "";
    if (resetBtn) resetBtn.style.display = "none";
  }
}

/* ===================================================================
   Card Templates
   =================================================================== */
function createServiceCardHtml(srv) {
  return `
    <div class="service-card">
      <div class="service-thumb-wrap">
        <img src="${srv.thumbnail}" alt="${srv.title}" loading="lazy">
        <span class="service-category-badge">${srv.category}</span>
        ${createFavoriteButton("service", srv.id)}
      </div>
      <div class="service-body">
        <div class="service-seller">
          <img class="seller-avatar" src="${srv.seller.avatar}" alt="${srv.seller.name}">
          <div class="seller-info">
            <h4 class="seller-name">${srv.seller.name}</h4>
            <span class="seller-level">${srv.seller.level}</span>
          </div>
        </div>
        <h3 class="service-title" title="${srv.title}">
          <a href="service-details.html?id=${srv.id}">${srv.title}</a>
        </h3>
        <div class="service-rating">
          <span style="color:#f59e0b;">★</span>
          <span>${srv.rating}</span>
          <span style="color: var(--text-light); font-weight: normal;">(${srv.reviewsCount} reviews)</span>
        </div>
        <div class="service-delivery-info" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">
          ⏱️ ${srv.deliveryDays} Days Delivery
        </div>
        <div class="service-footer">
          <div class="service-price-block">
            <span class="price-label">Starting at</span>
            <span class="price-val">$${srv.startingPrice}</span>
          </div>
          <a href="service-details.html?id=${srv.id}" class="btn btn-sm btn-primary">
            View Service
          </a>
        </div>
      </div>
    </div>
  `;
}

function createFreelancerCardHtml(fl) {
  return `
    <div class="freelancer-card">
      ${createFavoriteButton("freelancer", fl.id)}
      <div class="fl-badge-corner">
        <span class="badge ${fl.badge.includes('Plus') ? 'badge-primary' : 'badge-success'}">${fl.badge}</span>
      </div>
      <div class="fl-avatar-wrap">
        <img class="fl-avatar" src="${fl.avatar}" alt="${fl.name}" loading="lazy">
        <span class="fl-online-indicator" title="Online Now"></span>
      </div>
      <h3 class="fl-name">${fl.name}</h3>
      <p class="fl-title">${fl.title}</p>
      <div class="fl-rating">
        <span style="color:#f59e0b;">★</span>
        <span>${fl.rating}</span>
        <span class="review-count">(${fl.reviewsCount} reviews)</span>
      </div>
      <div class="fl-skills">
        ${fl.skills.slice(0, 4).map(s => `<span class="fl-skill-tag">${s}</span>`).join("")}
      </div>
      <div class="fl-meta-bar">
        <div class="fl-rate">
          <span class="price-label">Starting</span>
          <span>$${fl.startingPrice}</span>
        </div>
        <a href="freelancer-profile.html?id=${fl.id}" class="btn btn-sm btn-outline">
          View Profile
        </a>
      </div>
    </div>
  `;
}

function createJobCardHtml(job) {
  const skills = job.requiredSkills || job.skills || [];
  const level = job.experienceLevel || job.level || "Open level";
  const proposalCount = job.proposalsCount ?? job.proposals ?? 0;
  return `
    <article class="market-job-card">
      <div class="market-job-topline">
        <span class="service-category-badge">${escapeMarketplaceText(job.category)}</span>
        <span class="market-job-posted">${escapeMarketplaceText(job.postedDate || "Recently posted")}</span>
      </div>
      <h3>${escapeMarketplaceText(job.title)}</h3>
      <p>${escapeMarketplaceText(job.description)}</p>
      <div class="market-job-skills">${skills.slice(0, 4).map(skill => `<span>${escapeMarketplaceText(skill)}</span>`).join("")}</div>
      <div class="market-job-meta">
        <span><strong>$${Number(job.budget).toLocaleString()}</strong> fixed budget</span>
        <span>${escapeMarketplaceText(level)}</span>
        <span>${proposalCount} proposals</span>
      </div>
      <div class="market-job-footer">
        <span>${escapeMarketplaceText(job.client && job.client.name || job.client || "WorkSphere client")}</span>
        <a class="btn btn-sm btn-primary" href="job-details.html?id=${encodeURIComponent(job.id)}">View job</a>
      </div>
    </article>
  `;
}

function createFavoriteButton(type, id) {
  const key = `${type}:${id}`;
  const saved = getFavoriteKeys().includes(key);
  const label = saved ? "Remove from favorites" : "Save to favorites";
  return `<button class="favorite-toggle ${saved ? "saved" : ""}" type="button" data-favorite-key="${key}" aria-label="${label}" aria-pressed="${saved}" title="${label}"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"></path></svg></button>`;
}

function escapeMarketplaceText(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

/* ===================================================================
   Shared Navbar & Auth Modal Helpers
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
      mobileToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileToggle.innerHTML = "☰";
      });
    });
  }
}

function initAuthModal() {
  const modalOverlay = document.getElementById("authModal");
  const openLoginBtns = document.querySelectorAll(".btn-open-login");
  const openRegisterBtns = document.querySelectorAll(".btn-open-register");
  const closeBtn = document.getElementById("modalCloseBtn");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const modalTitle = document.getElementById("modalTitle");
  const roleSelector = document.getElementById("roleSelector");
  const authForm = document.getElementById("authForm");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const authSubtext = document.getElementById("authSubtext");

  if (!modalOverlay) return;

  let currentMode = "login";
  let currentRole = "client";

  function openModal(mode = "login") {
    currentMode = mode;
    updateModalUI();
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateModalUI() {
    if (currentMode === "login") {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      modalTitle.innerText = "Welcome back to WorkSphere";
      roleSelector.style.display = "none";
      authSubmitBtn.innerText = "Sign In";
      authSubtext.innerHTML = `Don't have an account? <a href="#" id="switchRegister" style="color: var(--primary); font-weight:700;">Create one for free</a>`;
    } else {
      tabLogin.classList.remove("active");
      tabRegister.classList.add("active");
      modalTitle.innerText = "Join WorkSphere Marketplace";
      roleSelector.style.display = "grid";
      authSubmitBtn.innerText = "Create Account";
      authSubtext.innerHTML = `Already have an account? <a href="#" id="switchLogin" style="color: var(--primary); font-weight:700;">Sign In</a>`;
    }

    const switchReg = document.getElementById("switchRegister");
    const switchLog = document.getElementById("switchLogin");
    if (switchReg) switchReg.onclick = (e) => { e.preventDefault(); openModal("register"); };
    if (switchLog) switchLog.onclick = (e) => { e.preventDefault(); openModal("login"); };
  }

  openLoginBtns.forEach(btn => btn.addEventListener("click", () => openModal("login")));
  openRegisterBtns.forEach(btn => btn.addEventListener("click", () => openModal("register")));

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (tabLogin) tabLogin.addEventListener("click", () => openModal("login"));
  if (tabRegister) tabRegister.addEventListener("click", () => openModal("register"));

  document.querySelectorAll(".role-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".role-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      currentRole = opt.getAttribute("data-role");
    });
  });

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("authEmail").value;
      alert(currentMode === "login"
        ? `Welcome back, ${email}!`
        : `Account created successfully as ${currentRole.toUpperCase()}!`);
      closeModal();
    });
  }
}

