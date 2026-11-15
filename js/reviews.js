/**
 * WorkSphere - Reviews & Ratings Controller
 * Week 6: Star Rating Picker, Review Form Submission & Feedback Feed
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initReviewForm();
  renderReviewsFeed();
});

let selectedRating = 5;

function initReviewForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id") || urlParams.get("orderId") || "ord-103";

  // Pre-fill project title if available
  const order = window.MARKETPLACE_DATA.getOrderById(orderId);
  if (order) {
    const badge = document.getElementById("revOrderIdBadge");
    const titleInput = document.getElementById("revProjectTitle");
    const subTitle = document.getElementById("revSubTitle");

    if (badge) badge.innerText = `#${order.id.toUpperCase()}`;
    if (titleInput) titleInput.value = order.title;
    if (subTitle) subTitle.innerHTML = `Leave feedback for <strong>${order.freelancer ? order.freelancer.name : 'Specialist'}</strong> on "${order.title}".`;
  }

  // Pre-fill reviewer name from profile
  const userProfile = window.MARKETPLACE_DATA.getCurrentUserProfile();
  const nameInput = document.getElementById("revReviewerName");
  if (nameInput) nameInput.value = userProfile.name;

  // Star Picker Logic
  const stars = document.querySelectorAll(".star-pick");
  const ratingLabel = document.getElementById("starRatingLabel");

  const ratingDescriptions = {
    1: "1 Star — Poor (Unacceptable Results)",
    2: "2 Stars — Fair (Needs Improvement)",
    3: "3 Stars — Good (Met Basic Expectations)",
    4: "4 Stars — Great (High Quality Deliverable)",
    5: "5 Stars — Outstanding (Flawless Delivery)"
  };

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-rating"), 10);
      updateStarUI(stars, selectedRating);
      if (ratingLabel) ratingLabel.innerText = ratingDescriptions[selectedRating];
    });

    star.addEventListener("mouseenter", () => {
      const hoverRating = parseInt(star.getAttribute("data-rating"), 10);
      updateStarUI(stars, hoverRating);
      if (ratingLabel) ratingLabel.innerText = ratingDescriptions[hoverRating];
    });
  });

  const pickerContainer = document.getElementById("starRatingPicker");
  if (pickerContainer) {
    pickerContainer.addEventListener("mouseleave", () => {
      updateStarUI(stars, selectedRating);
      if (ratingLabel) ratingLabel.innerText = ratingDescriptions[selectedRating];
    });
  }

  // Form Submit Handler
  const form = document.getElementById("submitReviewForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const reviewerName = document.getElementById("revReviewerName").value.trim();
      const projectTitle = document.getElementById("revProjectTitle").value.trim() || (order ? order.title : "Custom Project Delivery");
      const comment = document.getElementById("revComment").value.trim();

      if (!reviewerName || reviewerName.length < 2) {
        alert("Please enter your name or company name.");
        return;
      }

      if (!comment || comment.length < 20) {
        alert("Please write a review comment of at least 20 characters.");
        return;
      }

      const newReview = {
        id: `rev-${Date.now()}`,
        orderId: order ? order.id : "ord-custom",
        projectTitle: projectTitle,
        reviewerName: reviewerName,
        reviewerAvatar: userProfile.avatar,
        reviewerRole: "Verified Marketplace Client",
        rating: selectedRating,
        date: "Today",
        comment: comment
      };

      window.MARKETPLACE_DATA.addLocalReview(newReview);

      alert(`🎉 Thank you for rating your experience!\nYour ${selectedRating}-star review for "${projectTitle}" has been verified and published.`);

      document.getElementById("revComment").value = "";
      renderReviewsFeed();

      // Scroll to reviews feed
      const feedContainer = document.getElementById("reviewsFeedContainer");
      if (feedContainer) feedContainer.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function updateStarUI(stars, rating) {
  stars.forEach(s => {
    const val = parseInt(s.getAttribute("data-rating"), 10);
    if (val <= rating) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });
}

function renderReviewsFeed() {
  const container = document.getElementById("reviewsFeedContainer");
  const countBadge = document.getElementById("totalReviewsBadge");
  if (!container) return;

  const reviews = window.MARKETPLACE_DATA.getLocalReviews();

  if (countBadge) countBadge.innerText = `${reviews.length} Verified Reviews`;

  container.innerHTML = reviews.map(rev => `
    <div class="review-feed-card">
      <div class="review-feed-header">
        <div class="reviewer-profile-group">
          <img src="${rev.reviewerAvatar}" alt="${rev.reviewerName}" class="rev-avatar-img">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <strong class="rev-name">${rev.reviewerName}</strong>
              <span class="badge badge-success" style="font-size:0.7rem;">${rev.reviewerRole || 'Verified Client'}</span>
            </div>
            <span class="rev-date-text">Published on ${rev.date}</span>
          </div>
        </div>

        <div class="rev-stars-display" title="${rev.rating} out of 5 stars">
          ${renderStars(rev.rating)}
        </div>
      </div>

      <div class="rev-project-tag">
        📁 Project: <strong>${rev.projectTitle}</strong>
      </div>

      <p class="rev-comment-body">
        "${rev.comment}"
      </p>
    </div>
  `).join("");
}

function renderStars(rating) {
  let str = "";
  for (let i = 1; i <= 5; i++) {
    str += i <= rating ? "★" : "☆";
  }
  return str;
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

