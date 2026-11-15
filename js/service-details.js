/**
 * WorkSphere - Service Details Page Controller
 * Week 2: Dynamic Service Rendering, Pricing Tiers & Order Action
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderServiceDetails();
});

function renderServiceDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("id") || "srv-1";

  const service = window.MARKETPLACE_DATA.getServiceById(serviceId);
  const seller = window.MARKETPLACE_DATA.freelancers.find(fl => fl.id === service.freelancerId) || window.MARKETPLACE_DATA.freelancers[0];

  // Set page title
  document.title = `${service.title} | WorkSphere`;

  // Elements
  const srvBreadcrumb = document.getElementById("srvBreadcrumb");
  const srvCategory = document.getElementById("srvCategory");
  const srvTitle = document.getElementById("srvTitle");
  const srvSellerLink = document.getElementById("srvSellerLink");
  const srvSellerAvatar = document.getElementById("srvSellerAvatar");
  const srvSellerName = document.getElementById("srvSellerName");
  const srvSellerLevel = document.getElementById("srvSellerLevel");
  const srvRating = document.getElementById("srvRating");
  const srvReviewsCount = document.getElementById("srvReviewsCount");
  const srvHeroImage = document.getElementById("srvHeroImage");
  const srvDescription = document.getElementById("srvDescription");
  const srvFeaturesList = document.getElementById("srvFeaturesList");
  const srvPriceDisplay = document.getElementById("srvPriceDisplay");
  const srvDeliveryDays = document.getElementById("srvDeliveryDays");

  // Seller bio block
  const srvBioAvatar = document.getElementById("srvBioAvatar");
  const srvBioName = document.getElementById("srvBioName");
  const srvBioTitle = document.getElementById("srvBioTitle");
  const srvBioText = document.getElementById("srvBioText");
  const srvBioLocation = document.getElementById("srvBioLocation");
  const srvBioResponse = document.getElementById("srvBioResponse");
  const srvBioLanguages = document.getElementById("srvBioLanguages");
  const srvViewProfileBtn = document.getElementById("srvViewProfileBtn");

  // Populate data
  if (srvBreadcrumb) srvBreadcrumb.innerText = service.title;
  if (srvCategory) srvCategory.innerText = service.category;
  if (srvTitle) srvTitle.innerText = service.title;

  if (srvSellerLink) srvSellerLink.href = `freelancer-profile.html?id=${seller.id}`;
  if (srvSellerAvatar) {
    srvSellerAvatar.src = seller.avatar;
    srvSellerAvatar.alt = seller.name;
  }
  if (srvSellerName) srvSellerName.innerText = seller.name;
  if (srvSellerLevel) srvSellerLevel.innerText = seller.badge;

  if (srvRating) srvRating.innerText = service.rating;
  if (srvReviewsCount) srvReviewsCount.innerText = service.reviewsCount;

  if (srvHeroImage) {
    srvHeroImage.src = service.thumbnail;
    srvHeroImage.alt = service.title;
  }
  if (srvDescription) srvDescription.innerText = service.description;

  // Features list
  if (srvFeaturesList && service.features) {
    srvFeaturesList.innerHTML = service.features.map(f => `
      <li>
        <span class="check-icon">✓</span>
        <span>${f}</span>
      </li>
    `).join("");
  }

  if (srvPriceDisplay) srvPriceDisplay.innerText = `$${service.startingPrice}`;
  if (srvDeliveryDays) srvDeliveryDays.innerText = `${service.deliveryDays} Days Delivery`;

  // Bio card
  if (srvBioAvatar) srvBioAvatar.src = seller.avatar;
  if (srvBioName) srvBioName.innerText = seller.name;
  if (srvBioTitle) srvBioTitle.innerText = seller.title;
  if (srvBioText) srvBioText.innerText = seller.bio;
  if (srvBioLocation) srvBioLocation.innerText = `📍 ${seller.location}`;
  if (srvBioResponse) srvBioResponse.innerText = `⚡ Response time: ${seller.responseTime}`;
  if (srvBioLanguages) srvBioLanguages.innerText = `🌐 ${seller.languages.join(", ")}`;
  if (srvViewProfileBtn) srvViewProfileBtn.href = `freelancer-profile.html?id=${seller.id}`;

  // Interactive buttons
  const orderBtn = document.getElementById("orderServiceBtn");
  const contactBtn = document.getElementById("contactSellerBtn");

  if (orderBtn) {
    orderBtn.addEventListener("click", () => {
      const profile = window.MARKETPLACE_DATA.getCurrentUserProfile();
      const budget = Number(service.startingPrice);
      const deliveryDays = Math.max(1, Number(service.deliveryDays) || 7);
      const startDate = new Date();
      const deadline = new Date(startDate);
      deadline.setDate(deadline.getDate() + deliveryDays);
      const formatDate = date => date.toLocaleDateString(undefined, { month: "long", day: "2-digit", year: "numeric" });
      const firstMilestone = Math.round(budget / 2);
      const order = {
        id: `ord-${Date.now()}`,
        title: service.title,
        category: service.category,
        budget,
        status: "Pending",
        progress: 0,
        deadline: formatDate(deadline),
        daysRemaining: deliveryDays,
        startDate: formatDate(startDate),
        client: { name: profile.name, avatar: profile.avatar, location: profile.location, role: "Client" },
        freelancer: { name: seller.name, avatar: seller.avatar, title: seller.title, role: "Freelancer" },
        milestones: [
          { id: `milestone-${Date.now()}-1`, title: "Project kickoff & requirements", amount: firstMilestone, dueDate: formatDate(startDate), status: "Pending" },
          { id: `milestone-${Date.now()}-2`, title: "Delivery & client review", amount: budget - firstMilestone, dueDate: formatDate(deadline), status: "Pending" }
        ],
        submissions: []
      };
      const orders = window.MARKETPLACE_DATA.getLocalOrders();
      orders.unshift(order);
      if (!window.MARKETPLACE_DATA.saveLocalOrders(orders)) {
        alert("The project could not be saved in this browser. Please try again.");
        return;
      }
      window.location.href = `order-details.html?id=${encodeURIComponent(order.id)}&role=client`;
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = `messages.html?name=${encodeURIComponent(seller.name)}`;
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

