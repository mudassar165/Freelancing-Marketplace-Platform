/**
 * WorkSphere - Jobs Board Controller
 * Week 4: Job Search, Filtering, Sorting & Listing Display
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initJobs();
});

const jobsState = {
  searchQuery: "",
  category: "all",
  experience: "all",
  sortBy: "newest"
};

function initJobs() {
  setupJobFilters();
  renderJobs();
}

function setupJobFilters() {
  const searchInput = document.getElementById("jobSearchInput");
  const clearBtn = document.getElementById("clearJobSearchBtn");
  const catFilter = document.getElementById("jobCategoryFilter");
  const expFilter = document.getElementById("jobExpFilter");
  const sortFilter = document.getElementById("jobSortFilter");
  const resetBtn = document.getElementById("resetJobFiltersBtn");
  const emptyResetBtn = document.getElementById("btnResetAllJobs");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      jobsState.searchQuery = e.target.value.trim();
      clearBtn.style.display = jobsState.searchQuery ? "block" : "none";
      renderJobs();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      jobsState.searchQuery = "";
      clearBtn.style.display = "none";
      renderJobs();
    });
  }

  if (catFilter) {
    catFilter.addEventListener("change", (e) => {
      jobsState.category = e.target.value;
      renderJobs();
    });
  }

  if (expFilter) {
    expFilter.addEventListener("change", (e) => {
      jobsState.experience = e.target.value;
      renderJobs();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", (e) => {
      jobsState.sortBy = e.target.value;
      renderJobs();
    });
  }

  if (resetBtn) resetBtn.addEventListener("click", resetAllJobFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllJobFilters);
}

function resetAllJobFilters() {
  jobsState.searchQuery = "";
  jobsState.category = "all";
  jobsState.experience = "all";
  jobsState.sortBy = "newest";

  document.getElementById("jobSearchInput").value = "";
  document.getElementById("clearJobSearchBtn").style.display = "none";
  document.getElementById("jobCategoryFilter").value = "all";
  document.getElementById("jobExpFilter").value = "all";
  document.getElementById("jobSortFilter").value = "newest";

  renderJobs();
}

function filterAndSortJobs() {
  let list = [...window.MARKETPLACE_DATA.getLocalJobs()];

  // Keyword filter
  if (jobsState.searchQuery) {
    const q = jobsState.searchQuery.toLowerCase();
    list = list.filter(job => {
      return (
        job.title.toLowerCase().includes(q) ||
        job.category.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(q))
      );
    });
  }

  // Category filter
  if (jobsState.category !== "all") {
    list = list.filter(job => job.category === jobsState.category);
  }

  // Experience level filter
  if (jobsState.experience !== "all") {
    list = list.filter(job => job.experienceLevel.includes(jobsState.experience));
  }

  // Sort
  list.sort((a, b) => {
    switch (jobsState.sortBy) {
      case "budget-desc":
        return b.budget - a.budget;
      case "budget-asc":
        return a.budget - b.budget;
      case "proposals-asc":
        return a.proposalsCount - b.proposalsCount;
      case "newest":
      default:
        return 0; // keeps original order
    }
  });

  return list;
}

function renderJobs() {
  const container = document.getElementById("jobsListContainer");
  const emptyState = document.getElementById("noJobsFoundState");
  const countLabel = document.getElementById("jobsCountLabel");
  const tagsContainer = document.getElementById("activeJobFilterTags");
  const resetBtn = document.getElementById("resetJobFiltersBtn");

  if (!container) return;

  const filteredJobs = filterAndSortJobs();

  // Update counter
  countLabel.innerHTML = `Showing <strong>${filteredJobs.length}</strong> open vacancies`;

  // Render active tags
  renderActiveJobTags(tagsContainer, resetBtn);

  if (filteredJobs.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  container.style.display = "flex";

  container.innerHTML = filteredJobs.map(job => `
    <div class="job-card-row">
      <div class="job-card-main">
        <div class="job-card-top-row">
          <span class="badge badge-primary" style="font-size: 0.75rem;">${job.category}</span>
          <span class="job-posted-date">🕒 ${job.postedDate}</span>
        </div>

        <h3 class="job-card-title">
          <a href="job-details.html?id=${job.id}">${job.title}</a>
        </h3>

        <div class="job-card-meta-line">
          <span>💵 Est. Budget: <strong>$${job.budget} (${job.budgetType})</strong></span>
          <span>💼 Exp: <strong>${job.experienceLevel}</strong></span>
          <span>⏱️ Duration: <strong>${job.duration}</strong></span>
        </div>

        <p class="job-card-desc">
          ${job.description.length > 210 ? job.description.substring(0, 210) + '...' : job.description}
        </p>

        <div class="job-card-skills-row">
          ${job.requiredSkills.map(s => `<span class="fl-skill-tag">${s}</span>`).join("")}
        </div>

        <div class="job-card-footer">
          <div class="client-trust-badge">
            <span style="color: var(--secondary); font-weight:700;">✓ Payment Verified</span>
            <span>⭐ ${job.client.rating}</span>
            <span>📍 ${job.client.location}</span>
            <span>💰 Spent ${job.client.spent}</span>
          </div>

          <div style="display:flex; align-items:center; gap: 1rem;">
            <span style="font-size: 0.85rem; color: var(--text-muted); font-weight:600;">
              Proposals: <strong>${job.proposalsCount}</strong>
            </span>
            <a href="job-details.html?id=${job.id}" class="btn btn-sm btn-primary">
              View & Apply
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function renderActiveJobTags(container, resetBtn) {
  if (!container) return;

  const tags = [];
  if (jobsState.searchQuery) tags.push({ label: `"${jobsState.searchQuery}"`, key: "query" });
  if (jobsState.category !== "all") tags.push({ label: jobsState.category, key: "category" });
  if (jobsState.experience !== "all") tags.push({ label: jobsState.experience, key: "exp" });

  if (tags.length > 0) {
    container.innerHTML = tags.map(tag => `
      <span class="active-tag-pill">
        ${tag.label}
        <button type="button" class="remove-tag-btn" data-key="${tag.key}">✕</button>
      </span>
    `).join("");

    if (resetBtn) resetBtn.style.display = "inline-flex";

    container.querySelectorAll(".remove-tag-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key === "query") {
          jobsState.searchQuery = "";
          document.getElementById("jobSearchInput").value = "";
          document.getElementById("clearJobSearchBtn").style.display = "none";
        } else if (key === "category") {
          jobsState.category = "all";
          document.getElementById("jobCategoryFilter").value = "all";
        } else if (key === "exp") {
          jobsState.experience = "all";
          document.getElementById("jobExpFilter").value = "all";
        }
        renderJobs();
      });
    });
  } else {
    container.innerHTML = "";
    if (resetBtn) resetBtn.style.display = "none";
  }
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

