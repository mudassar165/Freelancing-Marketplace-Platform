/**
 * WorkSphere - Job Details & Proposal Submission Controller
 * Week 4: Job Viewer & Bid Proposal Submission Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderJobDetails();
  initProposalSubmission();
});

let currentJob = null;

function renderJobDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id") || "job-1";

  currentJob = window.MARKETPLACE_DATA.getJobById(jobId);

  // Set document title
  document.title = `${currentJob.title} | WorkSphere Jobs`;

  // Job Info Elements
  setText("jobBreadcrumb", currentJob.title);
  setText("jobTitleDisplay", currentJob.title);
  setText("jobCategoryBadge", currentJob.category);
  setText("jobPostedTime", `🕒 Posted ${currentJob.postedDate}`);
  setText("jobBudgetDisplay", `$${currentJob.budget} (${currentJob.budgetType})`);
  setText("jobTypeDisplay", currentJob.budgetType);
  setText("jobExpDisplay", currentJob.experienceLevel);
  setText("jobProposalsDisplay", `${currentJob.proposalsCount} Proposals`);
  setText("jobDescriptionText", currentJob.description);
  setText("jobDurationDisplay", currentJob.duration);

  // Skills
  const skillsContainer = document.getElementById("jobSkillsContainer");
  if (skillsContainer && currentJob.requiredSkills) {
    skillsContainer.innerHTML = currentJob.requiredSkills.map(s => `
      <span class="fl-skill-tag" style="font-size: 0.85rem; padding: 0.35rem 0.8rem;">${s}</span>
    `).join("");
  }

  // Client Details
  if (currentJob.client) {
    setText("clientNameDisplay", currentJob.client.name);
    setText("clientLocationDisplay", currentJob.client.location);
    setText("clientRatingDisplay", `${currentJob.client.rating} of ${currentJob.client.reviewsCount || 20} reviews`);
    setText("clientSpentDisplay", currentJob.client.spent);

    const letterPlaceholder = document.getElementById("clientAvatarLetter");
    if (letterPlaceholder) {
      letterPlaceholder.innerText = currentJob.client.name.charAt(0);
    }
  }

  // Pre-fill Proposal Bid Price
  const priceInput = document.getElementById("proposalPrice");
  if (priceInput) priceInput.value = currentJob.budget;

  const deliveryInput = document.getElementById("proposalDelivery");
  if (deliveryInput) {
    const defaultDays = currentJob.duration.includes("Week") ? 14 : 28;
    deliveryInput.value = defaultDays;
  }
}

function initProposalSubmission() {
  const form = document.getElementById("submitProposalForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const price = parseInt(document.getElementById("proposalPrice").value, 10);
      const delivery = parseInt(document.getElementById("proposalDelivery").value, 10);
      const coverLetter = document.getElementById("proposalCoverLetter").value.trim();
      const skills = document.getElementById("proposalSkills").value.trim();

      const feedback = document.getElementById("coverLetterFeedback");
      if (feedback) feedback.style.display = "none";

      if (isNaN(price) || price < 10) {
        alert("Please enter a valid proposal price of at least $10.");
        return;
      }

      if (isNaN(delivery) || delivery < 1) {
        alert("Estimated delivery time must be at least 1 day.");
        return;
      }

      if (!coverLetter || coverLetter.length < 40) {
        if (feedback) {
          feedback.innerText = "Cover letter must be at least 40 characters detailing your relevant skills.";
          feedback.style.color = "#dc2626";
          feedback.style.display = "block";
        } else {
          alert("Cover letter must be at least 40 characters.");
        }
        return;
      }

      // Assemble proposal object
      const newProposal = {
        id: `prop-${Date.now()}`,
        jobId: currentJob.id,
        jobTitle: currentJob.title,
        proposedPrice: price,
        deliveryDays: delivery,
        coverLetter: coverLetter,
        relevantSkills: skills || "Full-Stack Web & Mobile Development",
        status: "Submitted (Under Review)",
        submittedDate: "Just now"
      };

      // Save proposal
      window.MARKETPLACE_DATA.addLocalProposal(newProposal);

      alert(`🎉 Proposal successfully submitted for:\n"${currentJob.title}" at $${price}!\nRedirecting to your Submitted Proposals dashboard.`);

      window.location.href = "my-proposals.html";
    });
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

