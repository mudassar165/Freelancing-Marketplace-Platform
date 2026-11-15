// Central Data Store for Freelancing Marketplace Platform (WorkSphere)
// Designed to scale cleanly across Weeks 1 to 8

const MARKETPLACE_DATA = {
  platformName: "WorkSphere",
  tagline: "Where World-Class Talent Meets High-Impact Work",

  categories: [
    {
      id: "web-dev",
      name: "Web Development",
      icon: "code",
      count: "1,240+ Freelancers",
      description: "Full-stack, frontend, React, Node.js & custom web applications.",
      popular: true
    },
    {
      id: "graphic-design",
      name: "Graphic Design",
      icon: "palette",
      count: "890+ Freelancers",
      description: "Brand identity, UI/UX, illustrations, logo & marketing design.",
      popular: true
    },
    {
      id: "mobile-app",
      name: "Mobile App Development",
      icon: "smartphone",
      count: "750+ Freelancers",
      description: "Native iOS & Android, Flutter, React Native applications.",
      popular: true
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      icon: "bar-chart",
      count: "530+ Freelancers",
      description: "Data visualization, Python, SQL, predictive models & BI.",
      popular: true
    },
    {
      id: "digital-marketing",
      name: "Digital Marketing",
      icon: "trending-up",
      count: "980+ Freelancers",
      description: "SEO, PPC campaigns, social media growth & content strategy.",
      popular: true
    },
    {
      id: "ai-services",
      name: "AI & Machine Learning",
      icon: "cpu",
      count: "420+ Freelancers",
      description: "Prompt engineering, LLM integrations, PyTorch & AI agents.",
      popular: true
    },
    {
      id: "content-writing",
      name: "Writing & Translation",
      icon: "file-text",
      count: "610+ Freelancers",
      description: "Copywriting, technical blogs, translation & SEO articles.",
      popular: false
    },
    {
      id: "video-animation",
      name: "Video & Animation",
      icon: "video",
      count: "440+ Freelancers",
      description: "Explainer videos, 3D motion design & post-production.",
      popular: false
    }
  ],

  freelancers: [
    {
      id: "fl-1",
      name: "Sarah Jenkins",
      title: "Senior Full-Stack Developer",
      category: "Web Development",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
      rating: 4.95,
      reviewsCount: 128,
      hourlyRate: 65,
      startingPrice: 350,
      badge: "Top Rated Plus",
      skills: ["React", "Node.js", "TypeScript", "Next.js", "PostgreSQL"],
      completedJobs: 94,
      location: "San Francisco, USA",
      bio: "Full-stack engineer with 8+ years experience architecting scalable SaaS web applications, real-time dashboards, and secure REST/GraphQL APIs.",
      languages: ["English (Native)", "Spanish (Conversational)"],
      responseTime: "< 1 hour",
      memberSince: "2021"
    },
    {
      id: "fl-2",
      name: "Alexander Vance",
      title: "Lead UI/UX & Product Designer",
      category: "Graphic Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
      rating: 5.0,
      reviewsCount: 96,
      hourlyRate: 55,
      startingPrice: 280,
      badge: "Top Rated",
      skills: ["Figma", "Design Systems", "Webflow", "Prototyping", "Wireframing"],
      completedJobs: 82,
      location: "London, UK",
      bio: "Product designer specializing in design systems, high-converting checkout flows, and delightful user journeys for fast-growing startups.",
      languages: ["English (Native)", "French (Bilingual)"],
      responseTime: "< 2 hours",
      memberSince: "2020"
    },
    {
      id: "fl-3",
      name: "Elena Rostova",
      title: "Mobile App Architect (iOS & Flutter)",
      category: "Mobile App Development",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      rating: 4.9,
      reviewsCount: 74,
      hourlyRate: 70,
      startingPrice: 500,
      badge: "Pro Verified",
      skills: ["Flutter", "Swift", "Firebase", "App Store", "Dart"],
      completedJobs: 61,
      location: "Berlin, Germany",
      bio: "Mobile app developer with over 20 published applications on Google Play & Apple App Store. Expert in responsive UI and offline-first mobile sync.",
      languages: ["English (Fluent)", "German (Fluent)", "Russian (Native)"],
      responseTime: "< 1 hour",
      memberSince: "2022"
    },
    {
      id: "fl-4",
      name: "Marcus Chen",
      title: "Data Analyst & Business Intelligence Lead",
      category: "Data Analysis",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
      rating: 4.88,
      reviewsCount: 62,
      hourlyRate: 50,
      startingPrice: 200,
      badge: "Top Rated",
      skills: ["Python", "PowerBI", "SQL", "Tableau", "Pandas"],
      completedJobs: 57,
      location: "Toronto, Canada",
      bio: "Transforming complex datasets into actionable executive dashboards. Expert in automated ETL pipelines, predictive forecasting, and SQL analytics.",
      languages: ["English (Native)", "Mandarin (Native)"],
      responseTime: "< 3 hours",
      memberSince: "2021"
    },
    {
      id: "fl-5",
      name: "Sophia Martinez",
      title: "Growth Marketer & SEO Specialist",
      category: "Digital Marketing",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
      rating: 4.92,
      reviewsCount: 110,
      hourlyRate: 48,
      startingPrice: 190,
      badge: "Top Rated",
      skills: ["SEO", "Google Ads", "Content Strategy", "Conversion Optimization"],
      completedJobs: 104,
      location: "Madrid, Spain",
      bio: "Data-driven digital marketing strategist focused on organic search dominance, high-ROI paid media campaigns, and scalable client acquisition.",
      languages: ["English (Fluent)", "Spanish (Native)"],
      responseTime: "< 1 hour",
      memberSince: "2020"
    },
    {
      id: "fl-6",
      name: "David Kim",
      title: "AI Engineer & Machine Learning Specialist",
      category: "AI & Machine Learning",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=256&q=80",
      rating: 4.97,
      reviewsCount: 48,
      hourlyRate: 85,
      startingPrice: 450,
      badge: "Pro Verified",
      skills: ["LLMs", "LangChain", "PyTorch", "OpenAI API", "Vector Databases"],
      completedJobs: 42,
      location: "Seoul, South Korea",
      bio: "Building enterprise-ready AI agents, Retrieval-Augmented Generation (RAG) pipelines, and bespoke fine-tuned models for commercial workflows.",
      languages: ["English (Fluent)", "Korean (Native)"],
      responseTime: "< 2 hours",
      memberSince: "2023"
    },
    {
      id: "fl-7",
      name: "Olivia Campbell",
      title: "Senior Copywriter & Technical Writer",
      category: "Writing & Translation",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
      rating: 4.85,
      reviewsCount: 88,
      hourlyRate: 40,
      startingPrice: 120,
      badge: "Top Rated",
      skills: ["Copywriting", "Technical Documentation", "SEO Articles", "Whitepapers"],
      completedJobs: 91,
      location: "Melbourne, Australia",
      bio: "Crafting authoritative technical prose, compelling landing page copy, and developer documentation that turns readers into loyal customers.",
      languages: ["English (Native)"],
      responseTime: "< 2 hours",
      memberSince: "2021"
    },
    {
      id: "fl-8",
      name: "Lucas Morales",
      title: "3D Motion Designer & Video Editor",
      category: "Video & Animation",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
      rating: 4.93,
      reviewsCount: 54,
      hourlyRate: 60,
      startingPrice: 320,
      badge: "Top Rated",
      skills: ["After Effects", "Cinema 4D", "Premiere Pro", "3D Animation"],
      completedJobs: 49,
      location: "Buenos Aires, Argentina",
      bio: "Award-winning 3D motion animator and commercial video editor helping tech products stand out with striking visual effects and product demos.",
      languages: ["English (Fluent)", "Spanish (Native)"],
      responseTime: "< 4 hours",
      memberSince: "2022"
    }
  ],

  services: [
    {
      id: "srv-1",
      title: "Modern Responsive SaaS Web Application Development",
      category: "Web Development",
      freelancerId: "fl-1",
      seller: {
        name: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80",
        level: "Top Rated Plus"
      },
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      startingPrice: 350,
      rating: 4.95,
      reviewsCount: 128,
      deliveryDays: 5,
      description: "Get a production-grade, fast, and responsive web application built with modern React, Next.js, and Node.js. Includes clean responsive design, secure authentication, API integration, and automated deployment.",
      features: [
        "Full responsive layout (Desktop, Tablet, Mobile)",
        "API integration & database setup",
        "Authentication & role management",
        "Speed optimized & clean code architecture",
        "7 days complimentary post-launch support"
      ]
    },
    {
      id: "srv-2",
      title: "High-Converting Mobile & Web UI/UX Design System in Figma",
      category: "Graphic Design",
      freelancerId: "fl-2",
      seller: {
        name: "Alexander Vance",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
        level: "Top Rated"
      },
      thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80",
      startingPrice: 280,
      rating: 5.0,
      reviewsCount: 96,
      deliveryDays: 3,
      description: "Comprehensive Figma UI/UX design from user research and wireframing to pixel-perfect design systems, auto-layout components, and interactive developer-ready prototypes.",
      features: [
        "Custom design system with tokens & variables",
        "Up to 8 responsive screen layouts",
        "Interactive click-through prototype",
        "Complete asset export for development",
        "Unlimited revisions until satisfaction"
      ]
    },
    {
      id: "srv-3",
      title: "Cross-Platform Flutter Mobile App for iOS & Android",
      category: "Mobile App Development",
      freelancerId: "fl-3",
      seller: {
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80",
        level: "Pro Verified"
      },
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80",
      startingPrice: 500,
      rating: 4.9,
      reviewsCount: 74,
      deliveryDays: 7,
      description: "High-performance cross-platform mobile application written in Flutter. Single codebase for both iOS and Android with buttery 60fps animations, Firebase backend, and offline caching.",
      features: [
        "Native performance on iOS & Android",
        "State management using Bloc or Riverpod",
        "Push notifications & deep linking",
        "Firebase Auth & Firestore database",
        "App Store & Google Play submission guidance"
      ]
    },
    {
      id: "srv-4",
      title: "Comprehensive Data Analysis, ETL & Interactive Dashboard",
      category: "Data Analysis",
      freelancerId: "fl-4",
      seller: {
        name: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80",
        level: "Top Rated"
      },
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      startingPrice: 200,
      rating: 4.88,
      reviewsCount: 62,
      deliveryDays: 4,
      description: "Turn messy CSVs, SQL queries, or API endpoints into stunning PowerBI or Tableau dashboards. Includes clean data pipeline scripts, KPI summaries, and automated reporting.",
      features: [
        "Data cleaning & preprocessing in Python",
        "Interactive PowerBI / Tableau dashboard",
        "Custom KPI metrics & forecasting models",
        "Executive PDF summary report",
        "Full documentation & SQL script handover"
      ]
    },
    {
      id: "srv-5",
      title: "Complete Organic SEO Strategy & High-Impact Keyword Growth",
      category: "Digital Marketing",
      freelancerId: "fl-5",
      seller: {
        name: "Sophia Martinez",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80",
        level: "Top Rated"
      },
      thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
      startingPrice: 190,
      rating: 4.92,
      reviewsCount: 110,
      deliveryDays: 4,
      description: "Dominate Google search results with comprehensive on-page, technical, and off-page SEO. Includes competitor gap analysis, high-intent keyword mapping, and backlink recommendations.",
      features: [
        "Technical website audit & error fixes",
        "Competitor keyword research (150+ keywords)",
        "On-page meta tags & schema markup",
        "Actionable 3-month growth roadmap",
        "Monthly reporting template"
      ]
    },
    {
      id: "srv-6",
      title: "Enterprise Custom AI Agent & OpenAI LLM Integration",
      category: "AI & Machine Learning",
      freelancerId: "fl-6",
      seller: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=128&q=80",
        level: "Pro Verified"
      },
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      startingPrice: 450,
      rating: 4.97,
      reviewsCount: 48,
      deliveryDays: 6,
      description: "Build intelligent AI assistants and agentic workflows connecting your company data with OpenAI, Anthropic, or open-source LLMs using LangChain and Pinecone vector search.",
      features: [
        "RAG pipeline connected to your PDFs/docs",
        "Tool calling & automated workflow execution",
        "Context window optimization & prompt tuning",
        "Docker container & cloud deployment ready",
        "API rate-limiting & error fallback design"
      ]
    },
    {
      id: "srv-7",
      title: "High-Converting B2B Website Copywriting & Landing Page",
      category: "Writing & Translation",
      freelancerId: "fl-7",
      seller: {
        name: "Olivia Campbell",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80",
        level: "Top Rated"
      },
      thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
      startingPrice: 150,
      rating: 4.85,
      reviewsCount: 88,
      deliveryDays: 2,
      description: "Compelling headline-to-CTA sales copy that clearly articulates your product's value proposition, overcomes objections, and boosts conversion rates across your funnel.",
      features: [
        "Hero section headlines & subheadlines",
        "Feature & benefit bullet copy",
        "Social proof & testimonial phrasing",
        "2 revision rounds included",
        "SEO-optimized content structure"
      ]
    },
    {
      id: "srv-8",
      title: "Commercial 3D Product Animation & Motion Promo Video",
      category: "Video & Animation",
      freelancerId: "fl-8",
      seller: {
        name: "Lucas Morales",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&q=80",
        level: "Top Rated"
      },
      thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=600&q=80",
      startingPrice: 320,
      rating: 4.93,
      reviewsCount: 54,
      deliveryDays: 5,
      description: "Eye-catching 3D product visualization and cinematic commercial video designed to captivate your audience on social media, kickstarter campaigns, or digital billboards.",
      features: [
        "3D modeling & texturing from CAD or photos",
        "Smooth cinematic 4K camera movements",
        "Sound design & licensed background score",
        "Multiple aspect ratios (16:9, 9:16, 1:1)",
        "Source file handover"
      ]
    }
  ],

  jobs: [
    {
      id: "job-1",
      title: "Build a SaaS dashboard redesign",
      category: "Web Development",
      budget: 2200,
      deadline: "2 weeks",
      level: "Intermediate",
      location: "Remote",
      client: "Northstar Labs",
      description: "We need a modern product dashboard for a B2B SaaS app with analytics widgets, clean tables, and conversion-focused UX improvements.",
      skills: ["React", "UI/UX", "Dashboard Design", "TypeScript"],
      proposals: 12
    },
    {
      id: "job-2",
      title: "Brand identity and landing page copy",
      category: "Graphic Design",
      budget: 1200,
      deadline: "1 week",
      level: "Entry",
      location: "Remote",
      client: "Beacon Studio",
      description: "Need a polished startup brand system including logo exploration, palette selection, and conversion-focused landing page messaging.",
      skills: ["Branding", "Figma", "Copywriting", "UI Design"],
      proposals: 9
    },
    {
      id: "job-3",
      title: "Flutter app MVP for field technicians",
      category: "Mobile App Development",
      budget: 3200,
      deadline: "3 weeks",
      level: "Expert",
      location: "Hybrid",
      client: "OpsPilot",
      description: "Develop an MVP mobile app for technicians to log jobs, upload photos, view schedules, and manage task updates in the field.",
      skills: ["Flutter", "Firebase", "Mobile UX", "API Integration"],
      proposals: 15
    },
    {
      id: "job-4",
      title: "SEO growth strategy for ecommerce store",
      category: "Digital Marketing",
      budget: 900,
      deadline: "10 days",
      level: "Intermediate",
      location: "Remote",
      client: "Meridian Goods",
      description: "Looking for an SEO specialist to improve organic rankings, optimize category pages, and build a 90-day acquisition strategy.",
      skills: ["SEO", "Analytics", "Content", "Strategy"],
      proposals: 7
    }
  ],

  jobProposals: [
    {
      id: "prop-1",
      jobTitle: "Build a SaaS dashboard redesign",
      freelancer: "Daniel Morse",
      budget: 1950,
      status: "Pending",
      coverLetter: "I can design and ship a streamlined dashboard UI with strong analytics hierarchy and mobile responsiveness."
    },
    {
      id: "prop-2",
      jobTitle: "Flutter app MVP for field technicians",
      freelancer: "Alicia Stone",
      budget: 3000,
      status: "Shortlisted",
      coverLetter: "I have delivered two technician workflow apps and can implement the required offline functionality quickly."
    }
  ],

  projects: [
    {
      id: "project-1",
      title: "SaaS Dashboard Redesign",
      category: "Web Development",
      status: "In Progress",
      progress: 68,
      budget: 2200,
      deadline: "15 days left",
      client: { name: "Northstar Labs", role: "Product Lead" },
      freelancer: { name: "Daniel Morse", role: "Senior UI Engineer" },
      summary: "Improve the analytics dashboard experience for enterprise customers and align the UI with upgraded product messaging.",
      milestones: [
        { name: "Discovery & wireframes", status: "Completed" },
        { name: "Component library update", status: "Completed" },
        { name: "Dashboard build & QA", status: "In Progress" },
        { name: "Final handoff & launch", status: "Pending" }
      ],
      tasks: [
        "Finalize KPI cards and filters",
        "Rework table interactions",
        "Review color contrast and accessibility",
        "QA mobile responsiveness"
      ],
      delivery: {
        label: "Latest delivery",
        text: "Interactive prototype shared with stakeholder review. Final implementation planned after feedback loop."
      },
      lastUpdate: "Client approved the design system refresh on Friday."
    },
    {
      id: "project-2",
      title: "Flutter Technician App MVP",
      category: "Mobile App Development",
      status: "Submitted",
      progress: 92,
      budget: 3200,
      deadline: "4 days left",
      client: { name: "OpsPilot", role: "Operations Director" },
      freelancer: { name: "Alicia Stone", role: "Mobile App Developer" },
      summary: "Build a field-ready technician application for task updates, scheduling, photo capture, and offline job tracking.",
      milestones: [
        { name: "App architecture", status: "Completed" },
        { name: "Task management flows", status: "Completed" },
        { name: "Offline sync & photo upload", status: "Completed" },
        { name: "Final review & deployment", status: "In Progress" }
      ],
      tasks: [
        "Sync offline queue after reconnect",
        "Validate push notification alerts",
        "Review app store metadata",
        "Prepare final user guide"
      ],
      delivery: {
        label: "Delivery note",
        text: "QA pass completed across Android device set. Final deployment checklist is being reviewed by client."
      },
      lastUpdate: "Last version was deployed to staging for sign-off."
    },
    {
      id: "project-3",
      title: "SEO Growth Strategy",
      category: "Digital Marketing",
      status: "Pending",
      progress: 26,
      budget: 900,
      deadline: "3 weeks",
      client: { name: "Meridian Goods", role: "Marketing Manager" },
      freelancer: { name: "Sophia Martinez", role: "Growth Marketer" },
      summary: "Create a focused organic growth plan for category pages and SEO improvements across the storefront and blog content.",
      milestones: [
        { name: "Website audit", status: "Completed" },
        { name: "Keyword mapping", status: "In Progress" },
        { name: "Content plan", status: "Pending" },
        { name: "Sprint review", status: "Pending" }
      ],
      tasks: [
        "Audit technical SEO issues",
        "Map high intent keywords",
        "Define conversion testing plan",
        "Prepare backlink priorities"
      ],
      delivery: {
        label: "Planned delivery",
        text: "Strategy deck and content roadmap expected after the keyword audit is finalized."
      },
      lastUpdate: "Technical audit is under review with the client team."
    },
    {
      id: "project-4",
      title: "Brand Identity Package",
      category: "Graphic Design",
      status: "Completed",
      progress: 100,
      budget: 1200,
      deadline: "Completed",
      client: { name: "Beacon Studio", role: "Creative Director" },
      freelancer: { name: "Alexander Vance", role: "Design Lead" },
      summary: "Deliver a new identity system, logo set, and landing page direction for a scaling creative studio brand refresh.",
      milestones: [
        { name: "Moodboard & research", status: "Completed" },
        { name: "Logo exploration", status: "Completed" },
        { name: "Brand kit files", status: "Completed" },
        { name: "Launch feedback", status: "Completed" }
      ],
      tasks: [
        "Approved final color palette",
        "Delivered logo pack and style guide",
        "Prepared landing page copy system",
        "Closed final review round"
      ],
      delivery: {
        label: "Final delivery",
        text: "Brand package and social templates were approved and delivered to the client."
      },
      lastUpdate: "Project closed successfully and feedback was marked as positive."
    }
  ],

  howItWorks: [
    {
      step: "01",
      title: "Post a Job or Search",
      desc: "Describe your project requirements or browse thousands of pre-packaged services tailored to your budget."
    },
    {
      step: "02",
      title: "Select Top Talent",
      desc: "Compare verified freelancer profiles, authentic client reviews, portfolios, and guaranteed delivery times."
    },
    {
      step: "03",
      title: "Collaborate With Escrow",
      desc: "Work closely using built-in messaging and milestone tracking. Funds are securely held until you approve."
    },
    {
      step: "04",
      title: "Receive Work & Grow",
      desc: "Approve deliverables, release payments seamlessly, and leave transparent feedback to foster quality work."
    }
  ],

  stats: [
    { value: "45,000+", label: "Verified Freelancers" },
    { value: "180,000+", label: "Projects Completed" },
    { value: "99.4%", label: "Client Satisfaction" },
    { value: "$24M+", label: "Paid to Freelancers" }
  ],

  // Utility helpers
  getFreelancerById: function(id) {
    return this.freelancers.find(fl => fl.id === id) || this.freelancers[0];
  },

  getServiceById: function(id) {
    const localServices = this.getLocalServices();
    const foundLocal = localServices.find(srv => srv.id === id);
    if (foundLocal) return foundLocal;

    return this.services.find(srv => srv.id === id) || this.services[0];
  },

  // Jobs Data & Helpers (Week 4)
  jobs: [
    {
      id: "job-1",
      title: "Full-Stack SaaS Platform MVP with React, TypeScript & Node.js",
      category: "Web Development",
      budget: 2800,
      budgetType: "Fixed Price",
      experienceLevel: "Expert",
      duration: "3-4 Weeks",
      postedDate: "2 hours ago",
      proposalsCount: 6,
      requiredSkills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      description: "We are seeking a senior full-stack developer to build the initial MVP for an AI-powered project workflow management SaaS. The application requires clean responsive frontend UI, JWT authentication, stripe payment integration, and a scalable REST API.",
      client: {
        name: "CloudVibe Technologies",
        location: "San Francisco, USA",
        rating: 4.95,
        reviewsCount: 38,
        spent: "$65,000+",
        paymentVerified: true
      }
    },
    {
      id: "job-2",
      title: "Complete Mobile App & Web UI/UX Design System in Figma",
      category: "Graphic Design",
      budget: 1600,
      budgetType: "Fixed Price",
      experienceLevel: "Intermediate to Expert",
      duration: "2 Weeks",
      postedDate: "4 hours ago",
      proposalsCount: 11,
      requiredSkills: ["Figma", "UI/UX Design", "Design Systems", "Prototyping", "Mobile UI"],
      description: "Looking for an exceptional product designer to craft a comprehensive design system and 12 high-fidelity responsive screens for our upcoming fintech investment application. All components must utilize Figma auto-layout and color/typography tokens.",
      client: {
        name: "FinPulse Labs",
        location: "London, UK",
        rating: 4.88,
        reviewsCount: 22,
        spent: "$32,000+",
        paymentVerified: true
      }
    },
    {
      id: "job-3",
      title: "Cross-Platform Flutter Mobile Application for iOS & Android",
      category: "Mobile App Development",
      budget: 3400,
      budgetType: "Fixed Price",
      experienceLevel: "Expert",
      duration: "4-6 Weeks",
      postedDate: "1 day ago",
      proposalsCount: 9,
      requiredSkills: ["Flutter", "Dart", "Firebase", "REST APIs", "App Store"],
      description: "Need a talented Flutter engineer to develop an on-demand delivery tracking app. Features include real-time geolocation map tracking, push notifications, customer profiles, and order status sync via Firebase Firestore.",
      client: {
        name: "SpeedyLogistics Inc",
        location: "Austin, USA",
        rating: 5.0,
        reviewsCount: 45,
        spent: "$90,000+",
        paymentVerified: true
      }
    },
    {
      id: "job-4",
      title: "Executive Business Intelligence Dashboard & Data Pipeline",
      category: "Data Analysis",
      budget: 1200,
      budgetType: "Fixed Price",
      experienceLevel: "Intermediate",
      duration: "1-2 Weeks",
      postedDate: "1 day ago",
      proposalsCount: 7,
      requiredSkills: ["Python", "PowerBI", "SQL", "ETL Pipelines", "Data Visualization"],
      description: "Our e-commerce store needs automated Python ETL pipelines to ingest data from Shopify and Google Ads into a central database, producing an interactive PowerBI executive dashboard tracking CLV, ROAS, and CAC.",
      client: {
        name: "DirectRetail Group",
        location: "Toronto, Canada",
        rating: 4.85,
        reviewsCount: 17,
        spent: "$18,500+",
        paymentVerified: true
      }
    },
    {
      id: "job-5",
      title: "Technical SEO Audit, On-Page Optimization & Growth Roadmap",
      category: "Digital Marketing",
      budget: 950,
      budgetType: "Fixed Price",
      experienceLevel: "Intermediate",
      duration: "2 Weeks",
      postedDate: "2 days ago",
      proposalsCount: 14,
      requiredSkills: ["Technical SEO", "Google Search Console", "Keyword Research", "Content Strategy"],
      description: "We are seeking a seasoned SEO strategist to conduct an in-depth audit of our B2B SaaS website, eliminate crawl errors, optimize core web vitals, and provide high-intent keyword targets for our content calendar.",
      client: {
        name: "SaaSGrowth Partners",
        location: "Sydney, Australia",
        rating: 4.92,
        reviewsCount: 29,
        spent: "$41,000+",
        paymentVerified: true
      }
    },
    {
      id: "job-6",
      title: "RAG AI Agent Integration with Vector Database & Custom Knowledge",
      category: "AI & Machine Learning",
      budget: 3200,
      budgetType: "Fixed Price",
      experienceLevel: "Expert",
      duration: "3 Weeks",
      postedDate: "3 days ago",
      proposalsCount: 8,
      requiredSkills: ["Python", "LangChain", "OpenAI API", "Pinecone", "FastAPI"],
      description: "Architect and implement an intelligent internal document retrieval assistant using Retrieval-Augmented Generation (RAG). The system should ingest internal PDF policies and provide citations with high accuracy.",
      client: {
        name: "EnterpriseAI Solutions",
        location: "Boston, USA",
        rating: 4.98,
        reviewsCount: 52,
        spent: "$110,000+",
        paymentVerified: true
      }
    }
  ],

  getLocalJobs: function() {
    try {
      const stored = localStorage.getItem("worksphere_jobs");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}

    this.saveLocalJobs(this.jobs);
    return this.jobs;
  },

  saveLocalJobs: function(jobsList) {
    try {
      localStorage.setItem("worksphere_jobs", JSON.stringify(jobsList));
      return true;
    } catch (e) {
      console.error("Failed to save jobs to localStorage:", e);
      return false;
    }
  },

  addLocalJob: function(newJob) {
    const jobs = this.getLocalJobs();
    jobs.unshift(newJob);
    this.saveLocalJobs(jobs);
    this.jobs.unshift(newJob);
    return newJob;
  },

  getJobById: function(id) {
    const jobs = this.getLocalJobs();
    return jobs.find(j => j.id === id) || jobs[0];
  },

  // Favorites & Bookmarks Data (Week 7)
  getLocalFavorites: function() {
    try {
      const stored = localStorage.getItem("worksphere_favorites");
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    // Default sample favorites
    const defaultFavorites = [
      {
        id: "srv-1",
        type: "service",
        title: "Modern Responsive SaaS Web Application Development",
        category: "Web Development",
        price: 350,
        rating: 4.95,
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        sellerName: "Sarah Jenkins"
      },
      {
        id: "fl-2",
        type: "freelancer",
        title: "Alexander Vance",
        category: "Graphic Design",
        price: 280,
        rating: 5.0,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        sellerName: "Lead UI/UX & Product Designer"
      }
    ];

    this.saveLocalFavorites(defaultFavorites);
    return defaultFavorites;
  },

  saveLocalFavorites: function(list) {
    try {
      localStorage.setItem("worksphere_favorites", JSON.stringify(list));
    } catch (e) {}
  },

  isFavorite: function(itemId) {
    const list = this.getLocalFavorites();
    return list.some(item => item.id === itemId);
  },

  toggleFavorite: function(item) {
    const list = this.getLocalFavorites();
    const idx = list.findIndex(i => i.id === item.id);
    let added = false;
    if (idx !== -1) {
      list.splice(idx, 1);
    } else {
      list.unshift(item);
      added = true;
    }
    this.saveLocalFavorites(list);
    return { list, added };
  },

  // Dashboard Aggregator Helper (Week 7)
  getDashboardMetrics: function() {
    const orders = this.getLocalOrders();
    const jobs = this.getLocalJobs();
    const proposals = this.getLocalProposals();
    const services = this.getLocalServices();
    const reviews = this.getLocalReviews();
    const favorites = this.getLocalFavorites();

    const activeOrders = orders.filter(o => o.status === "In Progress" || o.status === "Submitted");
    const completedOrders = orders.filter(o => o.status === "Completed");
    const unreadMessages = this.getLocalConversations().reduce((sum, conversation) => sum + Number(conversation.unreadCount || 0), 0);

    const totalFreelancerEarnings = completedOrders.reduce((sum, o) => sum + (o.budget || 0), 0) + 4200;
    const totalClientSpent = orders.reduce((sum, o) => sum + (o.budget || 0), 0);

    return {
      freelancer: {
        totalEarnings: totalFreelancerEarnings,
        activeProjects: activeOrders.length,
        completedProjects: completedOrders.length,
        rating: 4.95,
        reviewsCount: reviews.length,
        servicesCount: services.length,
        unreadMessages
      },
      client: {
        totalSpent: totalClientSpent,
        postedJobs: jobs.length,
        proposalsReceived: jobs.reduce((sum, j) => sum + (j.proposalsCount || 0), 0),
        activeContracts: activeOrders.length,
        favoritesCount: favorites.length,
        unreadMessages
      }
    };
  },
  conversations: [
    {
      id: "conv-1",
      contactName: "CloudVibe Technologies",
      contactRole: "Client (#ORD-101)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80",
      online: true,
      lastMessage: "The component library looks fantastic! Milestone 1 funds released.",
      lastTime: "12m ago",
      unreadCount: 1,
      messages: [
        {
          id: "m-1",
          sender: "them",
          text: "Hi Sarah! We reviewed the initial Storybook components. Everything is looking clean and responsive.",
          timestamp: "Yesterday, 4:20 PM"
        },
        {
          id: "m-2",
          sender: "me",
          text: "Thank you! I'm now integrating the PostgreSQL database schema and setting up JWT authentication for Milestone 2.",
          timestamp: "Yesterday, 5:10 PM"
        },
        {
          id: "m-3",
          sender: "them",
          text: "The component library looks fantastic! Milestone 1 funds released.",
          timestamp: "12m ago"
        }
      ]
    },
    {
      id: "conv-2",
      contactName: "FinPulse Labs",
      contactRole: "Client (#ORD-102)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
      online: true,
      lastMessage: "We are reviewing the high-fidelity Figma prototype today.",
      lastTime: "1h ago",
      unreadCount: 0,
      messages: [
        {
          id: "m-201",
          sender: "them",
          text: "Hello! Did you get a chance to finalize the mobile checkout wireframes?",
          timestamp: "Nov 12, 10:15 AM"
        },
        {
          id: "m-202",
          sender: "me",
          text: "Yes, all 14 screens are updated with design tokens and auto-layout. Check out the latest prototype submission!",
          timestamp: "Nov 13, 11:30 AM"
        },
        {
          id: "m-203",
          sender: "them",
          text: "We are reviewing the high-fidelity Figma prototype today.",
          timestamp: "1h ago"
        }
      ]
    },
    {
      id: "conv-3",
      contactName: "SpeedyLogistics Inc",
      contactRole: "Client (#ORD-104)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80",
      online: false,
      lastMessage: "Looking forward to the kickoff meeting tomorrow at 10 AM EST.",
      lastTime: "Yesterday",
      unreadCount: 0,
      messages: [
        {
          id: "m-301",
          sender: "them",
          text: "Welcome aboard Elena! We have funded the project escrow and look forward to the Flutter app.",
          timestamp: "Nov 11, 2:00 PM"
        },
        {
          id: "m-302",
          sender: "them",
          text: "Looking forward to the kickoff meeting tomorrow at 10 AM EST.",
          timestamp: "Yesterday"
        }
      ]
    }
  ],

  notifications: [
    {
      id: "notif-1",
      type: "project_completed",
      title: "Project Completed & Escrow Released",
      message: "DirectRetail Group approved the final deliverable for Executive BI Dashboard. $1,200 released from escrow!",
      time: "25 minutes ago",
      unread: true,
      link: "reviews.html?id=ord-103"
    },
    {
      id: "notif-2",
      type: "message",
      title: "New Message from CloudVibe",
      message: "The component library looks fantastic! Milestone 1 funds released.",
      time: "40 minutes ago",
      unread: true,
      link: "messages.html?conv=conv-1"
    },
    {
      id: "notif-3",
      type: "proposal",
      title: "Proposal Shortlisted!",
      message: "FinPulse Labs shortlisted your proposal for the UI/UX Design System project.",
      time: "3 hours ago",
      unread: true,
      link: "my-proposals.html"
    },
    {
      id: "notif-4",
      type: "project_start",
      title: "New Milestone Started",
      message: "Milestone 2 (API Endpoints & Database Schema) has been marked in progress.",
      time: "Yesterday",
      unread: false,
      link: "order-details.html?id=ord-101"
    },
    {
      id: "notif-5",
      type: "review",
      title: "New 5-Star Review Received ⭐",
      message: "TechCorp Innovations left a 5-star review: 'Phenomenal delivery! Communication was crystal clear...'",
      time: "2 days ago",
      unread: false,
      link: "reviews.html"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      orderId: "ord-103",
      projectTitle: "Executive Business Intelligence Dashboard & Data Pipeline",
      reviewerName: "DirectRetail Group",
      reviewerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80",
      reviewerRole: "Verified Enterprise Client",
      rating: 5,
      date: "November 14, 2026",
      comment: "Marcus did an outstanding job transforming our messy e-commerce spreadsheets into an automated, executive-ready PowerBI dashboard. Delivered 2 days ahead of schedule with spotless SQL queries. Highly recommended!"
    },
    {
      id: "rev-2",
      orderId: "ord-99",
      projectTitle: "Next.js SaaS Web Application Redesign",
      reviewerName: "TechCorp Innovations",
      reviewerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80",
      reviewerRole: "Verified Client",
      rating: 5,
      date: "October 28, 2026",
      comment: "Phenomenal work! Communication was crystal clear from day one, and the final deliverable exceeded all our performance and aesthetic expectations. Will definitely hire again."
    },
    {
      id: "rev-3",
      orderId: "ord-98",
      projectTitle: "Mobile Banking Prototype & Design Tokens",
      reviewerName: "NextScale Studio",
      reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
      reviewerRole: "Verified Client",
      rating: 5,
      date: "October 15, 2026",
      comment: "Completed the design system with remarkable precision. Every screen is pixel-perfect and ready for our Flutter team. Very receptive to feedback!"
    }
  ],

  getLocalConversations: function() {
    try {
      const stored = localStorage.getItem("worksphere_conversations");
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    this.saveLocalConversations(this.conversations);
    return this.conversations;
  },

  saveLocalConversations: function(list) {
    try {
      localStorage.setItem("worksphere_conversations", JSON.stringify(list));
    } catch (e) {}
  },

  addMessageToConversation: function(convId, text) {
    const convs = this.getLocalConversations();
    const conv = convs.find(c => c.id === convId);
    if (conv) {
      const newMsg = {
        id: `m-${Date.now()}`,
        sender: "me",
        text: text,
        timestamp: "Just now"
      };
      conv.messages.push(newMsg);
      conv.lastMessage = text;
      conv.lastTime = "Just now";
      this.saveLocalConversations(convs);
      return newMsg;
    }
    return null;
  },

  getLocalNotifications: function() {
    try {
      const stored = localStorage.getItem("worksphere_notifications");
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    this.saveLocalNotifications(this.notifications);
    return this.notifications;
  },

  saveLocalNotifications: function(list) {
    try {
      localStorage.setItem("worksphere_notifications", JSON.stringify(list));
    } catch (e) {}
  },

  markNotificationRead: function(notifId) {
    const list = this.getLocalNotifications();
    const item = list.find(n => n.id === notifId);
    if (item) {
      item.unread = false;
      this.saveLocalNotifications(list);
    }
    return list;
  },

  markAllNotificationsRead: function() {
    const list = this.getLocalNotifications();
    list.forEach(n => n.unread = false);
    this.saveLocalNotifications(list);
    return list;
  },

  getUnreadNotificationCount: function() {
    const list = this.getLocalNotifications();
    return list.filter(n => n.unread).length;
  },

  getLocalReviews: function() {
    try {
      const stored = localStorage.getItem("worksphere_reviews");
      if (stored) return JSON.parse(stored);
    } catch (e) {}

    this.saveLocalReviews(this.reviews);
    return this.reviews;
  },

  saveLocalReviews: function(list) {
    try {
      localStorage.setItem("worksphere_reviews", JSON.stringify(list));
    } catch (e) {}
  },

  addLocalReview: function(newReview) {
    const list = this.getLocalReviews();
    list.unshift(newReview);
    this.saveLocalReviews(list);
    return newReview;
  },
  orders: [
    {
      id: "ord-101",
      title: "Full-Stack SaaS Platform MVP with React & Node.js",
      category: "Web Development",
      budget: 2800,
      status: "In Progress",
      progress: 65,
      deadline: "November 28, 2026",
      daysRemaining: 14,
      startDate: "November 08, 2026",
      client: {
        name: "CloudVibe Technologies",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80",
        location: "San Francisco, USA",
        role: "Client"
      },
      freelancer: {
        name: "Sarah Jenkins",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80",
        title: "Senior Full-Stack Developer",
        role: "Freelancer"
      },
      milestones: [
        {
          id: "m-1",
          title: "System Architecture & Responsive Component Library",
          amount: 800,
          dueDate: "Nov 14, 2026",
          status: "Completed",
          completedDate: "Nov 13, 2026"
        },
        {
          id: "m-2",
          title: "API Endpoints, Database Schema & Authentication",
          amount: 1200,
          dueDate: "Nov 21, 2026",
          status: "In Progress"
        },
        {
          id: "m-3",
          title: "Stripe Billing, Final QA & Production Deployment",
          amount: 800,
          dueDate: "Nov 28, 2026",
          status: "Pending"
        }
      ],
      submissions: [
        {
          id: "sub-1",
          date: "Nov 13, 2026",
          submittedBy: "Sarah Jenkins",
          message: "Delivered Milestone 1: Component library in Storybook with 100% responsive test passes and Tailwind CSS tokens.",
          fileUrl: "worksphere-saas-components-v1.zip",
          fileSize: "18.4 MB",
          status: "Approved"
        }
      ]
    },
    {
      id: "ord-102",
      title: "Mobile App & Web UI/UX Design System in Figma",
      category: "Graphic Design",
      budget: 1600,
      status: "Submitted",
      progress: 90,
      deadline: "November 18, 2026",
      daysRemaining: 4,
      startDate: "November 04, 2026",
      client: {
        name: "FinPulse Labs",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80",
        location: "London, UK",
        role: "Client"
      },
      freelancer: {
        name: "Alexander Vance",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80",
        title: "Lead UI/UX Designer",
        role: "Freelancer"
      },
      milestones: [
        {
          id: "m-201",
          title: "Low-Fidelity Wireframes & User Journey Flow",
          amount: 600,
          dueDate: "Nov 09, 2026",
          status: "Completed",
          completedDate: "Nov 08, 2026"
        },
        {
          id: "m-202",
          title: "High-Fidelity Screens & Interactive Prototype",
          amount: 1000,
          dueDate: "Nov 17, 2026",
          status: "Completed",
          completedDate: "Nov 14, 2026"
        }
      ],
      submissions: [
        {
          id: "sub-201",
          date: "Nov 14, 2026",
          submittedBy: "Alexander Vance",
          message: "Final design package ready for inspection! Includes 14 Figma screens, complete typography/color tokens, and clickable prototype link.",
          fileUrl: "finpulse-design-system-vfinal.fig",
          fileSize: "42.8 MB",
          status: "Pending Client Approval"
        }
      ]
    },
    {
      id: "ord-103",
      title: "Executive Business Intelligence Dashboard & Data Pipeline",
      category: "Data Analysis",
      budget: 1200,
      status: "Completed",
      progress: 100,
      deadline: "November 10, 2026",
      daysRemaining: 0,
      startDate: "October 26, 2026",
      client: {
        name: "DirectRetail Group",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80",
        location: "Toronto, Canada",
        role: "Client"
      },
      freelancer: {
        name: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=128&q=80",
        title: "Data Analyst & BI Lead",
        role: "Freelancer"
      },
      milestones: [
        {
          id: "m-301",
          title: "Shopify & Ads API Pipeline",
          amount: 600,
          dueDate: "Nov 02, 2026",
          status: "Completed",
          completedDate: "Nov 01, 2026"
        },
        {
          id: "m-302",
          title: "PowerBI Executive Dashboard & Handover",
          amount: 600,
          dueDate: "Nov 10, 2026",
          status: "Completed",
          completedDate: "Nov 09, 2026"
        }
      ],
      submissions: [
        {
          id: "sub-301",
          date: "Nov 09, 2026",
          submittedBy: "Marcus Chen",
          message: "Project complete! PowerBI file, SQL migration scripts, and documentation guide enclosed.",
          fileUrl: "retail-bi-dashboard-handover.pbix",
          fileSize: "28.1 MB",
          status: "Approved"
        }
      ]
    },
    {
      id: "ord-104",
      title: "Cross-Platform Flutter Mobile Application",
      category: "Mobile App Development",
      budget: 3400,
      status: "Pending",
      progress: 15,
      deadline: "December 15, 2026",
      daysRemaining: 31,
      startDate: "November 12, 2026",
      client: {
        name: "SpeedyLogistics Inc",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&q=80",
        location: "Austin, USA",
        role: "Client"
      },
      freelancer: {
        name: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&q=80",
        title: "Mobile App Architect",
        role: "Freelancer"
      },
      milestones: [
        {
          id: "m-401",
          title: "Project Kickoff & Environment Setup",
          amount: 1000,
          dueDate: "Nov 20, 2026",
          status: "In Progress"
        },
        {
          id: "m-402",
          title: "Core Real-Time GPS Tracking Module",
          amount: 1400,
          dueDate: "Dec 05, 2026",
          status: "Pending"
        },
        {
          id: "m-403",
          title: "App Store & Play Store Handover",
          amount: 1000,
          dueDate: "Dec 15, 2026",
          status: "Pending"
        }
      ],
      submissions: []
    }
  ],

  getLocalOrders: function() {
    try {
      const stored = localStorage.getItem("worksphere_orders");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}

    this.saveLocalOrders(this.orders);
    return this.orders;
  },

  saveLocalOrders: function(ordersList) {
    try {
      localStorage.setItem("worksphere_orders", JSON.stringify(ordersList));
      return true;
    } catch (e) {
      console.error("Failed to save orders to localStorage:", e);
      return false;
    }
  },

  getOrderById: function(id) {
    const orders = this.getLocalOrders();
    return orders.find(o => o.id === id) || orders[0];
  },

  updateOrderStatus: function(orderId, newStatus) {
    const orders = this.getLocalOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === "Completed") order.progress = 100;
      this.saveLocalOrders(orders);
    }
    return order;
  },

  addOrderSubmission: function(orderId, submission) {
    const orders = this.getLocalOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      if (!order.submissions) order.submissions = [];
      order.submissions.unshift(submission);
      order.status = "Submitted";
      order.progress = Math.max(order.progress, 90);
      this.saveLocalOrders(orders);
    }
    return order;
  },

  toggleMilestoneStatus: function(orderId, milestoneId) {
    const orders = this.getLocalOrders();
    const order = orders.find(o => o.id === orderId);
    if (order && order.milestones) {
      const m = order.milestones.find(item => item.id === milestoneId);
      if (m) {
        m.status = (m.status === "Completed") ? "In Progress" : "Completed";

        // Recalculate progress %
        const completedCount = order.milestones.filter(item => item.status === "Completed").length;
        order.progress = Math.round((completedCount / order.milestones.length) * 100);
        if (order.progress === 100) {
          order.status = "Completed";
        }
        this.saveLocalOrders(orders);
      }
    }
    return order;
  },
  getLocalProposals: function() {
    const defaultProposals = [
      {
        id: "prop-1",
        jobId: "job-1",
        jobTitle: "Full-Stack SaaS Platform MVP with React, TypeScript & Node.js",
        proposedPrice: 2800,
        deliveryDays: 25,
        coverLetter: "Dear Client, I have over 8 years of specialized experience architecting scalable full-stack applications with React, TypeScript, and Node.js. Having delivered over 90 verified marketplace projects, I can ensure a production-grade MVP with comprehensive test coverage and clean documentation.",
        relevantSkills: "React, TypeScript, Node.js, PostgreSQL",
        status: "Shortlisted",
        submittedDate: "Yesterday at 3:45 PM"
      }
    ];

    try {
      const stored = localStorage.getItem("worksphere_my_proposals");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}

    this.saveLocalProposals(defaultProposals);
    return defaultProposals;
  },

  saveLocalProposals: function(proposalsList) {
    try {
      localStorage.setItem("worksphere_my_proposals", JSON.stringify(proposalsList));
      return true;
    } catch (e) {
      console.error("Failed to save proposals to localStorage:", e);
      return false;
    }
  },

  addLocalProposal: function(newProposal) {
    const proposals = this.getLocalProposals();
    proposals.unshift(newProposal);
    this.saveLocalProposals(proposals);

    // Increment proposals count on job
    const jobs = this.getLocalJobs();
    const job = jobs.find(j => j.id === newProposal.jobId);
    if (job) {
      job.proposalsCount = (job.proposalsCount || 0) + 1;
      this.saveLocalJobs(jobs);
    }
    return newProposal;
  },

  withdrawLocalProposal: function(proposalId) {
    let proposals = this.getLocalProposals();
    proposals = proposals.filter(p => p.id !== proposalId);
    this.saveLocalProposals(proposals);
    return proposals;
  },

  // User Profile Local Storage Helpers (Week 3)
  getCurrentUserProfile: function() {
    const defaultProfile = {
      name: "Sarah Jenkins",
      title: "Senior Full-Stack Developer & UI Architect",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
      category: "Web Development",
      hourlyRate: 65,
      startingPrice: 350,
      experienceLevel: "Senior Specialist (8+ Years)",
      location: "San Francisco, USA",
      languages: "English (Native), Spanish (Conversational)",
      bio: "Passionate full-stack developer with over 8 years of professional experience building scalable web applications, enterprise dashboards, and high-performance APIs. Specialized in React, TypeScript, Next.js, and Node.js.",
      skills: ["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "GraphQL"],
      rating: 4.95,
      reviewsCount: 128,
      completedJobs: 94,
      badge: "Top Rated Plus"
    };

    try {
      const stored = localStorage.getItem("worksphere_user_profile");
      return stored ? JSON.parse(stored) : defaultProfile;
    } catch (e) {
      return defaultProfile;
    }
  },

  saveCurrentUserProfile: function(profileData) {
    try {
      localStorage.setItem("worksphere_user_profile", JSON.stringify(profileData));
      return true;
    } catch (e) {
      console.error("Failed to save profile to localStorage:", e);
      return false;
    }
  },

  // My Services Local Storage Helpers (Week 3)
  getLocalServices: function() {
    try {
      const stored = localStorage.getItem("worksphere_my_services");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}

    // Initial default services for current user
    const initialServices = [
      this.services[0] // Sarah's default service
    ];
    this.saveLocalServices(initialServices);
    return initialServices;
  },

  saveLocalServices: function(servicesList) {
    try {
      localStorage.setItem("worksphere_my_services", JSON.stringify(servicesList));
      return true;
    } catch (e) {
      console.error("Failed to save services to localStorage:", e);
      return false;
    }
  },

  addLocalService: function(service) {
    const services = this.getLocalServices();
    services.unshift(service);
    this.saveLocalServices(services);
    // Also push to in-memory catalog
    this.services.unshift(service);
    return service;
  },

  deleteLocalService: function(serviceId) {
    let services = this.getLocalServices();
    services = services.filter(s => s.id !== serviceId);
    this.saveLocalServices(services);
    this.services = this.services.filter(s => s.id !== serviceId);
    return services;
  }
};

// Export or expose globally
if (typeof window !== "undefined") {
  window.MARKETPLACE_DATA = MARKETPLACE_DATA;
}
