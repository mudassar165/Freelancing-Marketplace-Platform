/**
 * WorkSphere - Order & Project Details Controller
 * Week 5: Contract Management, Milestones Checklist, Deliverables & Escrow Release
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initOrderDetails();
});

let currentOrder = null;
let currentRole = "freelancer"; // 'freelancer' or 'client'

function initOrderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id") || "ord-101";
  const roleParam = urlParams.get("role");

  if (roleParam === "client") {
    currentRole = "client";
  } else {
    currentRole = "freelancer";
  }

  currentOrder = window.MARKETPLACE_DATA.getOrderById(orderId);

  setupPerspectiveSwitcher();
  setupSubmissionForm();
  setupClientApprovalActions();
  renderAllDetails();
}

function setupPerspectiveSwitcher() {
  const flBtn = document.getElementById("detailViewFreelancerBtn");
  const clientBtn = document.getElementById("detailViewClientBtn");

  if (flBtn && clientBtn) {
    if (currentRole === "client") {
      clientBtn.classList.add("active");
      flBtn.classList.remove("active");
    } else {
      flBtn.classList.add("active");
      clientBtn.classList.remove("active");
    }

    flBtn.addEventListener("click", () => {
      currentRole = "freelancer";
      flBtn.classList.add("active");
      clientBtn.classList.remove("active");
      renderAllDetails();
    });

    clientBtn.addEventListener("click", () => {
      currentRole = "client";
      clientBtn.classList.add("active");
      flBtn.classList.remove("active");
      renderAllDetails();
    });
  }
}

function renderAllDetails() {
  if (!currentOrder) return;

  // Title & Header info
  document.title = `${currentOrder.title} (#${currentOrder.id.toUpperCase()}) | WorkSphere`;
  setText("orderBreadcrumb", `#${currentOrder.id.toUpperCase()}`);
  setText("orderIdBadge", `#${currentOrder.id.toUpperCase()}`);
  setText("orderCategoryTag", currentOrder.category);
  setText("orderStatusBadge", currentOrder.status);
  updateStatusBadgeStyle("orderStatusBadge", currentOrder.status);
  setText("sidebarStatusBadge", currentOrder.status);
  updateStatusBadgeStyle("sidebarStatusBadge", currentOrder.status);

  setText("orderTitleDisplay", currentOrder.title);
  setText("orderBudgetDisplay", `$${currentOrder.budget}`);
  setText("sidebarEscrowDeposit", `$${currentOrder.budget.toLocaleString()}.00`);

  // Progress Bar & Dates
  setText("progressPercentLabel", `${currentOrder.progress}% Completed`);
  const progressBar = document.getElementById("progressBarFill");
  if (progressBar) progressBar.style.width = `${currentOrder.progress}%`;

  setText("orderDatesDisplay", `Started ${currentOrder.startDate} • Deadline: ${currentOrder.deadline}`);
  setText("orderCountdownDisplay", currentOrder.daysRemaining > 0
    ? `⏱️ ${currentOrder.daysRemaining} Days Remaining`
    : `✓ Project Completed`);

  // Completed Review Banner toggle
  const reviewBanner = document.getElementById("completedReviewBanner");
  const reviewBannerBtn = document.getElementById("leaveReviewBannerBtn");
  if (reviewBanner) {
    if (currentOrder.status === "Completed") {
      reviewBanner.style.display = "flex";
      if (reviewBannerBtn) reviewBannerBtn.href = `reviews.html?id=${currentOrder.id}`;
    } else {
      reviewBanner.style.display = "none";
    }
  }

  // Render Milestones Checklist
  renderMilestonesList();

  // Render Submissions History
  renderSubmissionsList();

  // Switch Perspective UI
  renderPerspectiveView();
}

function renderPerspectiveView() {
  const isFreelancer = currentRole === "freelancer";
  const viewTag = document.getElementById("currentViewTag");
  const counterpartRoleTag = document.getElementById("counterpartRoleTag");
  const counterpartName = document.getElementById("counterpartName");
  const counterpartSub = document.getElementById("counterpartSub");
  const counterpartAvatar = document.getElementById("counterpartAvatar");
  const freelancerDeliveryBox = document.getElementById("freelancerDeliveryBox");
  const clientApprovalBox = document.getElementById("clientApprovalBox");

  if (viewTag) {
    viewTag.innerHTML = `<span>${isFreelancer ? '💼 Freelancer View Active' : '🏢 Client View Active'}</span>`;
  }

  const counterpart = isFreelancer ? currentOrder.client : currentOrder.freelancer;

  if (counterpartRoleTag) counterpartRoleTag.innerText = isFreelancer ? "Client Organization" : "Assigned Freelancer";
  if (counterpartName) counterpartName.innerText = counterpart.name;
  if (counterpartSub) counterpartSub.innerText = counterpart.location || counterpart.title;
  if (counterpartAvatar) counterpartAvatar.src = counterpart.avatar;

  // Toggle delivery submission form vs client approval box
  if (isFreelancer) {
    if (freelancerDeliveryBox) freelancerDeliveryBox.style.display = "block";
    if (clientApprovalBox) clientApprovalBox.style.display = "none";
  } else {
    if (freelancerDeliveryBox) freelancerDeliveryBox.style.display = "none";
    if (clientApprovalBox) clientApprovalBox.style.display = "block";
  }

  // Message button
  const chatBtn = document.getElementById("btnChatWithCounterpart");
  if (chatBtn) {
    chatBtn.onclick = () => {
      window.location.href = `messages.html?name=${encodeURIComponent(counterpart.name)}`;
    };
  }
}

function renderMilestonesList() {
  const container = document.getElementById("milestonesListContainer");
  const countBadge = document.getElementById("milestonesCompletedCount");
  if (!container || !currentOrder.milestones) return;

  const completed = currentOrder.milestones.filter(m => m.status === "Completed").length;
  if (countBadge) countBadge.innerText = `${completed} of ${currentOrder.milestones.length} Completed`;

  container.innerHTML = currentOrder.milestones.map((m, idx) => {
    const isDone = m.status === "Completed";
    return `
      <div class="milestone-item-row ${isDone ? 'milestone-done' : ''}">
        <div class="milestone-left">
          <input type="checkbox" class="milestone-chk" data-id="${m.id}" ${isDone ? 'checked' : ''} id="m-chk-${m.id}">
          <label for="m-chk-${m.id}" class="milestone-info">
            <span class="milestone-title-text">${idx + 1}. ${m.title}</span>
            <span class="milestone-due-text">Due: ${m.dueDate} ${isDone ? '• Completed ✓' : ''}</span>
          </label>
        </div>

        <div class="milestone-right">
          <strong class="milestone-amount">$${m.amount}</strong>
          <span class="badge ${isDone ? 'badge-success' : 'badge-primary'}" style="font-size:0.75rem;">
            ${m.status}
          </span>
        </div>
      </div>
    `;
  }).join("");

  // Attach checkbox listener to toggle milestone
  container.querySelectorAll(".milestone-chk").forEach(chk => {
    chk.addEventListener("change", () => {
      const mId = chk.getAttribute("data-id");
      window.MARKETPLACE_DATA.toggleMilestoneStatus(currentOrder.id, mId);
      currentOrder = window.MARKETPLACE_DATA.getOrderById(currentOrder.id);
      renderAllDetails();
    });
  });
}

function renderSubmissionsList() {
  const container = document.getElementById("submissionsListContainer");
  if (!container) return;

  if (!currentOrder.submissions || currentOrder.submissions.length === 0) {
    container.innerHTML = `
      <p style="color:var(--text-muted); font-size:0.9rem; padding: 1rem 0;">
        No deliverable files submitted yet. Use the submission form below when milestone work is ready.
      </p>
    `;
    return;
  }

  container.innerHTML = currentOrder.submissions.map(sub => `
    <div class="submission-card-item">
      <div class="submission-header-line">
        <div>
          <strong style="color:var(--dark); font-size:0.95rem;">${sub.submittedBy || 'Freelancer'}</strong>
          <span style="font-size:0.8rem; color:var(--text-light); margin-left:0.5rem;">Submitted on ${sub.date}</span>
        </div>
        <span class="badge ${sub.status === 'Approved' ? 'badge-success' : 'badge-warning'}">
          ${sub.status}
        </span>
      </div>

      <p class="submission-msg-text">${sub.message}</p>

      <div class="submission-file-pill">
        <span style="font-size:1.1rem;">📦</span>
        <div>
          <strong style="font-size:0.85rem; color:var(--dark);">${sub.fileUrl}</strong>
          <span style="font-size:0.75rem; color:var(--text-muted); display:block;">${sub.fileSize || '15 MB'} • Compressed Archive</span>
        </div>
        <button type="button" class="btn btn-sm btn-outline download-file-btn" data-file="${sub.fileUrl}" style="margin-left:auto;">
          ⬇️ Download
        </button>
      </div>
    </div>
  `).join("");

  container.querySelectorAll(".download-file-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const file = btn.getAttribute("data-file");
      alert(`Simulating secure download for deliverable file:\n"${file}"\nVerified virus-free via WorkSphere Escrow Sandbox.`);
    });
  });
}

function setupSubmissionForm() {
  const form = document.getElementById("submissionForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const message = document.getElementById("subMessage").value.trim();
      const fileName = document.getElementById("subFileName").value.trim();
      const fileSize = document.getElementById("subFileSize").value.trim() || "22.4 MB";

      if (!message || message.length < 10) {
        alert("Please provide a submission changelog or notes of at least 10 characters.");
        return;
      }
      if (!fileName) {
        alert("Please specify the deliverable file or repository archive name.");
        return;
      }

      const userProfile = window.MARKETPLACE_DATA.getCurrentUserProfile();

      const newSubmission = {
        id: `sub-${Date.now()}`,
        date: "Just now",
        submittedBy: userProfile.name,
        message: message,
        fileUrl: fileName,
        fileSize: fileSize,
        status: "Pending Client Approval"
      };

      window.MARKETPLACE_DATA.addOrderSubmission(currentOrder.id, newSubmission);
      currentOrder = window.MARKETPLACE_DATA.getOrderById(currentOrder.id);

      form.reset();
      renderAllDetails();

      alert(`🎉 Work deliverable successfully submitted!\nThe client has been notified to review and release milestone funds.`);
    });
  }
}

function setupClientApprovalActions() {
  const approveBtn = document.getElementById("btnApproveAndRelease");
  const revisionBtn = document.getElementById("btnRequestRevisions");

  if (approveBtn) {
    approveBtn.addEventListener("click", () => {
      if (confirm(`Approve final deliverable and release $${currentOrder.budget} from Escrow to ${currentOrder.freelancer.name}?`)) {
        window.MARKETPLACE_DATA.updateOrderStatus(currentOrder.id, "Completed");
        currentOrder = window.MARKETPLACE_DATA.getOrderById(currentOrder.id);
        renderAllDetails();

        if (confirm(`✅ Escrow funds ($${currentOrder.budget}) released successfully!\nOrder marked as COMPLETED.\n\nWould you like to rate your experience and leave a review for ${currentOrder.freelancer.name} now?`)) {
          window.location.href = `reviews.html?id=${currentOrder.id}`;
        }
      }
    });
  }

  if (revisionBtn) {
    revisionBtn.addEventListener("click", () => {
      const note = prompt("Please specify what revisions or adjustments are requested:", "Please refine the mobile layout navigation and update typography styling.");
      if (note) {
        alert(`Revision request submitted to ${currentOrder.freelancer.name}. Status updated.`);
      }
    });
  }
}

function updateStatusBadgeStyle(badgeId, status) {
  const el = document.getElementById(badgeId);
  if (!el) return;

  el.className = "badge";
  switch (status) {
    case "In Progress":
      el.classList.add("badge-primary");
      break;
    case "Submitted":
      el.classList.add("badge-warning");
      break;
    case "Completed":
      el.classList.add("badge-success");
      break;
    case "Cancelled":
      el.classList.add("badge-danger");
      break;
    case "Pending":
    default:
      el.classList.add("badge-secondary");
      break;
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
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

