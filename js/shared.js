/**
 * shared.js — WorkSphere Global Utilities (Week 8)
 * Included on EVERY page. Provides:
 *  - initNavbar()         Scroll behavior, mobile toggle, active link
 *  - initAuthModal()      Login / Register modal
 *  - showToast()          Toast notifications
 *  - updateNotifBadge()   Live notification count badge
 *  - showBanner()         Inline success / error banners
 *  - initSkeletons()      Loading skeleton helper
 */

/* ─── Toast ─────────────────────────────────────────────────────────────── */
function showToast(message, type = 'success', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText =
      'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem;';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const colors = {
    success: '#059669', error: '#dc2626', info: '#4f46e5', warning: '#d97706'
  };
  const toast = document.createElement('div');
  toast.style.cssText = `
    display:flex;align-items:center;gap:.75rem;padding:.85rem 1.25rem;
    background:#fff;border-left:4px solid ${colors[type] || colors.success};
    border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.14);
    font-family:'Plus Jakarta Sans',sans-serif;font-size:.9rem;font-weight:500;
    color:#0f172a;min-width:260px;max-width:380px;
    animation:toastIn .3s ease;
  `;
  toast.innerHTML = `<span style="font-size:1.1rem">${icons[type] || icons.success}</span><span>${message}</span>`;
  if (!document.getElementById('toastKeyframes')) {
    const s = document.createElement('style');
    s.id = 'toastKeyframes';
    s.textContent = `
      @keyframes toastIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes toastOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(10px)}}
    `;
    document.head.appendChild(s);
  }
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 310);
  }, duration);
}

/* ─── Inline Banner ──────────────────────────────────────────────────────── */
function showBanner(containerId, message, type = 'success') {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  const colors = { success: '#d1fae5:#065f46:#059669', error: '#fee2e2:#991b1b:#dc2626', info: '#ede9fe:#3730a3:#4f46e5' };
  const [bg, text, border] = (colors[type] || colors.success).split(':');
  wrap.innerHTML = `
    <div style="background:${bg};border:1.5px solid ${border};color:${text};
      padding:.85rem 1.2rem;border-radius:10px;font-weight:600;font-size:.9rem;
      display:flex;align-items:center;gap:.5rem;margin-bottom:1rem;">
      ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'} ${message}
    </div>`;
  wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => { wrap.innerHTML = ''; }, 6000);
}

/* ─── Notification Badge ──────────────────────────────────────────────────── */
function updateNotifBadge() {
  const notifs = JSON.parse(localStorage.getItem('worksphere_notifications') || '[]');
  const unread = notifs.filter(n => Boolean(n.unread ?? !n.read)).length;
  document.querySelectorAll('.nav-badge').forEach(badge => {
    badge.textContent = unread > 0 ? (unread > 9 ? '9+' : unread) : '';
    badge.style.display = unread > 0 ? 'inline-flex' : 'none';
  });
}

/* ─── Navbar ──────────────────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll behavior
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Mobile toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', open);
      mobileToggle.textContent = open ? '✕' : '☰';
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileToggle.textContent = '☰';
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('mobile-open');
        mobileToggle.textContent = '☰';
      }
    });
  }

  updateNotifBadge();
}

/* ─── Auth Modal ─────────────────────────────────────────────────────────── */
function initAuthModal() {
  // Create modal if it doesn't already exist on this page
  if (document.getElementById('authModal')) {
    _bindAuthModal();
    return;
  }

  const modalHTML = `
  <div id="authModal" class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="authModalTitle" style="display:none;">
    <div class="modal-box">
      <button class="modal-close" id="authModalClose" aria-label="Close">&times;</button>
      <div class="modal-brand">
        <div class="logo-icon" style="width:40px;height:40px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1"></path>
            <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4"></path>
            <circle cx="8" cy="12" r="2"></circle>
          </svg>
        </div>
        <span>Work<span class="highlight">Sphere</span></span>
      </div>

      <div class="modal-tabs">
        <button class="modal-tab active" data-tab="login" id="tabLogin">Log In</button>
        <button class="modal-tab" data-tab="register" id="tabRegister">Sign Up</button>
      </div>

      <!-- Login Form -->
      <form id="loginForm" class="auth-form">
        <h2 id="authModalTitle" class="modal-heading">Welcome Back!</h2>
        <p class="modal-sub">Sign in to access your WorkSphere account.</p>
        <div id="loginBanner"></div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" id="loginEmail" class="form-input" placeholder="you@example.com" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required>
        </div>
        <button type="submit" class="btn btn-primary w-full">Log In</button>
        <p class="modal-switch">Don't have an account? <button type="button" class="link-btn" data-switch="register">Sign up free</button></p>
      </form>

      <!-- Register Form -->
      <form id="registerForm" class="auth-form" style="display:none;">
        <h2 class="modal-heading">Join WorkSphere</h2>
        <p class="modal-sub">Create your free account and start today.</p>
        <div id="registerBanner"></div>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">First Name</label>
            <input type="text" id="regFirstName" class="form-input" placeholder="Alex" required>
          </div>
          <div class="form-group">
            <label class="form-label">Last Name</label>
            <input type="text" id="regLastName" class="form-input" placeholder="Johnson" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" id="regEmail" class="form-input" placeholder="you@example.com" required>
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" id="regPassword" class="form-input" placeholder="Min. 8 characters" required minlength="8">
        </div>
        <div class="form-group">
          <label class="form-label">I want to:</label>
          <select id="regRole" class="form-input">
            <option value="freelancer">Work as a Freelancer</option>
            <option value="client">Hire Freelancers (Client)</option>
            <option value="both">Both</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-full">Create Account</button>
        <p class="modal-switch">Already have an account? <button type="button" class="link-btn" data-switch="login">Log in</button></p>
      </form>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  _bindAuthModal();
}

function _bindAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;

  const closeBtn = document.getElementById('authModalClose');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  function openModal(tab = 'login') {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    switchTab(tab);
  }
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  function switchTab(tab) {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    loginForm.style.display = tab === 'login' ? '' : 'none';
    registerForm.style.display = tab === 'register' ? '' : 'none';
  }

  // Open triggers
  document.querySelectorAll('.btn-open-login, [data-open-modal="login"]').forEach(btn => {
    btn.addEventListener('click', () => openModal('login'));
  });
  document.querySelectorAll('.btn-open-register, [data-open-modal="register"]').forEach(btn => {
    btn.addEventListener('click', () => openModal('register'));
  });

  // Tab buttons
  document.querySelectorAll('.modal-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Switch links inside forms
  document.querySelectorAll('[data-switch]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.switch));
  });

  // Close
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Login submit
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pw = document.getElementById('loginPassword').value;
      if (!email || !pw) {
        showBanner('loginBanner', 'Please fill in all fields.', 'error');
        return;
      }
      // Save mock session
      const profile = JSON.parse(localStorage.getItem('worksphere_user_profile') || '{}');
      profile.email = email;
      profile.name = profile.name || email.split('@')[0];
      profile.loggedIn = true;
      localStorage.setItem('worksphere_user_profile', JSON.stringify(profile));
      showToast('Welcome back! You are now signed in.', 'success');
      closeModal();
    });
  }

  // Register submit
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const firstName = document.getElementById('regFirstName').value.trim();
      const lastName = document.getElementById('regLastName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const pw = document.getElementById('regPassword').value;
      const role = document.getElementById('regRole').value;
      if (!firstName || !email || pw.length < 8) {
        showBanner('registerBanner', 'Please complete all fields (password ≥ 8 chars).', 'error');
        return;
      }
      const profile = {
        name: `${firstName} ${lastName}`.trim(),
        firstName, lastName, email, role,
        title: role === 'freelancer' ? 'Freelance Professional' : 'Client',
        bio: '', location: '', skills: [], loggedIn: true,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName+'+'+lastName)}&background=4f46e5&color=fff&size=128`
      };
      localStorage.setItem('worksphere_user_profile', JSON.stringify(profile));
      showToast(`Welcome, ${firstName}! Your account has been created. 🎉`, 'success');
      closeModal();
    });
  }
}

/* ─── Skeleton Loading ───────────────────────────────────────────────────── */
function showSkeletons(containerId, count = 3, type = 'card') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const skeletonCard = `
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-line" style="width:80%"></div>
      <div class="skeleton skeleton-line" style="width:60%"></div>
      <div class="skeleton skeleton-line" style="width:40%"></div>
    </div>`;
  container.innerHTML = Array(count).fill(skeletonCard).join('');
}
function hideSkeletons(containerId) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = '';
}

/* ─── Empty State ────────────────────────────────────────────────────────── */
function showEmptyState(containerId, { icon = '📭', title = 'Nothing here yet', message = '', actionLabel = '', actionHref = '' } = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `
    <div class="empty-state-card" style="text-align:center;padding:3rem 2rem;background:#fff;border-radius:16px;border:2px dashed #e2e8f0;">
      <div style="font-size:3rem;margin-bottom:1rem">${icon}</div>
      <h3 style="font-size:1.2rem;font-weight:700;color:#0f172a;margin-bottom:.5rem">${title}</h3>
      ${message ? `<p style="color:#64748b;margin-bottom:1.5rem">${message}</p>` : ''}
      ${actionLabel && actionHref ? `<a href="${actionHref}" class="btn btn-primary">${actionLabel}</a>` : ''}
    </div>`;
}

/* ─── Auto-init on DOMContentLoaded ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAuthModal();
  updateNotifBadge();
});
