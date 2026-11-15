/**
 * WorkSphere - Freelancing Marketplace Platform
 * Week 1 & Week 2: Core Interaction & UI Management
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  renderCategories();
  renderFreelancers();
  renderServices();
  renderHowItWorks();
  renderStats();
  initProfilePage();
  initJobsPage();
  initOrdersPage();
  initMessagingPage();
  initSearch();
  initAuthModal();
});

/* ===================================================================
   Navbar & Mobile Menu
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  // Sticky header background transition
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.innerHTML = isOpen ? "✕" : "☰";
      mobileToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileToggle.innerHTML = "☰";
      });
    });
  }

  const notificationBadge = document.getElementById("navNotifBadge");
  if (notificationBadge && window.MARKETPLACE_DATA) {
    const unreadCount = window.MARKETPLACE_DATA.getUnreadNotificationCount();
    notificationBadge.textContent = unreadCount;
    notificationBadge.style.display = unreadCount > 0 ? "inline-flex" : "none";
  }
}

/* ===================================================================
   SVG Icon Helper
   =================================================================== */
function getIconSvg(iconName) {
  const icons = {
    code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    palette: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C21.999 6.5 17.5 2 12 2z"></path></svg>`,
    smartphone: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    "bar-chart": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
    "trending-up": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    "file-text": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
    video: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
    arrowRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    star: `<svg class="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
  };

  return icons[iconName] || icons.code;
}

/* ===================================================================
   Render Dynamic Sections
   =================================================================== */
function renderCategories() {
  const container = document.getElementById("categoriesGrid");
  if (!container || !window.MARKETPLACE_DATA) return;

  container.innerHTML = window.MARKETPLACE_DATA.categories.map(cat => `
    <a href="marketplace.html?cat=${encodeURIComponent(cat.name)}" class="category-card" data-category="${cat.name}">
      <div class="category-icon-wrapper">
        ${getIconSvg(cat.icon)}
      </div>
      <h3 class="category-title">${cat.name}</h3>
      <p class="category-desc">${cat.description}</p>
      <div class="category-footer">
        <span class="category-count">${cat.count}</span>
        <span class="category-arrow">${getIconSvg("arrowRight")}</span>
      </div>
    </a>
  `).join("");
}

function renderFreelancers() {
  const container = document.getElementById("freelancersGrid");
  if (!container || !window.MARKETPLACE_DATA) return;

  const topFreelancers = window.MARKETPLACE_DATA.freelancers.slice(0, 4);

  container.innerHTML = topFreelancers.map(fl => `
    <div class="freelancer-card">
      <div class="fl-badge-corner">
        <span class="badge ${fl.badge.includes('Plus') ? 'badge-primary' : 'badge-success'}">${fl.badge}</span>
      </div>
      <div class="fl-avatar-wrap">
        <img class="fl-avatar" src="${fl.avatar}" alt="${fl.name}" loading="lazy">
        <span class="fl-online-indicator" title="Online Now"></span>
      </div>
      <h3 class="fl-name">${fl.name}</h3>
      <p class="fl-title">${fl.title}</p>
      <div class="fl-rating">
        ${getIconSvg("star")}
        <span>${fl.rating}</span>
        <span class="review-count">(${fl.reviewsCount} reviews)</span>
      </div>
      <div class="fl-skills">
        ${fl.skills.map(s => `<span class="fl-skill-tag">${s}</span>`).join("")}
      </div>
      <div class="fl-meta-bar">
        <div class="fl-rate">
          <span class="price-label">Starting</span>
          <span>$${fl.startingPrice}</span>
        </div>
        <a href="freelancer-profile.html?id=${fl.id}" class="btn btn-sm btn-outline">
          View Profile
        </a>
      </div>
    </div>
  `).join("");
}

function renderServices() {
  const container = document.getElementById("servicesGrid");
  if (!container || !window.MARKETPLACE_DATA) return;

  const topServices = window.MARKETPLACE_DATA.services.slice(0, 4);

  container.innerHTML = topServices.map(srv => `
    <div class="service-card">
      <div class="service-thumb-wrap">
        <img src="${srv.thumbnail}" alt="${srv.title}" loading="lazy">
        <span class="service-category-badge">${srv.category}</span>
      </div>
      <div class="service-body">
        <div class="service-seller">
          <img class="seller-avatar" src="${srv.seller.avatar}" alt="${srv.seller.name}">
          <div class="seller-info">
            <h4 class="seller-name">${srv.seller.name}</h4>
            <span class="seller-level">${srv.seller.level}</span>
          </div>
        </div>
        <h3 class="service-title" title="${srv.title}">
          <a href="service-details.html?id=${srv.id}">${srv.title}</a>
        </h3>
        <div class="service-rating">
          ${getIconSvg("star")}
          <span>${srv.rating}</span>
          <span style="color: var(--text-light); font-weight: normal;">(${srv.reviewsCount})</span>
        </div>
        <div class="service-footer">
          <div class="service-price-block">
            <span class="price-label">Starting at</span>
            <span class="price-val">$${srv.startingPrice}</span>
          </div>
          <a href="service-details.html?id=${srv.id}" class="btn btn-sm btn-primary">
            View Service
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

function renderHowItWorks() {
  const container = document.getElementById("howItWorksGrid");
  if (!container || !window.MARKETPLACE_DATA) return;

  container.innerHTML = window.MARKETPLACE_DATA.howItWorks.map(step => `
    <div class="step-card">
      <div class="step-badge">${step.step}</div>
      <h3 class="step-title">${step.title}</h3>
      <p class="step-desc">${step.desc}</p>
    </div>
  `).join("");
}

function renderStats() {
  const container = document.getElementById("statsGrid");
  if (!container || !window.MARKETPLACE_DATA) return;

  container.innerHTML = window.MARKETPLACE_DATA.stats.map(item => `
    <div class="stat-item">
      <div class="stat-number">${item.value}</div>
      <div class="stat-label">${item.label}</div>
    </div>
  `).join("");
}

function initProfilePage() {
  const profilePage = document.querySelector(".profile-page");
  if (!profilePage) return;

  const defaultServices = [
    {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-1',
      title: 'Modern Responsive SaaS Landing Page',
      category: 'Web Development',
      description: 'A conversion-focused marketing site with tailored sections, responsive layout, and polished UX design.',
      price: 350,
      delivery: '5 days',
      tags: ['React', 'Landing Page', 'UI/UX'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80'
    },
    {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-2',
      title: 'Brand Identity Kit & Social Assets',
      category: 'Graphic Design',
      description: 'A complete identity package including logos, mood boards, and social media assets for modern brands.',
      price: 280,
      delivery: '3 days',
      tags: ['Branding', 'Logo', 'Social Media'],
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80'
    }
  ];

  let services = [...defaultServices];
  const myServicesGrid = document.getElementById('myServicesGrid');
  const profileForm = document.getElementById('profileForm');
  const serviceForm = document.getElementById('serviceForm');

  function renderServices() {
    if (!myServicesGrid) return;

    if (!services.length) {
      myServicesGrid.innerHTML = `
        <div class="empty-state">
          <h3>No services yet</h3>
          <p>Create your first service to start attracting clients.</p>
        </div>
      `;
      return;
    }

    myServicesGrid.innerHTML = services.map((service) => `
      <article class="service-card profile-service-card">
        <div class="service-thumb-wrap">
          <img src="${service.image}" alt="${service.title}" />
          <span class="service-category-badge">${service.category}</span>
        </div>
        <div class="service-body">
          <h3 class="service-title">${service.title}</h3>
          <p class="profile-service-description">${service.description}</p>
          <div class="profile-tags">
            ${service.tags.map((tag) => `<span>${tag}</span>`).join('')}
          </div>
          <div class="service-footer profile-service-footer">
            <div class="service-price-block">
              <span class="price-label">Price</span>
              <span class="price-val">$${service.price}</span>
            </div>
            <div class="service-meta-inline">
              <span>${service.delivery}</span>
            </div>
          </div>
          <div class="service-action-row">
            <button class="btn btn-secondary btn-sm" data-action="edit" data-id="${service.id}" type="button">Edit</button>
            <button class="btn btn-outline btn-sm" data-action="delete" data-id="${service.id}" type="button">Delete</button>
            <button class="btn btn-primary btn-sm" type="button">View</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  myServicesGrid.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    const id = target.dataset.id;
    const action = target.dataset.action;
    const service = services.find((item) => item.id === id);
    if (!service) return;

    if (action === 'delete') {
      services = services.filter((item) => item.id !== id);
      renderServices();
      showToast('Service removed successfully.');
      return;
    }

    if (action === 'edit') {
      document.getElementById('serviceTitle').value = service.title;
      document.getElementById('serviceCategory').value = service.category;
      document.getElementById('servicePrice').value = service.price;
      document.getElementById('serviceDelivery').value = service.delivery;
      document.getElementById('serviceDescription').value = service.description;
      document.getElementById('serviceTags').value = service.tags.join(', ');
      document.getElementById('serviceForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Service loaded for editing.');
    }
  });

  if (profileForm) {
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const professionalTitle = document.getElementById('professionalTitle').value.trim();
      const skills = document.getElementById('skillsField').value.trim();
      const location = document.getElementById('locationField').value.trim();

      if (!fullName || !professionalTitle || !skills || !location) {
        showToast('Please complete all required profile fields.', 'info');
        return;
      }

      const nameNode = document.getElementById('profileName');
      const titleNode = document.getElementById('profileTitle');
      if (nameNode) nameNode.textContent = fullName;
      if (titleNode) titleNode.textContent = professionalTitle;

      showToast('Profile updated successfully.');
    });
  }

  if (serviceForm) {
    serviceForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('serviceTitle').value.trim();
      const category = document.getElementById('serviceCategory').value;
      const price = Number(document.getElementById('servicePrice').value);
      const delivery = document.getElementById('serviceDelivery').value.trim();
      const description = document.getElementById('serviceDescription').value.trim();
      const tags = document.getElementById('serviceTags').value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (!title || !delivery || !description || !tags.length || !price) {
        showToast('Please fill in every service field correctly.', 'info');
        return;
      }

      const existingService = services.find((service) => service.title === title);

      if (existingService) {
        const index = services.findIndex((service) => service.id === existingService.id);
        services[index] = {
          ...existingService,
          category,
          price,
          delivery,
          description,
          tags,
          image: existingService.image
        };
      } else {
        services.unshift({
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          title,
          category,
          description,
          price,
          delivery,
          tags,
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80'
        });
      }

      renderServices();
      serviceForm.reset();
      showToast('Service published successfully.');
    });
  }

  renderServices();
}

function initJobsPage() {
  const page = document.querySelector('.jobs-page');
  if (!page || !window.MARKETPLACE_DATA) return;

  const jobs = [...window.MARKETPLACE_DATA.jobs];
  const allJobs = [...jobs];
  const jobsGrid = document.getElementById('jobsGrid');
  const searchInput = document.getElementById('jobsSearchInput');
  const categoryFilter = document.getElementById('jobsCategoryFilter');
  const budgetFilter = document.getElementById('jobsBudgetFilter');
  const sortFilter = document.getElementById('jobsSortFilter');
  const jobPostForm = document.getElementById('jobPostForm');
  const proposalForm = document.getElementById('proposalForm');
  const proposalsList = document.getElementById('proposalsList');

  function getFilteredJobs() {
    const searchValue = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const budgetValue = budgetFilter ? budgetFilter.value : 'all';
    let items = [...allJobs];

    if (searchValue) {
      items = items.filter(job => [job.title, job.category, job.description, job.skills.join(' ')].join(' ').toLowerCase().includes(searchValue));
    }

    if (categoryValue !== 'all') {
      items = items.filter(job => job.category === categoryValue);
    }

    if (budgetValue !== 'all') {
      const [min, max] = budgetValue.split('-').map(Number);
      if (budgetValue === '3500+') {
        items = items.filter(job => job.budget >= 3500);
      } else {
        items = items.filter(job => job.budget >= min && job.budget <= max);
      }
    }

    const sortValue = sortFilter ? sortFilter.value : 'recommended';
    if (sortValue === 'budget-desc') items.sort((a, b) => b.budget - a.budget);
    if (sortValue === 'budget-asc') items.sort((a, b) => a.budget - b.budget);
    if (sortValue === 'proposals') items.sort((a, b) => b.proposals - a.proposals);

    return items;
  }

  function renderJobs() {
    if (!jobsGrid) return;
    const filteredJobs = getFilteredJobs();

    jobsGrid.innerHTML = filteredJobs.map(job => `
      <article class="job-card">
        <div class="job-card-header">
          <div>
            <span class="job-type-tag">${job.level}</span>
            <h3>${job.title}</h3>
          </div>
          <span class="job-budget">$${job.budget.toLocaleString()}</span>
        </div>

        <div class="job-meta">
          <span>${job.client}</span>
          <span>•</span>
          <span>${job.location}</span>
          <span>•</span>
          <span>${job.deadline}</span>
        </div>

        <p class="job-description">${job.description}</p>

        <div class="job-skills">
          ${job.skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>

        <div class="job-footer">
          <span class="proposals-count">${job.proposals} proposals</span>
          <div class="job-actions">
            <button type="button" class="btn btn-outline btn-sm" data-apply-id="${job.id}">Apply</button>
            <button type="button" class="btn btn-primary btn-sm" data-view-id="${job.id}">View Details</button>
          </div>
        </div>
      </article>
    `).join('') || `
      <div class="empty-state">
        <h3>No jobs match your filters</h3>
        <p>Try another search term or reset the filters.</p>
      </div>
    `;
  }

  function renderProposals() {
    if (!proposalsList) return;
    const proposals = window.MARKETPLACE_DATA.jobProposals || [];

    proposalsList.innerHTML = proposals.map(item => `
      <li class="proposal-item">
        <div>
          <strong>${item.jobTitle}</strong>
          <p>${item.freelancer} • ${item.status}</p>
        </div>
        <span>$${item.budget.toLocaleString()}</span>
      </li>
    `).join('') || `
      <li class="proposal-empty">No proposals yet.</li>
    `;
  }

  if (searchInput) searchInput.addEventListener('input', renderJobs);
  if (categoryFilter) categoryFilter.addEventListener('change', renderJobs);
  if (budgetFilter) budgetFilter.addEventListener('change', renderJobs);
  if (sortFilter) sortFilter.addEventListener('change', renderJobs);

  if (jobPostForm) {
    jobPostForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('jobTitle').value.trim();
      const category = document.getElementById('jobCategory').value;
      const budget = Number(document.getElementById('jobBudget').value);
      const deadline = document.getElementById('jobDeadline').value.trim();
      const description = document.getElementById('jobDescription').value.trim();
      const skills = document.getElementById('jobSkills').value.split(',').map(item => item.trim()).filter(Boolean);

      if (!title || !budget || !deadline || !description || !skills.length) {
        showToast('Add complete job details before posting.', 'info');
        return;
      }

      allJobs.unshift({
        id: `job-${Date.now()}`,
        title,
        category,
        budget,
        deadline,
        level: 'Flexible',
        location: 'Remote',
        client: 'You',
        description,
        skills,
        proposals: 0
      });

      renderJobs();
      jobPostForm.reset();
      showToast('Job posted successfully.');
    });
  }

  if (proposalForm) {
    proposalForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const jobTitle = document.getElementById('proposalJob').value;
      const freelancer = document.getElementById('proposalFreelancer').value.trim();
      const budget = Number(document.getElementById('proposalBudget').value);
      const coverLetter = document.getElementById('proposalMessage').value.trim();

      if (!jobTitle || !freelancer || !budget || !coverLetter) {
        showToast('Please fill out the proposal form completely.', 'info');
        return;
      }

      if (!window.MARKETPLACE_DATA.jobProposals) window.MARKETPLACE_DATA.jobProposals = [];
      window.MARKETPLACE_DATA.jobProposals.unshift({
        id: `prop-${Date.now()}`,
        jobTitle,
        freelancer,
        budget,
        status: 'Pending',
        coverLetter
      });

      renderProposals();
      proposalForm.reset();
      showToast('Proposal submitted to the client.');
    });
  }

  jobsGrid.addEventListener('click', (event) => {
    const applyButton = event.target.closest('[data-apply-id]');
    const viewButton = event.target.closest('[data-view-id]');

    if (applyButton) {
      const targetId = applyButton.dataset.applyId;
      const job = allJobs.find(item => item.id === targetId);
      if (job && proposalForm) {
        document.getElementById('proposalJob').value = job.title;
        document.getElementById('proposalBudget').value = job.budget;
        document.getElementById('proposalMessage').focus();
        document.getElementById('proposalFormWrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
        showToast(`Proposal form loaded for: ${job.title}`);
      }
    }

    if (viewButton) {
      const targetId = viewButton.dataset.viewId;
      const job = allJobs.find(item => item.id === targetId);
      if (job) {
        showToast(`${job.title} • ${job.category} • $${job.budget.toLocaleString()}`);
      }
    }
  });

  renderJobs();
  renderProposals();
}

function initOrdersPage() {
  const page = document.querySelector('.orders-page');
  if (!page || !window.MARKETPLACE_DATA) return;

  const projects = window.MARKETPLACE_DATA.projects || [];
  const ordersList = document.getElementById('ordersList');
  const projectDetail = document.getElementById('projectDetail');
  const filterButtons = document.querySelectorAll('.order-filter-btn');
  let activeStatus = 'all';
  let selectedProjectId = projects[0] ? projects[0].id : null;

  function getVisibleProjects() {
    return activeStatus === 'all'
      ? projects
      : projects.filter(project => project.status === activeStatus);
  }

  function renderOrdersList() {
    if (!ordersList) return;

    const visibleProjects = getVisibleProjects();

    if (!visibleProjects.length) {
      ordersList.innerHTML = `
        <div class="empty-state">
          <h3>No projects in this status</h3>
          <p>Try another project filter.</p>
        </div>
      `;
      if (projectDetail) projectDetail.innerHTML = '';
      return;
    }

    if (!visibleProjects.some(project => project.id === selectedProjectId)) {
      selectedProjectId = visibleProjects[0].id;
    }

    ordersList.innerHTML = visibleProjects.map(project => `
      <button class="order-card ${project.id === selectedProjectId ? 'selected' : ''}" data-project-id="${project.id}" type="button">
        <div class="order-card-top">
          <div>
            <span class="order-tag">${project.category}</span>
            <h3>${project.title}</h3>
          </div>
          <span class="status-badge status-${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</span>
        </div>

        <div class="order-meta-inline">
          <span>${project.client.name}</span>
          <span>${project.deadline}</span>
        </div>

        <div class="mini-progress-bar">
          <span style="width: ${project.progress}%"></span>
        </div>

        <div class="order-card-footer">
          <strong>$${project.budget.toLocaleString()}</strong>
          <span>${project.progress}% complete</span>
        </div>
      </button>
    `).join('');

    renderProjectDetail();
  }

  function renderProjectDetail() {
    if (!projectDetail) return;

    const visibleProjects = getVisibleProjects();
    const project = visibleProjects.find(item => item.id === selectedProjectId) || visibleProjects[0];
    if (!project) {
      projectDetail.innerHTML = '';
      return;
    }

    const viewMode = document.querySelector('.view-mode-btn.active') ? document.querySelector('.view-mode-btn.active').dataset.viewMode : 'client';
    const person = viewMode === 'client' ? project.client : project.freelancer;

    projectDetail.innerHTML = `
      <div class="detail-card order-detail-card">
        <div class="card-header-row">
          <div>
            <span class="order-tag light">${project.category}</span>
            <h3>${project.title}</h3>
          </div>
          <span class="status-badge status-${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</span>
        </div>

        <div class="view-mode-toggle">
          <button class="view-mode-btn ${viewMode === 'client' ? 'active' : ''}" data-view-mode="client" type="button">Client View</button>
          <button class="view-mode-btn ${viewMode === 'freelancer' ? 'active' : ''}" data-view-mode="freelancer" type="button">Freelancer View</button>
        </div>

        <p class="project-summary">${project.summary}</p>

        <div class="project-progress-block">
          <div class="project-progress-meta">
            <span>Project progress</span>
            <strong>${project.progress}%</strong>
          </div>
          <div class="project-progress-bar large">
            <span style="width: ${project.progress}%"></span>
          </div>
        </div>

        <div class="project-contact-grid">
          <div class="contact-box">
            <span>${viewMode === 'client' ? 'Client contact' : 'Freelancer contact'}</span>
            <strong>${person.name}</strong>
            <small>${person.role}</small>
          </div>
          <div class="contact-box">
            <span>Budget / Deadline</span>
            <strong>$${project.budget.toLocaleString()}</strong>
            <small>${project.deadline}</small>
          </div>
        </div>

        <div class="project-section">
          <h3>Milestones</h3>
          <ul class="milestone-list">
            ${project.milestones.map(milestone => `
              <li>
                <span>${milestone.name}</span>
                <em class="milestone-status">${milestone.status}</em>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="project-section split-columns">
          <div>
            <h3>Current Tasks</h3>
            <ul class="task-list">
              ${project.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h3>Delivery / Submission</h3>
            <div class="delivery-box">
              <strong>${project.delivery.label}</strong>
              <p>${project.delivery.text}</p>
            </div>
          </div>
        </div>

        <div class="project-section">
          <h3>Latest Update</h3>
          <div class="activity-box">${project.lastUpdate}</div>
        </div>
        <div class="project-action-row">
          <a class="btn btn-outline" href="messages.html?conversation=${encodeURIComponent(project.id)}">Message project partner</a>
          ${project.status === 'Completed' ? `<a class="btn btn-primary" href="messages.html?project=${encodeURIComponent(project.id)}#reviews">Leave a review</a>` : ''}
        </div>
      </div>
    `;
  }

  ordersList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-project-id]');
    if (!button) return;
    selectedProjectId = button.dataset.projectId;
    renderOrdersList();
  });

  projectDetail.addEventListener('click', (event) => {
    const button = event.target.closest('.view-mode-btn');
    if (!button) return;

    const viewMode = button.dataset.viewMode;
    document.querySelectorAll('.view-mode-btn').forEach(item => {
      item.classList.toggle('active', item.dataset.viewMode === viewMode);
    });

    renderProjectDetail();
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.toggle('active', item === button));
      activeStatus = button.dataset.status;
      renderOrdersList();
    });
  });

  renderOrdersList();
}

function initMessagingPage() {
  const page = document.querySelector('.messages-page');
  if (!page || !window.MARKETPLACE_DATA) return;

  const projects = window.MARKETPLACE_DATA.projects || [];
  const completedProject = projects.find(project => project.status === 'Completed');
  const storageKeys = {
    messages: 'worksphere-week6-messages',
    notifications: 'worksphere-week6-notifications',
    reviews: 'worksphere-week6-reviews'
  };
  const conversations = [
    { id: 'project-1', projectId: 'project-1', name: 'Daniel Morse', role: 'Senior UI Engineer', project: 'SaaS Dashboard Redesign', unread: 2, avatar: '', messages: [
      { text: 'The updated analytics layout is ready for your review.', time: '10:18 AM', sent: false },
      { text: 'Great, I will review the filters this afternoon.', time: '10:26 AM', sent: true },
      { text: 'I also added the responsive table states to the prototype.', time: '10:42 AM', sent: false }
    ] },
    { id: 'project-2', projectId: 'project-2', name: 'Alicia Stone', role: 'Mobile App Developer', project: 'Flutter Technician App MVP', unread: 1, avatar: '', messages: [
      { text: 'The staging build is ready for final sign-off.', time: 'Yesterday', sent: false },
      { text: 'Thanks, I will check it against the deployment list.', time: 'Yesterday', sent: true }
    ] },
    { id: 'project-4', projectId: 'project-4', name: 'Alexander Vance', role: 'Design Lead', project: 'Brand Identity Package', unread: 0, avatar: 'fl-2', messages: [
      { text: 'All final brand files are in the shared delivery folder.', time: 'Mon', sent: false },
      { text: 'Everything looks excellent. Thank you for the thoughtful work.', time: 'Mon', sent: true }
    ] }
  ];
  const seedNotifications = [
    { id: 'n-message-1', type: 'message', title: 'New message from Daniel Morse', detail: 'The responsive table states are ready for review.', time: '12 minutes ago', unread: true, conversationId: 'project-1' },
    { id: 'n-accepted', type: 'accepted', title: 'Proposal accepted', detail: 'Your proposal for the technician app was accepted.', time: 'Yesterday', unread: true, conversationId: 'project-2' },
    { id: 'n-started', type: 'started', title: 'Project started', detail: 'SaaS Dashboard Redesign is now in progress.', time: '2 days ago', unread: true, conversationId: 'project-1' },
    { id: 'n-completed', type: 'completed', title: 'Project completed', detail: 'Brand Identity Package is ready for your review.', time: '3 days ago', unread: true, projectId: 'project-4' },
    { id: 'n-review', type: 'review', title: 'New review received', detail: 'A client left feedback on a recently completed project.', time: 'Last week', unread: false, projectId: 'project-4' }
  ];
  const defaultReviews = [
    { id: 'review-seed-1', name: 'Maya Chen', project: 'SaaS Dashboard Redesign', rating: 5, text: 'Clear communication and a thoughtful process from kickoff through handoff. The final dashboard is easy to use and feels polished.', date: 'Nov 8, 2026', avatar: 'MC' },
    { id: 'review-seed-2', name: 'Beacon Studio', project: 'Brand Identity Package', rating: 5, text: 'A cohesive identity with careful attention to detail. The delivered files were organized and ready to use.', date: 'Nov 2, 2026', avatar: 'BS' }
  ];
  const readStored = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : fallback;
    } catch {
      return fallback;
    }
  };
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  let storedMessages = readStored(storageKeys.messages, []);
  let notifications = readStored(storageKeys.notifications, seedNotifications);
  let reviews = readStored(storageKeys.reviews, defaultReviews);
  const searchParams = new URLSearchParams(window.location.search);
  const requestedName = searchParams.get('name');
  const matchingConversation = conversations.find(conversation => conversation.name.toLowerCase() === (requestedName || '').toLowerCase());
  const matchingFreelancer = window.MARKETPLACE_DATA.freelancers.find(freelancer => freelancer.name.toLowerCase() === (requestedName || '').toLowerCase());
  if (requestedName && !matchingConversation && matchingFreelancer) {
    conversations.unshift({
      id: `contact-${matchingFreelancer.id}`,
      name: matchingFreelancer.name,
      role: matchingFreelancer.title,
      project: 'Direct message',
      unread: 0,
      avatar: matchingFreelancer.id,
      messages: []
    });
  }
  let selectedConversationId = searchParams.get('conversation') || (matchingConversation ? matchingConversation.id : matchingFreelancer ? `contact-${matchingFreelancer.id}` : conversations[0].id);
  const projectId = searchParams.get('project');
  if (projectId && completedProject && projectId === completedProject.id) {
    document.getElementById('reviewProjectTitle').textContent = completedProject.title;
  }

  const conversationList = document.getElementById('conversationList');
  const chatHeader = document.getElementById('chatHeader');
  const chatMessages = document.getElementById('chatMessages');
  const messageForm = document.getElementById('messageForm');
  const messageInput = document.getElementById('messageInput');
  const notificationList = document.getElementById('notificationList');
  const reviewFeed = document.getElementById('reviewFeed');

  function getMessages(conversation) {
    const saved = storedMessages.find(item => item.id === conversation.id);
    return saved ? saved.messages : conversation.messages;
  }

  function getAvatar(person) {
    const freelancer = window.MARKETPLACE_DATA.freelancers.find(item => item.id === person.avatar || item.name === person.name);
    return freelancer ? freelancer.avatar : '';
  }

  function renderConversationList() {
    const query = document.getElementById('conversationSearch').value.trim().toLowerCase();
    const filtered = conversations.filter(conversation => `${conversation.name} ${conversation.project}`.toLowerCase().includes(query));
    const unreadCount = conversations.reduce((total, conversation) => total + conversation.unread, 0);
    document.getElementById('inboxCount').textContent = unreadCount ? unreadCount : '';
    document.getElementById('inboxCount').hidden = !unreadCount;
    conversationList.innerHTML = filtered.length ? filtered.map(conversation => {
      const messages = getMessages(conversation);
      const lastMessage = messages[messages.length - 1];
      const avatar = getAvatar(conversation);
      return `
        <button class="conversation-item ${selectedConversationId === conversation.id ? 'active' : ''}" type="button" data-conversation-id="${conversation.id}" aria-current="${selectedConversationId === conversation.id ? 'true' : 'false'}">
          <span class="person-avatar">${avatar ? `<img src="${escapeHtml(avatar)}" alt="">` : escapeHtml(conversation.name.slice(0, 2))}</span>
          <span class="conversation-copy"><strong>${escapeHtml(conversation.name)}</strong><small>${escapeHtml(conversation.project)}</small><span>${escapeHtml(lastMessage ? lastMessage.text : 'No messages yet')}</span></span>
          <span class="conversation-meta"><small>${escapeHtml(lastMessage ? lastMessage.time : '')}</small>${conversation.unread ? `<i>${conversation.unread}</i>` : ''}</span>
        </button>
      `;
    }).join('') : '<p class="empty-messages">No conversations match your search.</p>';
  }

  function renderChat() {
    const conversation = conversations.find(item => item.id === selectedConversationId) || conversations[0];
    if (!conversation) return;
    const avatar = getAvatar(conversation);
    chatHeader.innerHTML = `
      <span class="person-avatar chat-person-avatar">${avatar ? `<img src="${escapeHtml(avatar)}" alt="">` : escapeHtml(conversation.name.slice(0, 2))}</span>
      <div class="chat-person-copy"><strong>${escapeHtml(conversation.name)}</strong><span>${escapeHtml(conversation.role)} · ${escapeHtml(conversation.project)}</span></div>
      <a class="chat-project-link" href="orders.html">Project details</a>
    `;
    const messages = getMessages(conversation);
    chatMessages.innerHTML = messages.map(message => `
      <article class="chat-message ${message.sent ? 'sent' : 'received'}">
        <p>${escapeHtml(message.text)}</p>
        <time>${escapeHtml(message.time)}</time>
      </article>
    `).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    conversation.unread = 0;
    renderConversationList();
  }

  function renderNotifications() {
    const unreadCount = notifications.filter(notification => notification.unread).length;
    document.getElementById('notificationCount').textContent = unreadCount;
    document.getElementById('notificationCount').hidden = !unreadCount;
    notificationList.innerHTML = notifications.map(notification => `
      <button class="notification-item ${notification.unread ? 'unread' : ''}" type="button" data-notification-id="${notification.id}" data-conversation-id="${notification.conversationId || ''}" data-project-id="${notification.projectId || ''}">
        <span class="notification-mark notification-${notification.type}" aria-hidden="true"></span>
        <span class="notification-copy"><strong>${escapeHtml(notification.title)}</strong><span>${escapeHtml(notification.detail)}</span><time>${escapeHtml(notification.time)}</time></span>
        ${notification.unread ? '<i class="unread-dot" aria-label="Unread"></i>' : ''}
      </button>
    `).join('');
  }

  function renderReviews() {
    reviewFeed.innerHTML = reviews.length ? reviews.map(review => `
      <article class="review-item">
        <span class="review-avatar">${escapeHtml(review.avatar || review.name.slice(0, 2))}</span>
        <div class="review-content">
          <div class="review-author-row"><strong>${escapeHtml(review.name)}</strong><time>${escapeHtml(review.date)}</time></div>
          <div class="review-stars" aria-label="${review.rating} out of 5 stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
          <p>${escapeHtml(review.text)}</p>
          <small>${escapeHtml(review.project)}</small>
        </div>
      </article>
    `).join('') : '<p class="empty-messages">No reviews yet.</p>';
    document.getElementById('reviewTotal').textContent = `${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'}`;
  }

  conversationList.addEventListener('click', event => {
    const button = event.target.closest('[data-conversation-id]');
    if (!button) return;
    selectedConversationId = button.dataset.conversationId;
    renderChat();
  });
  document.getElementById('conversationSearch').addEventListener('input', renderConversationList);
  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = messageInput.value.trim();
    if (!text) {
      messageInput.focus();
      return;
    }
    const conversation = conversations.find(item => item.id === selectedConversationId);
    const messages = getMessages(conversation);
    messages.push({ text, time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }), sent: true });
    const saved = storedMessages.find(item => item.id === conversation.id);
    if (saved) saved.messages = messages;
    else storedMessages.push({ id: conversation.id, messages });
    localStorage.setItem(storageKeys.messages, JSON.stringify(storedMessages));
    messageInput.value = '';
    renderChat();
    showToast('Message sent.');
  });
  notificationList.addEventListener('click', event => {
    const button = event.target.closest('[data-notification-id]');
    if (!button) return;
    const notification = notifications.find(item => item.id === button.dataset.notificationId);
    if (notification) notification.unread = false;
    if (button.dataset.conversationId) {
      selectedConversationId = button.dataset.conversationId;
      renderChat();
    }
    if (button.dataset.projectId && notification && notification.type === 'completed') {
      localStorage.setItem(storageKeys.notifications, JSON.stringify(notifications));
      window.location.href = `messages.html?project=${encodeURIComponent(button.dataset.projectId)}#reviews`;
      return;
    }
    localStorage.setItem(storageKeys.notifications, JSON.stringify(notifications));
    renderNotifications();
    if (notification && notification.type === 'review') {
      document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
    }
  });
  document.getElementById('markAllRead').addEventListener('click', () => {
    notifications.forEach(notification => { notification.unread = false; });
    localStorage.setItem(storageKeys.notifications, JSON.stringify(notifications));
    renderNotifications();
  });

  let selectedRating = 0;
  const ratingButtons = [...document.querySelectorAll('.rating-star')];
  function setRating(rating) {
    selectedRating = rating;
    ratingButtons.forEach(button => {
      const isSelected = Number(button.dataset.rating) <= rating;
      button.classList.toggle('selected', isSelected);
      button.setAttribute('aria-checked', Number(button.dataset.rating) === rating ? 'true' : 'false');
      button.tabIndex = Number(button.dataset.rating) === (rating || 1) ? 0 : -1;
    });
  }
  ratingButtons.forEach((button, index) => {
    button.addEventListener('click', () => setRating(Number(button.dataset.rating)));
    button.addEventListener('keydown', event => {
      let nextRating = selectedRating || 1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') nextRating = Math.min(5, Number(button.dataset.rating) + 1);
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') nextRating = Math.max(1, Number(button.dataset.rating) - 1);
      else return;
      event.preventDefault();
      setRating(nextRating);
      ratingButtons[nextRating - 1].focus();
    });
    button.tabIndex = index === 0 ? 0 : -1;
  });
  document.getElementById('reviewForm').addEventListener('submit', event => {
    event.preventDefault();
    const comment = document.getElementById('reviewComment').value.trim();
    const error = document.getElementById('reviewError');
    if (!selectedRating) {
      error.textContent = 'Choose a star rating before submitting.';
      document.getElementById('starRating').focus();
      return;
    }
    if (!comment) {
      error.textContent = 'Add a few details to your review.';
      document.getElementById('reviewComment').focus();
      return;
    }
    reviews.unshift({
      id: `review-${Date.now()}`,
      name: 'You',
      project: completedProject ? completedProject.title : document.getElementById('reviewProjectTitle').textContent,
      rating: selectedRating,
      text: comment,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: 'YO'
    });
    localStorage.setItem(storageKeys.reviews, JSON.stringify(reviews));
    event.currentTarget.reset();
    error.textContent = '';
    setRating(0);
    renderReviews();
    showToast('Your review has been submitted.');
  });

  renderConversationList();
  renderChat();
  renderNotifications();
  renderReviews();
}

/* ===================================================================
   Search System (Redirection to Marketplace)
   =================================================================== */
function initSearch() {
  const searchTabs = document.querySelectorAll(".search-type-btn");
  const searchForm = document.getElementById("heroSearchForm");
  const searchInput = document.getElementById("heroSearchInput");
  const categorySelect = document.getElementById("categorySelect");
  const tagPills = document.querySelectorAll(".tag-pill");

  let currentSearchType = "services";

  searchTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      searchTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentSearchType = tab.getAttribute("data-type");

      if (currentSearchType === "freelancers") {
        searchInput.placeholder = "Search top rated freelancers (e.g. React developer, UI designer)...";
      } else {
        searchInput.placeholder = "Search for services (e.g. website design, mobile app, logo)...";
      }
    });
  });

  // Click tag pills to auto-populate and navigate to marketplace
  tagPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const tagText = pill.innerText.trim();
      window.location.href = `marketplace.html?tab=${currentSearchType}&q=${encodeURIComponent(tagText)}`;
    });
  });

  // Search form submit
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      const cat = categorySelect ? categorySelect.value : "all";
      window.location.href = `marketplace.html?tab=${currentSearchType}&q=${encodeURIComponent(query)}&cat=${encodeURIComponent(cat)}`;
    });
  }
}

/* ===================================================================
   Auth Modal (Login / Register)
   =================================================================== */
function initAuthModal() {
  const modalOverlay = document.getElementById("authModal");
  const openLoginBtns = document.querySelectorAll(".btn-open-login");
  const openRegisterBtns = document.querySelectorAll(".btn-open-register");
  const closeBtn = document.getElementById("modalCloseBtn");
  const tabLogin = document.getElementById("tabLogin");
  const tabRegister = document.getElementById("tabRegister");
  const modalTitle = document.getElementById("modalTitle");
  const roleSelector = document.getElementById("roleSelector");
  const authForm = document.getElementById("authForm");
  const authSubmitBtn = document.getElementById("authSubmitBtn");
  const authSubtext = document.getElementById("authSubtext");

  if (!modalOverlay) return;

  let currentMode = "login";
  let currentRole = "client";

  function openModal(mode = "login") {
    currentMode = mode;
    updateModalUI();
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateModalUI() {
    if (currentMode === "login") {
      tabLogin.classList.add("active");
      tabRegister.classList.remove("active");
      modalTitle.innerText = "Welcome back to WorkSphere";
      roleSelector.style.display = "none";
      authSubmitBtn.innerText = "Sign In";
      authSubtext.innerHTML = `Don't have an account? <a href="#" id="switchRegister" style="color: var(--primary); font-weight:700;">Create one for free</a>`;
    } else {
      tabLogin.classList.remove("active");
      tabRegister.classList.add("active");
      modalTitle.innerText = "Join WorkSphere Marketplace";
      roleSelector.style.display = "grid";
      authSubmitBtn.innerText = "Create Account";
      authSubtext.innerHTML = `Already have an account? <a href="#" id="switchLogin" style="color: var(--primary); font-weight:700;">Sign In</a>`;
    }

    const switchReg = document.getElementById("switchRegister");
    const switchLog = document.getElementById("switchLogin");
    if (switchReg) switchReg.onclick = (e) => { e.preventDefault(); openModal("register"); };
    if (switchLog) switchLog.onclick = (e) => { e.preventDefault(); openModal("login"); };
  }

  openLoginBtns.forEach(btn => btn.addEventListener("click", () => openModal("login")));
  openRegisterBtns.forEach(btn => btn.addEventListener("click", () => openModal("register")));

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (tabLogin) tabLogin.addEventListener("click", () => openModal("login"));
  if (tabRegister) tabRegister.addEventListener("click", () => openModal("register"));

  document.querySelectorAll(".role-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".role-option").forEach(o => o.classList.remove("active"));
      opt.classList.add("active");
      currentRole = opt.getAttribute("data-role");
    });
  });

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("authEmail").value;
      if (currentMode === "login") {
        showToast(`Welcome back, ${email}! Signed in successfully.`);
      } else {
        showToast(`Account created as ${currentRole.toUpperCase()}! Welcome to WorkSphere.`);
      }
      closeModal();
    });
  }
}

/* ===================================================================
   Toast Notification Utility
   =================================================================== */
function showToast(message, type = "success") {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span>${type === 'info' ? 'ℹ️' : '✨'}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
