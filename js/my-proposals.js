/**
 * WorkSphere - My Proposals Controller
 * Week 4: Submitted Bids & Proposal Management Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderMyProposals();
});

function renderMyProposals() {
  const container = document.getElementById("proposalsListContainer");
  const emptyState = document.getElementById("noProposalsState");
  const statTotal = document.getElementById("statTotalProps");
  const statShortlisted = document.getElementById("statShortlistedProps");
  const statAvgBid = document.getElementById("statAvgBid");

  const proposals = window.MARKETPLACE_DATA.getLocalProposals();

  // Calculate stats
  const totalCount = proposals.length;
  const shortlistedCount = proposals.filter(p => p.status.includes("Shortlisted") || p.status.includes("Accepted")).length;
  const avgBidVal = totalCount > 0
    ? Math.round(proposals.reduce((sum, p) => sum + (p.proposedPrice || 0), 0) / totalCount)
    : 0;

  if (statTotal) statTotal.innerText = totalCount;
  if (statShortlisted) statShortlisted.innerText = shortlistedCount;
  if (statAvgBid) statAvgBid.innerText = `$${avgBidVal}`;

  if (totalCount === 0) {
    if (container) {
      container.innerHTML = "";
      container.style.display = "none";
    }
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (container) {
    container.style.display = "flex";
    container.innerHTML = proposals.map(prop => `
      <div class="proposal-card-row" id="prop-row-${prop.id}">
        <div class="proposal-header-line">
          <div>
            <h3 class="proposal-job-title">
              <a href="job-details.html?id=${prop.jobId}">${prop.jobTitle}</a>
            </h3>
            <span class="proposal-sub-date">Submitted: ${prop.submittedDate}</span>
          </div>
          <span class="badge ${prop.status.includes('Shortlisted') ? 'badge-primary' : 'badge-warning'}">
            ${prop.status}
          </span>
        </div>

        <div class="proposal-meta-line">
          <span>💵 Proposed Bid: <strong>$${prop.proposedPrice}</strong></span>
          <span>⏱️ Delivery: <strong>${prop.deliveryDays} Days</strong></span>
          <span>🛠️ Highlighted Skills: <strong>${prop.relevantSkills || 'General'}</strong></span>
        </div>

        <div class="proposal-cover-letter-box">
          <strong>Cover Letter Excerpt:</strong>
          <p>${prop.coverLetter}</p>
        </div>

        <div class="proposal-actions-row">
          <a href="job-details.html?id=${prop.jobId}" class="btn btn-sm btn-outline">
            👁️ View Job Post
          </a>
          <button type="button" class="btn btn-sm btn-danger withdraw-prop-btn" data-id="${prop.id}" data-title="${prop.jobTitle}">
            Withdraw Proposal
          </button>
        </div>
      </div>
    `).join("");

    attachProposalActionListeners();
  }
}

function attachProposalActionListeners() {
  document.querySelectorAll(".withdraw-prop-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const title = btn.getAttribute("data-title");

      if (confirm(`Are you sure you want to withdraw your proposal for:\n"${title}"?\nThis bid will be cancelled.`)) {
        window.MARKETPLACE_DATA.withdrawLocalProposal(id);
        renderMyProposals();
        alert("Proposal withdrawn successfully.");
      }
    });
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

