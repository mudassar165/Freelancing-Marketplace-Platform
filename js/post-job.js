/**
 * WorkSphere - Post a Job Controller
 * Week 4: Client Job Posting & Board Submission Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initPostJobForm();
});

function initPostJobForm() {
  const form = document.getElementById("postJobForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      clearPostJobErrors();
      let isValid = true;

      const title = document.getElementById("newJobTitle").value.trim();
      const category = document.getElementById("newJobCategory").value;
      const experience = document.getElementById("newJobExp").value;
      const budget = parseInt(document.getElementById("newJobBudget").value, 10);
      const duration = document.getElementById("newJobDuration").value;
      const skillsRaw = document.getElementById("newJobSkills").value.trim();
      const desc = document.getElementById("newJobDesc").value.trim();
      const clientName = document.getElementById("newJobClientName").value.trim() || "Verified Enterprise Client";
      const clientLocation = document.getElementById("newJobClientLocation").value.trim() || "United States";

      if (!title || title.length < 10) {
        showError("newJobTitleFeedback", "Title must be at least 10 characters long.");
        isValid = false;
      }

      if (!category) {
        showError("newJobCatFeedback", "Please choose a project category.");
        isValid = false;
      }

      if (isNaN(budget) || budget < 50) {
        showError("newJobBudgetFeedback", "Minimum project budget is $50.");
        isValid = false;
      }

      if (!skillsRaw || skillsRaw.length < 2) {
        showError("newJobSkillsFeedback", "Please specify at least 1-2 required skills.");
        isValid = false;
      }

      if (!desc || desc.length < 40) {
        showError("newJobDescFeedback", "Description must be at least 40 characters detailing the project scope.");
        isValid = false;
      }

      if (!isValid) return;

      const skills = skillsRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);

      const newJob = {
        id: `job-${Date.now()}`,
        title: title,
        category: category,
        budget: budget,
        budgetType: "Fixed Price",
        experienceLevel: experience,
        duration: duration,
        postedDate: "Just now",
        proposalsCount: 0,
        requiredSkills: skills,
        description: desc,
        client: {
          name: clientName,
          location: clientLocation,
          rating: 5.0,
          reviewsCount: 1,
          spent: "$0 (New Client)",
          paymentVerified: true
        }
      };

      window.MARKETPLACE_DATA.addLocalJob(newJob);

      alert(`🎉 Job successfully published!\n"${newJob.title}" with a budget of $${newJob.budget} is now live on the jobs board.`);

      window.location.href = "jobs.html";
    });
  }
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.innerText = message;
    el.style.color = "#dc2626";
    el.style.fontSize = "0.8rem";
    el.style.marginTop = "0.25rem";
    el.style.display = "block";
  }
}

function clearPostJobErrors() {
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

