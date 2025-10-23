document.addEventListener("DOMContentLoaded", () => {
  console.log("learn.js loaded");

  const loggedUser = localStorage.getItem("loggedInUser");
  const signupModal = document.getElementById("signupModal");
  const lessonsGrid = document.querySelector(".lessons-grid");
  const goToSignup = document.getElementById("goToSignup");
  const searchInput = document.querySelector(".learn-search");

  if (!loggedUser) {
    signupModal.classList.remove("hidden");   // show modal
    lessonsGrid.classList.add("hidden");      // hide lessons
  } else {
    signupModal.classList.add("hidden");      // hide modal
    lessonsGrid.classList.remove("hidden");   // show lessons
  }

  goToSignup?.addEventListener("click", () => {
    sessionStorage.setItem("openSignup", "1");
    window.location.href = "index.html"; // redirect to signup modal
  });

  // 🔎 Live search filter
  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".lesson-card");

    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(query) ? "block" : "none";
    });
  });
});

// Handle clicking on a lesson card
document.querySelectorAll(".lesson-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const index = card.getAttribute("data-index");
    localStorage.setItem("currentLesson", index);
    window.location.href = "lesson.html";
  });
});
// Lock/unlock nodes based on current level
function initWorldMapLocks() {
  const level = parseInt(localStorage.getItem("level")) || 1;
  document.querySelectorAll(".map-node").forEach(node => {
    const req = parseInt(node.getAttribute("data-req")) || 1;
    if (level >= req) {
      node.classList.remove("locked");
      node.classList.add("unlocked");
    } else {
      node.classList.add("locked");
      node.classList.remove("unlocked");
    }
  });
}

// Navigation for map nodes
function initWorldMapNavigation() {
  document.querySelectorAll(".lesson-card, .map-node").forEach(card => {
    card.addEventListener("click", () => {
      const index = card.getAttribute("data-index");
      sessionStorage.setItem("selectedLesson", index);
      window.location.href = "lesson.html";
    });
  });

}

document.addEventListener("DOMContentLoaded", () => {
  initWorldMapLocks();
  initWorldMapNavigation();

  // Keep your existing lesson-card grid logic if desired:
  document.querySelectorAll(".lesson-card").forEach(card => {
    card.addEventListener("click", () => {
      const index = card.getAttribute("data-index");
      sessionStorage.setItem("selectedLesson", index);
      window.location.href = "lesson.html";
    });
  });
});
