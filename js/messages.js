/**
 * WorkSphere - Messaging & Chat Controller
 * Week 6: Conversation List, Chat Window & Simulated Real-time Communication
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initChat();
});

let activeConversationId = "conv-1";

function initChat() {
  const urlParams = new URLSearchParams(window.location.search);
  const convParam = urlParams.get("conv");
  const contactName = urlParams.get("name");
  const conversations = window.MARKETPLACE_DATA.getLocalConversations();
  if (contactName) {
    let conversation = conversations.find(item => item.contactName.toLowerCase() === contactName.toLowerCase());
    if (!conversation) {
      const freelancer = window.MARKETPLACE_DATA.freelancers.find(item => item.name.toLowerCase() === contactName.toLowerCase());
      conversation = {
        id: `conv-contact-${freelancer ? freelancer.id : Date.now()}`,
        contactName: freelancer ? freelancer.name : contactName,
        contactRole: freelancer ? freelancer.title : "WorkSphere Member",
        avatar: freelancer ? freelancer.avatar : "",
        online: Boolean(freelancer),
        lastMessage: "No messages yet",
        lastTime: "Now",
        unreadCount: 0,
        messages: []
      };
      conversations.unshift(conversation);
      window.MARKETPLACE_DATA.saveLocalConversations(conversations);
    }
    activeConversationId = conversation.id;
  } else if (convParam && conversations.some(item => item.id === convParam)) {
    activeConversationId = convParam;
  } else if (conversations.length) {
    activeConversationId = conversations[0].id;
  }

  renderConversationList();
  renderChatWindow();
  setupMessageInput();
  setupSearch();
}

function renderConversationList() {
  const container = document.getElementById("conversationItemsList");
  if (!container) return;

  const conversations = window.MARKETPLACE_DATA.getLocalConversations();

  container.innerHTML = conversations.map(c => {
    const isActive = c.id === activeConversationId;
    return `
      <div class="conv-item-card ${isActive ? 'active' : ''}" data-id="${c.id}">
        <div class="conv-avatar-wrap">
          ${c.avatar ? `<img src="${escapeChatText(c.avatar)}" alt="${escapeChatText(c.contactName)}" class="conv-avatar-img">` : `<span class="conv-avatar-fallback">${escapeChatText(c.contactName.slice(0, 2))}</span>`}
          ${c.online ? '<span class="fl-online-indicator"></span>' : ''}
        </div>
        <div class="conv-item-body">
          <div class="conv-item-top">
            <h4 class="conv-contact-name">${escapeChatText(c.contactName)}</h4>
            <span class="conv-time-text">${escapeChatText(c.lastTime)}</span>
          </div>
          <div class="conv-item-sub">
            <span class="conv-last-msg">${escapeChatText(c.lastMessage || "No messages yet")}</span>
            ${c.unreadCount > 0 ? `<span class="conv-unread-pill">${c.unreadCount}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Attach click listener to switch conversation
  container.querySelectorAll(".conv-item-card").forEach(item => {
    item.addEventListener("click", () => {
      activeConversationId = item.getAttribute("data-id");
      // Reset unread count
      const convs = window.MARKETPLACE_DATA.getLocalConversations();
      const current = convs.find(c => c.id === activeConversationId);
      if (current) {
        current.unreadCount = 0;
        window.MARKETPLACE_DATA.saveLocalConversations(convs);
      }
      renderConversationList();
      renderChatWindow();
    });
  });
}

function renderChatWindow() {
  const convs = window.MARKETPLACE_DATA.getLocalConversations();
  const conv = convs.find(c => c.id === activeConversationId) || convs[0];
  if (!conv) return;

  // Header
  const avatar = document.getElementById("activeChatAvatar");
  const name = document.getElementById("activeChatName");
  const role = document.getElementById("activeChatRole");
  const online = document.getElementById("activeChatOnline");

  if (avatar) {
    avatar.src = conv.avatar || "";
    avatar.alt = conv.contactName;
    avatar.hidden = !conv.avatar;
  }
  if (name) name.innerText = conv.contactName;
  if (role) role.innerText = conv.contactRole;
  if (online) online.style.display = conv.online ? "block" : "none";

  // Messages
  const body = document.getElementById("chatMessagesBody");
  if (!body) return;

  const userProfile = window.MARKETPLACE_DATA.getCurrentUserProfile();

  body.innerHTML = conv.messages.length ? conv.messages.map(m => {
    const isMe = m.sender === "me";
    return `
      <div class="chat-bubble-row ${isMe ? 'bubble-row-me' : 'bubble-row-them'}">
        ${!isMe && conv.avatar ? `<img src="${escapeChatText(conv.avatar)}" class="bubble-avatar" alt="${escapeChatText(conv.contactName)}">` : ''}
        <div class="bubble-content-box ${isMe ? 'bubble-me' : 'bubble-them'}">
          <p class="bubble-text">${escapeChatText(m.text)}</p>
          <span class="bubble-timestamp">${escapeChatText(m.timestamp)}</span>
        </div>
        ${isMe ? `<img src="${escapeChatText(userProfile.avatar)}" class="bubble-avatar" alt="You">` : ''}
      </div>
    `;
  }).join("") : '<p class="chat-empty-state">No messages yet. Send the first message to start this conversation.</p>';

  // Auto-scroll to bottom
  body.scrollTop = body.scrollHeight;
}

function escapeChatText(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function setupMessageInput() {
  const form = document.getElementById("chatInputForm");
  const input = document.getElementById("chatMessageInput");
  const attachBtn = document.getElementById("attachFileBtn");

  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      // 1. Add user message
      window.MARKETPLACE_DATA.addMessageToConversation(activeConversationId, text);
      input.value = "";
      renderConversationList();
      renderChatWindow();

      // 2. Simulate smart automated reply after 1.4s
      setTimeout(() => {
        simulateReply(activeConversationId);
      }, 1400);
    });
  }

  if (attachBtn) {
    attachBtn.addEventListener("click", () => {
      alert("Attachment selector simulated: You can attach .zip, .fig, .pdf, or image mockups directly to your conversation.");
    });
  }
}

function simulateReply(convId) {
  const convs = window.MARKETPLACE_DATA.getLocalConversations();
  const conv = convs.find(c => c.id === convId);
  if (!conv) return;

  const smartReplies = [
    "Thanks for the prompt update! Our product team is reviewing this right now.",
    "Sounds great! Everything is on track for our upcoming milestone deadline.",
    "Received, thank you! I'll test this on our staging server and confirm.",
    "Awesome progress! Let me know if you need any additional API credentials."
  ];

  const randomReply = smartReplies[Math.floor(Math.random() * smartReplies.length)];

  const replyMsg = {
    id: `m-${Date.now()}`,
    sender: "them",
    text: randomReply,
    timestamp: "Just now"
  };

  conv.messages.push(replyMsg);
  conv.lastMessage = randomReply;
  conv.lastTime = "Just now";
  window.MARKETPLACE_DATA.saveLocalConversations(convs);

  if (activeConversationId === convId) {
    renderChatWindow();
  }
  renderConversationList();
}

function setupSearch() {
  const searchInput = document.getElementById("convSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll(".conv-item-card");
      items.forEach(item => {
        const name = item.querySelector(".conv-contact-name").innerText.toLowerCase();
        const msg = item.querySelector(".conv-last-msg").innerText.toLowerCase();
        if (name.includes(q) || msg.includes(q)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
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

  // Update notification badge in navbar
  const unreadCount = window.MARKETPLACE_DATA.getUnreadNotificationCount();
  const badge = document.getElementById("navNotifBadge");
  if (badge) {
    badge.innerText = unreadCount;
    badge.style.display = unreadCount > 0 ? "inline-flex" : "none";
  }
}

