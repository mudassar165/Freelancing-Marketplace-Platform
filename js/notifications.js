/**
 * WorkSphere - Notifications Controller
 * Week 6: Notification Feed, Unread Badges & Alert Management
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNotifications();
});

let currentFilter = "all";

function initNotifications() {
  setupFilterTabs();
  setupMarkAllRead();
  renderNotifications();
}

function setupFilterTabs() {
  const tabs = document.querySelectorAll(".notif-filter");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.getAttribute("data-filter");
      renderNotifications();
    });
  });
}

function setupMarkAllRead() {
  const btn = document.getElementById("btnMarkAllRead");
  if (btn) {
    btn.addEventListener("click", () => {
      window.MARKETPLACE_DATA.markAllNotificationsRead();
      renderNotifications();
      updateNavbarBadge();
      alert("All notifications marked as read.");
    });
  }
}

function renderNotifications() {
  const container = document.getElementById("notifListContainer");
  const emptyState = document.getElementById("noNotifsState");
  if (!container) return;

  const all = window.MARKETPLACE_DATA.getLocalNotifications();

  let filtered = all.filter(n => {
    if (currentFilter === "unread") return n.unread;
    if (currentFilter === "project") return n.type.includes("project");
    return true;
  });

  updateNavbarBadge();

  if (filtered.length === 0) {
    container.innerHTML = "";
    container.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  container.style.display = "flex";

  container.innerHTML = filtered.map(item => `
    <div class="notification-item-row ${item.unread ? 'notif-unread' : ''}" data-id="${item.id}" data-link="${item.link}">
      <div class="notif-icon-col ${item.type}">
        ${getNotifIcon(item.type)}
      </div>

      <div class="notif-body-col">
        <div class="notif-title-row">
          <h4 class="notif-title">${item.title}</h4>
          <span class="notif-time">${item.time}</span>
        </div>
        <p class="notif-msg">${item.message}</p>
      </div>

      ${item.unread ? '<span class="notif-unread-dot" title="Unread"></span>' : ''}
    </div>
  `).join("");

  // Attach click listener
  container.querySelectorAll(".notification-item-row").forEach(row => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-id");
      const link = row.getAttribute("data-link");
      window.MARKETPLACE_DATA.markNotificationRead(id);
      if (link) {
        window.location.href = link;
      } else {
        renderNotifications();
      }
    });
  });
}

function getNotifIcon(type) {
  switch (type) {
    case "project_completed":
      return "💰";
    case "message":
      return "💬";
    case "proposal":
      return "📄";
    case "project_start":
      return "🚀";
    case "review":
      return "⭐";
    default:
      return "🔔";
  }
}

function updateNavbarBadge() {
  const count = window.MARKETPLACE_DATA.getUnreadNotificationCount();
  const badge = document.getElementById("navNotifCount");
  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
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

