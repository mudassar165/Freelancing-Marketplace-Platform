/**
 * WorkSphere - My Saved Favorites Controller
 * Week 7: Bookmark Management & Saved Services/Talent Catalog
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFavorites();
});

let currentFavFilter = "all";

function initFavorites() {
  setupFilterTabs();
  renderFavoritesGrid();
}

function setupFilterTabs() {
  const tabs = document.querySelectorAll(".fav-filter");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFavFilter = tab.getAttribute("data-filter");
      renderFavoritesGrid();
    });
  });
}

function renderFavoritesGrid() {
  const container = document.getElementById("favoritesGridContainer");
  const emptyState = document.getElementById("noFavoritesState");
  if (!container) return;

  const allFavs = window.MARKETPLACE_DATA.getLocalFavorites();

  // Update count badges
  const servicesCount = allFavs.filter(f => f.type === "service").length;
  const freelancersCount = allFavs.filter(f => f.type === "freelancer").length;

  setText("countFavAll", allFavs.length);
  setText("countFavServices", servicesCount);
  setText("countFavFreelancers", freelancersCount);

  let filtered = allFavs.filter(f => {
    if (currentFavFilter === "service") return f.type === "service";
    if (currentFavFilter === "freelancer") return f.type === "freelancer";
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  container.style.display = "grid";

  container.innerHTML = filtered.map(item => {
    const isService = item.type === "service";
    const detailLink = isService ? `service-details.html?id=${item.id}` : `freelancer-profile.html?id=${item.id}`;

    return `
      <div class="service-card" id="fav-card-${item.id}">
        <div class="service-thumb-wrap">
          <img src="${item.thumbnail}" alt="${item.title}">
          <span class="service-category-badge">${item.category}</span>
          <button type="button" class="fav-heart-btn active remove-fav-btn" data-id="${item.id}" title="Remove from Favorites">
            ❤️
          </button>
        </div>

        <div class="service-body">
          <h3 class="service-title" title="${item.title}">
            <a href="${detailLink}">${item.title}</a>
          </h3>
          <div class="service-rating">
            <span style="color:#f59e0b;">★</span>
            <span>${item.rating}</span>
            <span style="font-size:0.8rem; color:var(--text-light); margin-left:0.3rem;">(${item.sellerName || 'Verified Specialist'})</span>
          </div>

          <div class="service-footer">
            <div class="service-price-block">
              <span class="price-label">Starting at</span>
              <span class="price-val">$${item.price}</span>
            </div>
            <a href="${detailLink}" class="btn btn-sm btn-primary">
              View ${isService ? 'Service' : 'Profile'}
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Attach remove buttons listener
  container.querySelectorAll(".remove-fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      window.MARKETPLACE_DATA.toggleFavorite({ id: id });
      renderFavoritesGrid();
      alert("Item removed from your favorites.");
    });
  });
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

