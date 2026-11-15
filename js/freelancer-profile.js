/**
 * WorkSphere - Freelancer Profile Page Controller
 * Week 2: Dynamic Freelancer Profile Rendering & Service Offerings
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderFreelancerProfile();
});

function renderFreelancerProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const freelancerId = urlParams.get("id") || "fl-1";

  const freelancer = window.MARKETPLACE_DATA.getFreelancerById(freelancerId);
  const freelancerServices = window.MARKETPLACE_DATA.services.filter(srv => srv.freelancerId === freelancer.id);

  // Set page title
  document.title = `${freelancer.name} - ${freelancer.title} | WorkSphere`;

  // Elements
  const flBreadcrumb = document.getElementById("flBreadcrumb");
  const flAvatar = document.getElementById("flAvatar");
  const flName = document.getElementById("flName");
  const flTitle = document.getElementById("flTitle");
  const flBadge = document.getElementById("flBadge");
  const flHourlyRate = document.getElementById("flHourlyRate");
  const flCompletedJobs = document.getElementById("flCompletedJobs");
  const flRating = document.getElementById("flRating");
  const flLocation = document.getElementById("flLocation");
  const flResponseTime = document.getElementById("flResponseTime");
  const flLanguages = document.getElementById("flLanguages");
  const flMemberSince = document.getElementById("flMemberSince");
  const flBioText = document.getElementById("flBioText");
  const flSkillsList = document.getElementById("flSkillsList");
  const flServicesGrid = document.getElementById("flServicesGrid");
  const flReviewScore = document.getElementById("flReviewScore");

  // Populate data
  if (flBreadcrumb) flBreadcrumb.innerText = freelancer.name;
  if (flAvatar) {
    flAvatar.src = freelancer.avatar;
    flAvatar.alt = freelancer.name;
  }
  if (flName) flName.innerText = freelancer.name;
  if (flTitle) flTitle.innerText = freelancer.title;
  if (flBadge) flBadge.innerText = freelancer.badge;
  if (flHourlyRate) flHourlyRate.innerText = `$${freelancer.hourlyRate} / hr`;
  if (flCompletedJobs) flCompletedJobs.innerText = freelancer.completedJobs;
  if (flRating) flRating.innerText = `★ ${freelancer.rating} (${freelancer.reviewsCount})`;
  if (flLocation) flLocation.innerText = freelancer.location;
  if (flResponseTime) flResponseTime.innerText = freelancer.responseTime;
  if (flLanguages) flLanguages.innerText = freelancer.languages.join(", ");
  if (flMemberSince) flMemberSince.innerText = freelancer.memberSince;
  if (flBioText) flBioText.innerText = freelancer.bio;
  if (flReviewScore) flReviewScore.innerText = `★ ${freelancer.rating} Rating`;

  // Populate skills
  if (flSkillsList && freelancer.skills) {
    flSkillsList.innerHTML = freelancer.skills.map(s => `
      <span class="fl-skill-tag" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${s}</span>
    `).join("");
  }

  // Populate services offered by this freelancer
  if (flServicesGrid) {
    const servicesToDisplay = freelancerServices.length > 0
      ? freelancerServices
      : [window.MARKETPLACE_DATA.services[0]]; // fallback

    flServicesGrid.innerHTML = servicesToDisplay.map(srv => `
      <div class="service-card" style="margin-bottom: 1rem;">
        <div class="service-thumb-wrap" style="height: 160px;">
          <img src="${srv.thumbnail}" alt="${srv.title}" loading="lazy">
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

  // Button actions
  const hireBtn = document.getElementById("flHireBtn");
  const messageBtn = document.getElementById("flMessageBtn");

  if (hireBtn) {
    hireBtn.addEventListener("click", () => {
      alert(`Hiring inquiry initiated for ${freelancer.name} ($${freelancer.hourlyRate}/hr)!\nProposal submission & contract flows integrate in Weeks 4-5.`);
    });
  }

  if (messageBtn) {
    messageBtn.addEventListener("click", () => {
      window.location.href = `messages.html?name=${encodeURIComponent(freelancer.name)}`;
    });
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

