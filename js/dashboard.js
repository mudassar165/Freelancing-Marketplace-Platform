/**
 * WorkSphere - Unified User Dashboards Controller
 * Week 7: Freelancer & Client Perspectives, KPI Analytics & Active Workspaces
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initDashboard();
});

let currentRole = "freelancer"; // 'freelancer' or 'client'

function initDashboard() {
  const storedRole = localStorage.getItem("worksphere_dashboard_role");
  if (storedRole === "client") currentRole = "client";

  setupRoleSwitcher();
  renderCurrentDashboard();
}

function setupRoleSwitcher() {
  const flBtn = document.getElementById("dashRoleFreelancerBtn");
  const clBtn = document.getElementById("dashRoleClientBtn");

  if (flBtn && clBtn) {
    if (currentRole === "client") {
      clBtn.classList.add("active");
      flBtn.classList.remove("active");
    } else {
      flBtn.classList.add("active");
      clBtn.classList.remove("active");
    }

    flBtn.addEventListener("click", () => {
      currentRole = "freelancer";
      localStorage.setItem("worksphere_dashboard_role", "freelancer");
      flBtn.classList.add("active");
      clBtn.classList.remove("active");
      renderCurrentDashboard();
    });

    clBtn.addEventListener("click", () => {
      currentRole = "client";
      localStorage.setItem("worksphere_dashboard_role", "client");
      clBtn.classList.add("active");
      flBtn.classList.remove("active");
      renderCurrentDashboard();
    });
  }
}

function renderCurrentDashboard() {
  const isFreelancer = currentRole === "freelancer";
  const flView = document.getElementById("freelancerDashboardView");
  const clView = document.getElementById("clientDashboardView");
  const breadcrumb = document.getElementById("dashBreadcrumb");
  const greeting = document.getElementById("dashGreetingTitle");
  const modeBadge = document.getElementById("dashModeBadge");
  const subheading = document.getElementById("dashSubheading");
  const primaryActionBtn = document.getElementById("dashPrimaryActionBtn");

  const userProfile = window.MARKETPLACE_DATA.getCurrentUserProfile();

  if (isFreelancer) {
    if (flView) flView.style.display = "block";
    if (clView) clView.style.display = "none";
    if (breadcrumb) breadcrumb.innerText = "Freelancer Dashboard";
    if (greeting) greeting.innerText = `Welcome Back, ${userProfile.name.split(' ')[0]}!`;
    if (modeBadge) modeBadge.innerText = "Freelancer Workspace";
    if (subheading) subheading.innerText = "Track your project earnings, active contracts, client feedback, and direct communications.";
    if (primaryActionBtn) {
      primaryActionBtn.innerText = "➕ Create New Service";
      primaryActionBtn.href = "create-service.html";
    }
    renderFreelancerDashboardData();
  } else {
    if (flView) flView.style.display = "none";
    if (clView) clView.style.display = "block";
    if (breadcrumb) breadcrumb.innerText = "Client Dashboard";
    if (greeting) greeting.innerText = `Client Workspace: ${userProfile.name.split(' ')[0]}`;
    if (modeBadge) modeBadge.innerText = "Client Workspace";
    if (subheading) subheading.innerText = "Manage posted jobs, review incoming proposals, inspect deliverables, and release escrow funds.";
    if (primaryActionBtn) {
      primaryActionBtn.innerText = "➕ Post a New Job";
      primaryActionBtn.href = "post-job.html";
    }
    renderClientDashboardData();
  }
}

/* ===================================================================
   Freelancer Dashboard Data Rendering
   =================================================================== */
function renderFreelancerDashboardData() {
  const metrics = window.MARKETPLACE_DATA.getDashboardMetrics().freelancer;
  const orders = window.MARKETPLACE_DATA.getLocalOrders();
  const services = window.MARKETPLACE_DATA.getLocalServices();
  const reviews = window.MARKETPLACE_DATA.getLocalReviews();
  const convs = window.MARKETPLACE_DATA.getLocalConversations();

  setDashboardMetric("flStatEarnings", `$${metrics.totalEarnings.toLocaleString()}`);
  setDashboardMetric("flStatActive", metrics.activeProjects);
  setDashboardMetric("flStatCompleted", metrics.completedProjects);
  setDashboardMetric("flStatRating", `★ ${metrics.rating}`);

  // Active contracts container
  const activeOrders = orders.filter(o => o.status === "In Progress" || o.status === "Submitted");
  const activeContainer = document.getElementById("flActiveProjectsContainer");
  if (activeContainer) {
    if (activeOrders.length === 0) {
      activeContainer.innerHTML = `<p style="color:var(--text-muted); padding:1rem 0;">No active projects right now. Browse jobs to submit proposals!</p>`;
    } else {
      activeContainer.innerHTML = activeOrders.map(o => `
        <div class="dash-project-row">
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
              <span class="order-id-badge">#${o.id.toUpperCase()}</span>
              <span class="badge ${o.status === 'Submitted' ? 'badge-warning' : 'badge-primary'}">${o.status}</span>
            </div>
            <h4 class="dash-project-title">
              <a href="order-details.html?id=${o.id}&role=freelancer">${o.title}</a>
            </h4>
            <span style="font-size:0.8rem; color:var(--text-muted);">Client: ${o.client.name} • Budget: <strong>$${o.budget}</strong></span>
          </div>

          <div style="min-width:140px; text-align:right;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--dark);">${o.progress}% Done</span>
            <div class="progress-bar-track" style="margin:0.25rem 0 0.5rem 0;">
              <div class="progress-bar-fill" style="width: ${o.progress}%;"></div>
            </div>
            <a href="order-details.html?id=${o.id}&role=freelancer" class="btn btn-sm btn-outline" style="font-size:0.75rem;">
              Manage →
            </a>
          </div>
        </div>
      `).join("");
    }
  }

  // Published Services container
  const servicesContainer = document.getElementById("flServicesContainer");
  if (servicesContainer) {
    servicesContainer.innerHTML = services.length ? services.slice(0, 3).map(s => `
      <div class="service-card" style="margin-bottom:0.5rem;">
        <div class="service-thumb-wrap" style="height:140px;">
          <img src="${s.thumbnail}" alt="${s.title}">
          <span class="service-category-badge">${s.category}</span>
        </div>
        <div class="service-body">
          <h4 class="service-title" style="font-size:0.9rem; margin-bottom:0.5rem;">
            <a href="service-details.html?id=${s.id}">${s.title}</a>
          </h4>
          <div class="service-footer" style="padding-top:0.4rem;">
            <span style="font-size:1.05rem; font-weight:800; color:var(--dark);">$${s.startingPrice}</span>
            <a href="profile.html?tab=services" class="btn btn-sm btn-secondary" style="font-size:0.75rem;">Edit Gig</a>
          </div>
        </div>
      </div>
    `).join("") : '<p class="dashboard-empty-message">No services listed yet. Create your first service to get discovered.</p>';
  }

  // Recent Reviews container
  const reviewsContainer = document.getElementById("flRecentReviewsContainer");
  if (reviewsContainer) {
    reviewsContainer.innerHTML = reviews.length ? reviews.slice(0, 2).map(r => `
      <div class="dash-mini-review">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
          <span style="color:#f59e0b; font-size:0.85rem;">★★★★★</span>
          <strong style="font-size:0.85rem; color:var(--dark);">${r.reviewerName}</strong>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">
          "${r.comment.substring(0, 85)}..."
        </p>
      </div>
    `).join("") : '<p class="dashboard-empty-message">No reviews yet. Completed projects can be reviewed here.</p>';
  }

  // Recent Messages container
  const msgsContainer = document.getElementById("flRecentMessagesContainer");
  if (msgsContainer) {
    msgsContainer.innerHTML = convs.length ? convs.slice(0, 3).map(c => `
      <a href="messages.html?conv=${c.id}" class="dash-mini-message">
        ${c.avatar ? `<img src="${c.avatar}" alt="${c.contactName}" class="dash-mini-avatar">` : `<span class="dash-mini-avatar-fallback">${c.contactName.slice(0, 2)}</span>`}
        <div style="flex:1; min-width:0;">
          <strong style="font-size:0.85rem; color:var(--dark); display:block;">${c.contactName}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; display:block;">
            ${c.lastMessage}
          </span>
        </div>
        <span style="font-size:0.7rem; color:var(--text-light);">${c.lastTime}</span>
      </a>
    `).join("") : '<p class="dashboard-empty-message">No messages yet. Contact a client to start a conversation.</p>';
  }
}

/* ===================================================================
   Client Dashboard Data Rendering
   =================================================================== */
function renderClientDashboardData() {
  const metrics = window.MARKETPLACE_DATA.getDashboardMetrics().client;
  const orders = window.MARKETPLACE_DATA.getLocalOrders();
  const jobs = window.MARKETPLACE_DATA.getLocalJobs();
  const favs = window.MARKETPLACE_DATA.getLocalFavorites();
  const convs = window.MARKETPLACE_DATA.getLocalConversations();

  setDashboardMetric("clStatSpent", `$${metrics.totalSpent.toLocaleString()}`);
  setDashboardMetric("clStatJobs", metrics.postedJobs);
  setDashboardMetric("clStatProps", metrics.proposalsReceived);
  setDashboardMetric("clStatFavs", metrics.favoritesCount);

  // Active Contracts container
  const contractsContainer = document.getElementById("clActiveContractsContainer");
  if (contractsContainer) {
    const activeOrders = orders.filter(o => o.status !== "Cancelled");
    contractsContainer.innerHTML = activeOrders.length ? activeOrders.map(o => `
      <div class="dash-project-row">
        <div style="flex:1;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <span class="order-id-badge">#${o.id.toUpperCase()}</span>
            <span class="badge ${o.status === 'Completed' ? 'badge-success' : 'badge-primary'}">${o.status}</span>
          </div>
          <h4 class="dash-project-title">
            <a href="order-details.html?id=${o.id}&role=client">${o.title}</a>
          </h4>
          <span style="font-size:0.8rem; color:var(--text-muted);">Specialist: <strong>${o.freelancer.name}</strong> • Escrow: <strong>$${o.budget}</strong></span>
        </div>

        <div style="min-width:140px; text-align:right;">
          <a href="order-details.html?id=${o.id}&role=client" class="btn btn-sm btn-primary" style="font-size:0.75rem;">
            ${o.status === 'Completed' ? 'Leave Review' : 'Inspect Milestones →'}
          </a>
        </div>
      </div>
    `).join("") : '<p class="dashboard-empty-message">No project orders yet. Browse services to hire a freelancer.</p>';
  }

  // Posted Jobs container
  const jobsContainer = document.getElementById("clJobsContainer");
  if (jobsContainer) {
    jobsContainer.innerHTML = jobs.length ? jobs.slice(0, 3).map(j => `
      <div class="dash-project-row">
        <div style="flex:1;">
          <h4 class="dash-project-title">
            <a href="job-details.html?id=${j.id}">${j.title}</a>
          </h4>
          <span style="font-size:0.8rem; color:var(--text-muted);">
            Category: ${j.category} • Budget: <strong>$${j.budget}</strong>
          </span>
        </div>
        <div style="text-align:right;">
          <span class="badge badge-success" style="font-size:0.75rem;">${j.proposalsCount} Proposals</span>
          <a href="job-details.html?id=${j.id}" class="btn btn-sm btn-outline" style="font-size:0.75rem; margin-left:0.5rem;">
            View Bids
          </a>
        </div>
      </div>
    `).join("") : '<p class="dashboard-empty-message">No jobs posted yet. Post an opportunity to receive proposals.</p>';
  }

  // Favorites Quickview container
  const favsContainer = document.getElementById("clFavoritesContainer");
  if (favsContainer) {
    favsContainer.innerHTML = favs.length ? favs.slice(0, 2).map(f => `
      <div class="dash-mini-review" style="display:flex; align-items:center; gap:0.75rem;">
        <img src="${f.thumbnail}" style="width:38px; height:38px; border-radius:var(--radius-sm); object-fit:cover;">
        <div style="flex:1; min-width:0;">
          <strong style="font-size:0.85rem; color:var(--dark); display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.title}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted);">$${f.price} • ${f.category}</span>
        </div>
        <a href="${f.type === 'service' ? 'service-details.html?id=' + f.id : 'freelancer-profile.html?id=' + f.id}" class="btn btn-sm btn-outline" style="font-size:0.7rem; padding:0.2rem 0.5rem;">
          View
        </a>
      </div>
    `).join("") : '<p class="dashboard-empty-message">No favorites saved. Browse the marketplace and bookmark listings.</p>';
  }

  // Client messages
  const clMsgsContainer = document.getElementById("clMessagesContainer");
  if (clMsgsContainer) {
    clMsgsContainer.innerHTML = convs.length ? convs.slice(0, 2).map(c => `
      <a href="messages.html?conv=${c.id}" class="dash-mini-message">
        ${c.avatar ? `<img src="${c.avatar}" alt="${c.contactName}" class="dash-mini-avatar">` : `<span class="dash-mini-avatar-fallback">${c.contactName.slice(0, 2)}</span>`}
        <div style="flex:1; min-width:0;">
          <strong style="font-size:0.85rem; color:var(--dark); display:block;">${c.contactName}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
            ${c.lastMessage}
          </span>
        </div>
      </a>
    `).join("") : '<p class="dashboard-empty-message">No messages yet. Start a conversation with a freelancer.</p>';
  }
}

function setDashboardMetric(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
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
