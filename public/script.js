/* ===============================
   Main Interactivity Script
   =============================== */

/* ---------- Basic selectors ---------- */
const drawer = document.querySelector(".drawer");
const drawerToggle = document.querySelector(".drawer-toggle");
const closeDrawerBtn = document.querySelector(".drawer .close-btn");
const mobileSearchToggle = document.querySelector(".mobile-search-toggle");
const searchBar = document.querySelector(".search-bar");
const searchInput = document.querySelector(".search-bar input");
const clearBtn = document.querySelector(".clear-btn");
const header = document.querySelector(".header");

const accountModal = document.querySelector(".account-modal");
const openAccountBtns = document.querySelectorAll(".open-account"); // extra buttons (if any)
const startBtn = document.querySelector(".start-btn");
const closeAccountBtn = document.querySelector(".close-account");

const accountForm = document.getElementById("accountForm");
const accountMessage = document.getElementById("accountMessage");
const xpLevelBox = document.querySelector(".xp-level");
const userMenu = document.querySelector(".user-menu");
const logoutBtn = document.getElementById("logoutBtn");

/* ---------- Drawer (Sidebar Menu) ---------- */
drawerToggle?.addEventListener("click", () => drawer.classList.add("open"));
closeDrawerBtn?.addEventListener("click", () => drawer.classList.remove("open"));
window.addEventListener("click", (e) => { if (e.target === drawer) drawer.classList.remove("open"); });
drawer?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => drawer.classList.remove("open")));

/* ---------- Mobile Search Toggle ---------- */
mobileSearchToggle?.addEventListener("click", () => searchBar.classList.toggle("open"));

/* ---------- Clear Search Input ---------- */
clearBtn?.addEventListener("click", () => {
  if (searchInput) { searchInput.value = ""; clearBtn.style.display = "none"; searchInput.focus(); }
});
searchInput?.addEventListener("input", () => {
  if (searchInput.value.trim() !== "") clearBtn.style.display = "block";
  else clearBtn.style.display = "none";
});

/* ---------- Shrinking Header on Scroll ---------- */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) header.classList.add("shrink");
  else header.classList.remove("shrink");
});

/* ---------- Open-account buttons (other places) ---------- */
openAccountBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    accountModal.classList.add("show");
  });
});

/* ---------- Start button behavior (single vs double click) ---------- */
/* We use a small timer to detect double-click so single-click doesn't run twice. */
let clickTimeout = null;

startBtn?.addEventListener("click", (e) => {
  const loggedUser = localStorage.getItem("loggedInUser");

  // If not logged in -> open modal immediately
  if (!loggedUser) {
    accountModal.classList.add("show");
    return;
  }

  // If logged in -> detect single vs double click
  if (clickTimeout === null) {
    clickTimeout = setTimeout(() => {
      // single click action: toggle user menu
      userMenu.classList.toggle("hidden");
      clickTimeout = null;
    }, 250); // 250ms window for double click
  } else {
    // double click detected: give XP and show popup
    clearTimeout(clickTimeout);
    clickTimeout = null;
    addXP(0);
  }
});

/* Ensure close-account closes modal */
closeAccountBtn?.addEventListener("click", () => accountModal.classList.remove("show"));
window.addEventListener("click", (e) => { if (e.target === accountModal) accountModal.classList.remove("show"); });

/* ---------- Account Form Handling ---------- */
accountForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const type = document.getElementById("type").value;

  if (username && type) {
    accountMessage.textContent = `Welcome, ${username}! (${type})`;
    accountMessage.style.color = "green";

    // Save login and initialize XP
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userType", type);
    localStorage.setItem("xp", 0);
    localStorage.setItem("level", 1);

    renderUserUI(username);

    setTimeout(() => accountModal.classList.remove("show"), 800);
  } else {
    accountMessage.textContent = "Please fill all fields.";
    accountMessage.style.color = "red";
  }
});

/* ---------- Render UI after login ---------- */
function renderUserUI(username) {
  if (startBtn) startBtn.textContent = `Hi, ${username}`;
  if (xpLevelBox) xpLevelBox.classList.remove("hidden");
  updateUserStats();
}

/* ---------- XP + Level system ---------- */
function updateUserStats() {
  const xpBox = document.querySelector(".xp-box");
  const levelBox = document.querySelector(".level-box");
  const xpFill = document.querySelector(".xp-fill");

  let xp = parseInt(localStorage.getItem("xp")) || 0;
  if (xp > 600) xp = 600; // cap
  let level = Math.min(Math.floor(xp / 100) + 1, 5);

  if (xpBox) xpBox.textContent = `XP: ${xp}`;
  if (levelBox) levelBox.textContent = `Lvl ${level}`;

  const progress = xp % 100;
  const percent = (progress / 100) * 100;
  if (xpFill) xpFill.style.width = `${percent}%`;

  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
}

function addXP(amount) {
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  xp += amount;
  if (xp > 600) xp = 600;
  localStorage.setItem("xp", xp);
  updateUserStats();
}

/* ---------- XP popup ---------- */
function showXpPopup(amount) {
  let container = document.getElementById("xp-popup-container");
  if (!container) return;
  const popup = document.createElement("div");
  popup.className = "xp-popup";
  popup.textContent = `+${amount} XP`;
  container.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

/* ---------- Logout ---------- */
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userType");
  localStorage.removeItem("xp");
  localStorage.removeItem("level");

  if (startBtn) startBtn.textContent = "Start Learning";
  if (xpLevelBox) xpLevelBox.classList.add("hidden");
  userMenu.classList.add("hidden");
});

/* ---------- Restore session ---------- */
const savedUser = localStorage.getItem("loggedInUser");
if (savedUser) {
  renderUserUI(savedUser);
}
document.addEventListener("DOMContentLoaded", () => {
  // Auto-open signup modal if coming from learn.html
  if (sessionStorage.getItem("openSignup") === "1") {
    sessionStorage.removeItem("openSignup"); // clear flag
    const signupBtn = document.getElementById("openSignup");
    if (signupBtn) signupBtn.click(); // simulate click to open modal
  }
});
function renderBadges() {
  const container = document.getElementById("badgeContainer");
  if (!container || typeof lessonsData === "undefined") return;

  const user = localStorage.getItem("loggedInUser") || "guest";
  container.innerHTML = "";

  lessonsData.forEach((lesson, i) => {
    const slot = document.createElement("div");
    slot.className = "badge-slot";

    const badge = document.createElement("div");
    badge.className = "badge";

    const completedKey = `${user}_lesson_${i}_completed`;
    const isEarned = !!localStorage.getItem(completedKey);

    // Emoji map for visuals
    const emojiMap = {
      "Lemonade": "🍋","Money": "💰","Marketing": "🎨","Brand": "🏷️",
      "Customer": "😊","Profit": "🧮","Pitch": "🎤","Leadership": "🧭",
      "Creativity": "💡","Budget": "💵","Social": "📱","Prototype": "🧩"
    };
    const key = Object.keys(emojiMap).find(k => lesson.title.includes(k)) || "Lemonade";
    badge.textContent = emojiMap[key];

    if (isEarned) {
      badge.classList.add("earned");
      badge.title = lesson.badge || "Badge earned!";
    } else {
      badge.title = "Locked";
    }

    const label = document.createElement("div");
    label.className = "badge-label";
    label.textContent = lesson.badge || lesson.title;

    slot.appendChild(badge);
    slot.appendChild(label);
    container.appendChild(slot);
  });
}


document.addEventListener("DOMContentLoaded", renderBadges);
