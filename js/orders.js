/**
 * WorkSphere - Orders & Project Management Controller
 * Week 5: Role-based Project Views, Status Filtering & Order Listings
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initOrdersDashboard();
});

const ordersState = {
  activeRole: "freelancer", // 'freelancer' or 'client'
  statusFilter: "all",
  searchQuery: ""
};

function initOrdersDashboard() {
  setupRoleSwitcher();
  setupStatusTabs();
  setupSearch();
  renderOrders();
}

function setupRoleSwitcher() {
  const flBtn = document.getElementById("viewAsFreelancerBtn");
  const clientBtn = document.getElementById("viewAsClientBtn");
  const subheading = document.getElementById("ordersSubheading");

  if (flBtn && clientBtn) {
    flBtn.addEventListener("click", () => {
      ordersState.activeRole = "freelancer";
      flBtn.classList.add("active");
      clientBtn.classList.remove("active");
      if (subheading) {
        subheading.innerHTML = `Viewing projects from your <strong>Freelancer Workspace</strong>. Track milestones, upload deliveries, and release escrow payments.`;
      }
      renderOrders();
    });

    clientBtn.addEventListener("click", () => {
      ordersState.activeRole = "client";
      clientBtn.classList.add("active");
      flBtn.classList.remove("active");
      if (subheading) {
        subheading.innerHTML = `Viewing projects from your <strong>Client Workspace</strong>. Inspect deliverables, manage contract milestones, and approve payments.`;
      }
      renderOrders();
    });
  }
}

function setupStatusTabs() {
  const tabs = document.querySelectorAll(".order-status-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      ordersState.statusFilter = tab.getAttribute("data-status");
      renderOrders();
    });
  });

  const resetBtn = document.getElementById("resetOrdersFilterBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      ordersState.statusFilter = "all";
      ordersState.searchQuery = "";
      const searchInput = document.getElementById("orderSearchInput");
      if (searchInput) searchInput.value = "";
      tabs.forEach(t => {
        if (t.getAttribute("data-status") === "all") t.classList.add("active");
        else t.classList.remove("active");
      });
      renderOrders();
    });
  }
}

function setupSearch() {
  const searchInput = document.getElementById("orderSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      ordersState.searchQuery = e.target.value.trim().toLowerCase();
      renderOrders();
    });
  }
}

function renderOrders() {
  const container = document.getElementById("ordersListContainer");
  const emptyState = document.getElementById("noOrdersState");
  if (!container) return;

  const allOrders = window.MARKETPLACE_DATA.getLocalOrders();

  // Update KPI counters
  updateKpiMetrics(allOrders);

  // Filter orders
  let filtered = allOrders.filter(o => {
    // Status filter
    if (ordersState.statusFilter !== "all" && o.status !== ordersState.statusFilter) {
      return false;
    }
    // Search query
    if (ordersState.searchQuery && !o.title.toLowerCase().includes(ordersState.searchQuery)) {
      return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  container.style.display = "flex";

  container.innerHTML = filtered.map(order => {
    const isFreelancerView = ordersState.activeRole === "freelancer";
    const counterpart = isFreelancerView ? order.client : order.freelancer;
    const counterpartRoleLabel = isFreelancerView ? "Client" : "Freelancer";

    return `
      <div class="order-card-row">
        <div class="order-card-header-line">
          <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
            <span class="order-id-badge">#${order.id.toUpperCase()}</span>
            <span class="badge badge-primary" style="font-size:0.75rem;">${order.category}</span>
            <span class="badge ${getStatusBadgeClass(order.status)}">${order.status}</span>
          </div>
          <div class="order-card-price">
            <strong>$${order.budget}</strong>
            <span style="font-size:0.75rem; color:var(--secondary); font-weight:700;">100% Escrow Funded</span>
          </div>
        </div>

        <h3 class="order-card-title">
          <a href="order-details.html?id=${order.id}&role=${ordersState.activeRole}">${order.title}</a>
        </h3>

        <!-- Counterpart Info -->
        <div class="order-counterpart-strip">
          <img src="${counterpart.avatar}" alt="${counterpart.name}" class="order-counterpart-img">
          <div>
            <span class="order-counterpart-label">${counterpartRoleLabel}:</span>
            <strong class="order-counterpart-name">${counterpart.name}</strong>
            <span class="order-counterpart-loc">(${counterpart.location || counterpart.title})</span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="order-card-progress-wrap">
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:0.35rem;">
            <span>Project Progress</span>
            <strong>${order.progress}%</strong>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${order.progress}%;"></div>
          </div>
        </div>

        <!-- Footer Line -->
        <div class="order-card-footer-line">
          <div class="order-deadline-info">
            <span>📅 Deadline: <strong>${order.deadline}</strong></span>
            ${order.daysRemaining > 0
              ? `<span style="color:var(--primary); font-weight:600;">(${order.daysRemaining} days left)</span>`
              : `<span style="color:var(--secondary); font-weight:700;">(Completed)</span>`}
          </div>

          <a href="order-details.html?id=${order.id}&role=${ordersState.activeRole}" class="btn btn-sm btn-primary">
            Manage Milestones & Deliverables →
          </a>
        </div>
      </div>
    `;
  }).join("");
}

function updateKpiMetrics(orders) {
  const activeCount = orders.filter(o => o.status === "In Progress" || o.status === "Submitted").length;
  const completedCount = orders.filter(o => o.status === "Completed").length;
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const escrowSum = orders.filter(o => o.status !== "Completed" && o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.budget || 0), 0);

  setText("kpiActiveCount", activeCount);
  setText("kpiCompletedCount", completedCount);
  setText("kpiPendingCount", pendingCount);
  setText("kpiEscrowFunds", `$${escrowSum.toLocaleString()}`);

  // Tab counts
  setText("countAll", orders.length);
  setText("countInProgress", orders.filter(o => o.status === "In Progress").length);
  setText("countSubmitted", orders.filter(o => o.status === "Submitted").length);
  setText("countCompleted", completedCount);
  setText("countPending", pendingCount);
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "In Progress":
      return "badge-primary";
    case "Submitted":
      return "badge-warning";
    case "Completed":
      return "badge-success";
    case "Cancelled":
      return "badge-danger";
    case "Pending":
    default:
      return "badge-secondary";
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val;
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

