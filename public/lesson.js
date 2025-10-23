// Get the selected lesson index from sessionStorage (set in learn.js)
const lessonIndex = sessionStorage.getItem("selectedLesson");
let currentLesson = lessonIndex !== null ? parseInt(lessonIndex) : 0;

// Track time spent (small bonus)
let lessonStartTime = Date.now();

// Lemonade 10-day game state
let lemonadeGame = {
  active: false,
  day: 1,
  daysTotal: 10,
  cash: 20,
  totalProfit: 0,
  satisfaction: 50, // 0–100
  upgrades: { marketing: 0, quality: 0 },
  history: []
};

function loadLesson(index) {
  const lesson = lessonsData[index];
  if (!lesson) {
    document.getElementById("lessonTitle").textContent = "Lesson Not Found";
    document.getElementById("lessonContent").innerHTML = "<p>Sorry, this lesson doesn't exist.</p>";
    return;
  }

  // Core info
  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonDifficulty").textContent = lesson.difficulty;
  document.getElementById("lessonContent").innerHTML = lesson.content;

  // Gamified info
  document.getElementById("lessonQuest").textContent = lesson.quest ? `🎯 Quest: ${lesson.quest}` : "";
  document.getElementById("lessonBadge").textContent = lesson.badge ? `🏅 Badge: ${lesson.badge}` : "";
  document.getElementById("lessonRewards").innerHTML = lesson.rewards
    ? `<p>💰 Coins: ${lesson.rewards.coins}</p><p>🎁 Items: ${lesson.rewards.items.join(", ")}</p>`
    : "";

  // Render appropriate mini-game
  renderChallenge(lesson);

  // Award base XP first time lesson is visited
  const user = localStorage.getItem("loggedInUser") || "guest";
  const completedKey = `${user}_lesson_${index}_completed`;

  if (!localStorage.getItem(completedKey)) {
    addXP(lesson.xp);
    showXpPopup(lesson.xp);
    localStorage.setItem(completedKey, "true");
  }


  // Reset timer for this lesson view
  lessonStartTime = Date.now();

  // Save current lesson index so navigation buttons work
  sessionStorage.setItem("selectedLesson", index);
}


function renderChallenge(lesson) {
  const area = document.getElementById("challengeArea");
  area.innerHTML = "";

  const title = lesson.title;
  const type = lesson.challengeType;

  // Multi-day Lemonade simulation
  if (type === "multi-sim" && title.includes("Lemonade")) {
    lemonadeGame.active = true;
    area.innerHTML = `
      <h4>🍋 Lemonade Stand: Day <span id="dayNum">${lemonadeGame.day}</span>/${lemonadeGame.daysTotal}</h4>
      <p>Cash: $<span id="cash">${lemonadeGame.cash.toFixed(2)}</span> • Satisfaction: <span id="sat">${lemonadeGame.satisfaction}</span>/100</p>

      <div class="small-note">Negotiate costs, set price, choose how many cups to make.</div>
      <label>Price per cup: $<input type="number" id="priceInput" value="1" min="0.1" step="0.1"></label><br>
      <label>Cups to make: <input type="number" id="cupsInput" value="12" min="1"></label><br>

      <label>Negotiate cost per cup (0.20–0.35): $<input type="number" id="costInput" value="0.25" min="0.20" max="0.35" step="0.01"></label><br>

      <div style="margin-top:8px;">
        <button id="buyMarketing">Buy Marketing (+demand) $3</button>
        <button id="buyQuality">Buy Quality (+satisfaction) $3</button>
      </div>

      <button id="runDayBtn" style="margin-top:10px;">Run Day</button>
      <div id="eventLog" class="challenge-result"></div>
      <div id="dayResult" class="challenge-result"></div>
    `;

    document.getElementById("buyMarketing").addEventListener("click", () => buyUpgrade("marketing", 3));
    document.getElementById("buyQuality").addEventListener("click", () => buyUpgrade("quality", 3));
    document.getElementById("runDayBtn").addEventListener("click", runLemonadeDay);
    return;
  }

  // Budget Simulator
  if (type === "simulation" && title.includes("Budgeting")) {
    area.innerHTML = `
      <h4>💵 Budget Simulator</h4>
      <p>Distribute $100 between Needs, Wants, Savings.</p>
      <input id="needs" type="number" value="50" min="0" max="100"> Needs<br>
      <input id="wants" type="number" value="30" min="0" max="100"> Wants<br>
      <input id="savings" type="number" value="20" min="0" max="100"> Savings<br>
      <button id="budgetBtn">Submit Budget</button>
      <div id="budgetResult" class="challenge-result"></div>
    `;
    document.getElementById("budgetBtn").addEventListener("click", submitBudget);
    return;
  }

  // Drag & Drop (select-based)
  if (type === "dragdrop") {
    if (title.includes("Money 101")) {
      area.innerHTML = `
        <h4>🧺 Earn/Save/Spend Sort</h4>
        <p>Sort each item:</p>
        <div><span>Mow lawn</span>
          <select id="item1"><option>Earn</option><option>Save</option><option>Spend</option></select>
        </div>
        <div><span>Buy snacks</span>
          <select id="item2"><option>Spend</option><option>Earn</option><option>Save</option></select>
        </div>
        <div><span>Put $5 aside</span>
          <select id="item3"><option>Save</option><option>Earn</option><option>Spend</option></select>
        </div>
        <button id="sortBtn">Check Answers</button>
        <div id="sortResult" class="challenge-result"></div>
      `;
      document.getElementById("sortBtn").addEventListener("click", checkMoneySort);
      return;
    }
    if (title.includes("Prototype")) {
      area.innerHTML = `
        <h4>🧩 Prototype Builder</h4>
        <p>Select parts to assemble your product:</p>
        <label>Body:
          <select id="protoBody">
            <option value="">--</option><option>Cardboard</option><option>Plastic</option><option>Wood</option>
          </select>
        </label><br>
        <label>Feature:
          <select id="protoFeature">
            <option value="">--</option><option>Handle</option><option>Wheels</option><option>LED</option>
          </select>
        </label><br>
        <label>Finish:
          <select id="protoFinish">
            <option value="">--</option><option>Paint</option><option>Stickers</option><option>Polish</option>
          </select>
        </label><br>
        <button id="protoBtn">Assemble</button>
        <div id="protoResult" class="challenge-result"></div>
      `;
      document.getElementById("protoBtn").addEventListener("click", assemblePrototype);
      return;
    }
  }

  // Creative Inputs
  if (type === "creative") {
    if (title.includes("Marketing Magic")) {
      area.innerHTML = `
        <h4>🎨 Slogan Builder</h4>
        <input id="sloganInput" type="text" placeholder="Type your slogan..." />
        <button id="sloganBtn">Test Slogan</button>
        <div id="sloganResult" class="challenge-result"></div>
      `;
      document.getElementById("sloganBtn").addEventListener("click", testSlogan);
      return;
    }
    if (title.includes("Build Your Brand")) {
      area.innerHTML = `
        <h4>🎯 Brand Maker</h4>
        <input id="brandName" type="text" placeholder="Business name" />
        <select id="brandColor">
          <option value="">Pick color</option><option>Green</option><option>Blue</option><option>Yellow</option><option>Purple</option>
        </select>
        <button id="brandBtn">Create Brand</button>
        <div id="brandResult" class="challenge-result"></div>
      `;
      document.getElementById("brandBtn").addEventListener("click", createBrand);
      return;
    }
    if (title.includes("Pitch Your Idea")) {
      area.innerHTML = `
        <h4>🎤 Pitch Writer</h4>
        <textarea id="pitchText" rows="4" placeholder="Write a 30-second pitch..."></textarea>
        <button id="pitchBtn">Submit Pitch</button>
        <div id="pitchResult" class="challenge-result"></div>
      `;
      document.getElementById("pitchBtn").addEventListener("click", submitPitch);
      return;
    }
    if (title.includes("Creativity Challenge")) {
      const prompts = [
        "Customers say your stand is too far. What’s your solution?",
        "It might rain today. How do you still sell?",
        "You ran out of cups. What could you do?"
      ];
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      area.innerHTML = `
        <h4>💡 Creativity Prompt</h4>
        <p><em>${prompt}</em></p>
        <textarea id="creativeText" rows="3" placeholder="Type your solution..."></textarea>
        <button id="creativeBtn">Submit Idea</button>
        <div id="creativeResult" class="challenge-result"></div>
      `;
      document.getElementById("creativeBtn").addEventListener("click", submitCreative);
      return;
    }
    if (title.includes("Social Media Starter")) {
      area.innerHTML = `
        <h4>📱 Post Creator</h4>
        <input id="postCaption" type="text" placeholder="Write a fun caption...">
        <select id="postStyle">
          <option value="">Choose style</option><option>Funny</option><option>Informative</option><option>Emotional</option>
        </select>
        <button id="postBtn">Publish</button>
        <div id="postResult" class="challenge-result"></div>
      `;
      document.getElementById("postBtn").addEventListener("click", publishPost);
      return;
    }
  }

  // Quizzes
  if (type === "quiz") {
    if (title.includes("Customer Service")) {
      area.innerHTML = `
        <h4>🧪 Service Scenario</h4>
        <p>Customer says: "This lemonade is too sour!"</p>
        <button class="opt" data-correct="true">Apologize, offer a refund or sweeter batch</button>
        <button class="opt" data-correct="false">Ignore them</button>
        <button class="opt" data-correct="false">Tell them it's fine as is</button>
        <div id="serviceResult" class="challenge-result"></div>
      `;
      area.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", answerService));
      return;
    }
    if (title.includes("Profit vs. Costs")) {
      area.innerHTML = `
        <h4>🧮 Profit Quiz</h4>
        <p>You sold 15 cups at $2 each and spent $10. What's profit?</p>
        <input id="profitAnswer" type="number" placeholder="Enter amount">
        <button id="profitBtn">Check</button>
        <div id="profitResult" class="challenge-result"></div>
      `;
      document.getElementById("profitBtn").addEventListener("click", checkProfit);
      return;
    }
  }

  // Scenario (Leadership)
  if (type === "scenario" && title.includes("Leadership")) {
    area.innerHTML = `
      <h4>🧭 Leadership Choices</h4>
      <p>Your team is arguing about tasks. What do you do?</p>
      <button class="leadOpt" data-score="2">Hold a quick meeting, assign roles together</button>
      <button class="leadOpt" data-score="0">Let them figure it out alone</button>
      <button class="leadOpt" data-score="1">Pick the fastest worker for all tasks</button>
      <div id="leadResult" class="challenge-result"></div>
    `;
    area.querySelectorAll(".leadOpt").forEach(btn => btn.addEventListener("click", chooseLeadership));
    return;
  }
}

/* ----- Lemonade 10-day simulation ----- */

function buyUpgrade(type, cost) {
  if (lemonadeGame.cash < cost) return;
  lemonadeGame.cash -= cost;
  lemonadeGame.upgrades[type]++;
  if (type === "quality") lemonadeGame.satisfaction = Math.min(100, lemonadeGame.satisfaction + 5);
  document.getElementById("cash").textContent = lemonadeGame.cash.toFixed(2);
  document.getElementById("sat").textContent = lemonadeGame.satisfaction;
}

function runLemonadeDay() {
  const price = parseFloat(document.getElementById("priceInput").value);
  const cups = parseInt(document.getElementById("cupsInput").value);
  let costPerCup = parseFloat(document.getElementById("costInput").value);

  // Negotiation luck ± 0.03
  costPerCup = Math.max(0.20, Math.min(0.35, costPerCup + (Math.random() * 0.06 - 0.03)));

  const totalCost = cups * costPerCup;
  const eventLog = document.getElementById("eventLog");
  const dayResult = document.getElementById("dayResult");

  if (totalCost > lemonadeGame.cash) {
    dayResult.textContent = "Not enough cash for supplies!";
    return;
  }

  // Day event: weather/competition/supply
  const events = ["Sunny", "Cloudy", "Rainy", "Competition nearby", "Sugar price spike", "Happy festival crowd"];
  const event = events[Math.floor(Math.random() * events.length)];
  let demandFactor = 1;
  let satisfactionShift = 0;

  if (event === "Sunny") demandFactor += 0.3;
  if (event === "Cloudy") demandFactor -= 0.1;
  if (event === "Rainy") demandFactor -= 0.35;
  if (event === "Competition nearby") demandFactor -= 0.2;
  if (event === "Sugar price spike") costPerCup += 0.03;
  if (event === "Happy festival crowd") demandFactor += 0.4;

  // Price impact
  if (price < 0.5) demandFactor += 0.4;
  if (price > 2) demandFactor -= 0.4;

  // Upgrades impact
  demandFactor += lemonadeGame.upgrades.marketing * 0.1;
  satisfactionShift += lemonadeGame.upgrades.quality * 1;

  // Satisfaction influences repeat customers
  demandFactor += (lemonadeGame.satisfaction - 50) / 200; // ±0.25

  const customers = Math.max(0, Math.floor(cups * demandFactor));
  const cupsSold = Math.min(customers, cups);
  const revenue = cupsSold * price;
  const profit = revenue - totalCost;

  // Satisfaction change based on price and event
  satisfactionShift += price <= 1 ? 2 : price >= 2 ? -3 : 0;
  if (event === "Rainy") satisfactionShift -= 1;
  if (event === "Sunny" || event === "Happy festival crowd") satisfactionShift += 2;

  lemonadeGame.satisfaction = Math.max(0, Math.min(100, lemonadeGame.satisfaction + satisfactionShift));

  lemonadeGame.cash += profit;
  lemonadeGame.totalProfit += profit;
  lemonadeGame.history.push({ day: lemonadeGame.day, event, price, cups, revenue, profit, costPerCup });

  eventLog.textContent = `Event: ${event} • Negotiated cost/cup: $${costPerCup.toFixed(2)} • Satisfaction change: ${satisfactionShift >= 0 ? "+" : ""}${satisfactionShift}`;
  dayResult.innerHTML = `
    <p>👥 Customers: ${customers}</p>
    <p>🥤 Cups Sold: ${cupsSold}/${cups}</p>
    <p>💵 Revenue: $${revenue.toFixed(2)}</p>
    <p>💸 Supplies Cost: $${totalCost.toFixed(2)}</p>
    <p><strong>📈 Profit: $${profit.toFixed(2)}</strong></p>
  `;

  lemonadeGame.day++;
  document.getElementById("dayNum").textContent = lemonadeGame.day;
  document.getElementById("cash").textContent = lemonadeGame.cash.toFixed(2);
  document.getElementById("sat").textContent = lemonadeGame.satisfaction;

  // Award small XP per good day
  if (profit > 0) { addXP(5); showXpPopup(5); }

  if (lemonadeGame.day > lemonadeGame.daysTotal) {
    endLemonadeGame();
  }
}

function endLemonadeGame() {
  const area = document.getElementById("challengeArea");
  const avgProfit = lemonadeGame.totalProfit / lemonadeGame.daysTotal;
  const score = Math.max(0, Math.round(lemonadeGame.totalProfit + lemonadeGame.satisfaction));

  area.innerHTML = `
    <h3>🏆 Game Over!</h3>
    <p>Total Profit: $${lemonadeGame.totalProfit.toFixed(2)}</p>
    <p>Final Cash: $${lemonadeGame.cash.toFixed(2)}</p>
    <p>Satisfaction: ${lemonadeGame.satisfaction}/100</p>
    <p><strong>Final Score:</strong> ${score}</p>
    <p>You earned ${Math.min(50, Math.max(10, Math.round(avgProfit)))} XP bonus!</p>
    <button id="restartLemon">Play Again</button>
  `;
  const bonusXP = Math.min(50, Math.max(10, Math.round(avgProfit)));
  addXP(bonusXP); showXpPopup(bonusXP);
  lemonadeGame.active = false;

  document.getElementById("restartLemon").addEventListener("click", () => {
    lemonadeGame = { active: true, day: 1, daysTotal: 10, cash: 20, totalProfit: 0, satisfaction: 50, upgrades: { marketing: 0, quality: 0 }, history: [] };
    loadLesson(currentLesson);
  });
}

/* ----- Other challenge handlers ----- */

// Budget simulator
function submitBudget() {
  const needs = parseInt(document.getElementById("needs").value || 0);
  const wants = parseInt(document.getElementById("wants").value || 0);
  const savings = parseInt(document.getElementById("savings").value || 0);
  const total = needs + wants + savings;
  const res = document.getElementById("budgetResult");

  if (total !== 100) {
    res.textContent = `Total must be $100. You're at $${total}.`;
    return;
  }
  let bonus = 0;
  if (savings >= 20 && needs >= 50) bonus = 5;
  res.textContent = `Nice plan! Needs: $${needs}, Wants: $${wants}, Savings: $${savings}. +${15 + bonus} XP`;
  addXP(15 + bonus); showXpPopup(15 + bonus);
}

// Money 101 sort
function checkMoneySort() {
  const i1 = document.getElementById("item1").value; // Mow lawn => Earn
  const i2 = document.getElementById("item2").value; // Buy snacks => Spend
  const i3 = document.getElementById("item3").value; // Put $5 aside => Save
  const res = document.getElementById("sortResult");
  const correct = (i1 === "Earn") && (i2 === "Spend") && (i3 === "Save");
  if (correct) { res.textContent = "✅ Perfect sorting! +15 XP"; addXP(15); showXpPopup(15); }
  else res.textContent = "❌ Try again! Think about the action.";
}

// Prototype builder
function assemblePrototype() {
  const b = document.getElementById("protoBody").value;
  const f = document.getElementById("protoFeature").value;
  const fin = document.getElementById("protoFinish").value;
  const res = document.getElementById("protoResult");
  if (!b || !f || !fin) { res.textContent = "Pick all three parts!"; return; }
  res.textContent = `🛠️ Built: ${b} + ${f} with ${fin}. +25 XP`;
  addXP(25); showXpPopup(25);
}

// Marketing slogan
function testSlogan() {
  const s = (document.getElementById("sloganInput").value || "").trim();
  const res = document.getElementById("sloganResult");
  if (s.length < 6) { res.textContent = "Make it longer or more catchy!"; return; }
  const hasRhyme = /lemon|fresh|zest|best|cool|sweet|tasty|ice/i.test(s);
  const score = Math.min(100, s.length * 4 + (hasRhyme ? 20 : 0));
  res.textContent = `Score: ${score}/100 — ${score > 60 ? "Nice!" : "Keep tweaking."}`;
  if (score > 60) { addXP(20); showXpPopup(20); }
}

// Brand maker
function createBrand() {
  const name = (document.getElementById("brandName").value || "").trim();
  const color = document.getElementById("brandColor").value;
  const res = document.getElementById("brandResult");
  if (!name || !color) { res.textContent = "Pick a name and color!"; return; }
  res.textContent = `Brand: ${name} with ${color}. +15 XP`;
  addXP(15); showXpPopup(15);
}

// Pitch writer
function submitPitch() {
  const txt = (document.getElementById("pitchText").value || "").trim();
  const res = document.getElementById("pitchResult");
  if (txt.length < 80) { res.textContent = "Add more detail (aim 80+ chars)."; return; }
  res.textContent = "🎤 Strong pitch! +20 XP";
  addXP(20); showXpPopup(20);
}

// Creativity prompt
function submitCreative() {
  const txt = (document.getElementById("creativeText").value || "").trim();
  const res = document.getElementById("creativeResult");
  if (txt.length < 40) { res.textContent = "Explain a bit more (40+ chars)."; return; }
  res.textContent = "💡 Great idea! +15 XP";
  addXP(15); showXpPopup(15);
}

// Social post
function publishPost() {
  const cap = (document.getElementById("postCaption").value || "").trim();
  const style = document.getElementById("postStyle").value;
  const res = document.getElementById("postResult");
  if (!cap || !style) { res.textContent = "Write a caption and choose a style!"; return; }
  const score = Math.min(100, cap.length * 2 + (style === "Funny" ? 20 : style === "Emotional" ? 15 : 10));
  res.textContent = `Engagement Score: ${score}/100. ${score > 50 ? "+20 XP" : "Keep iterating!"}`;
  if (score > 50) { addXP(20); showXpPopup(20); }
}

// Customer service quiz
function answerService(e) {
  const correct = e.target.dataset.correct === "true";
  const res = document.getElementById("serviceResult");
  if (correct) { res.textContent = "✅ Empathy wins! +15 XP"; addXP(15); showXpPopup(15); }
  else res.textContent = "❌ Try an empathetic approach.";
}

// Profit quiz
function checkProfit() {
  const ans = parseFloat(document.getElementById("profitAnswer").value);
  const res = document.getElementById("profitResult");
  const correct = 15 * 2 - 10; // 30 - 10 = 20
  if (isNaN(ans)) { res.textContent = "Enter a number."; return; }
  if (Math.abs(ans - correct) < 0.001) { res.textContent = "✅ Correct! +10 XP"; addXP(10); showXpPopup(10); }
  else res.textContent = "❌ Not quite. Revenue minus costs!";
}

// Leadership scenario
function chooseLeadership(e) {
  const score = parseInt(e.target.dataset.score, 10);
  const res = document.getElementById("leadResult");
  if (score === 2) { res.textContent = "✅ Great team decision-making! +20 XP"; addXP(20); showXpPopup(20); }
  else res.textContent = "ℹ️ Consider meeting together and assigning roles.";
}

/* ----- Navigation ----- */
document.getElementById("prevLesson").addEventListener("click", () => {
  if (currentLesson > 0) {
    currentLesson--;
    localStorage.setItem("currentLesson", currentLesson);
    loadLesson(currentLesson);
  }
});

document.getElementById("nextLesson").addEventListener("click", () => {
  if (currentLesson < lessonsData.length - 1) {
    currentLesson++;
    localStorage.setItem("currentLesson", currentLesson);
    loadLesson(currentLesson);
  }
});

/* ----- Time-spent bonus (2+ minutes) ----- */
window.addEventListener("beforeunload", () => {
  const timeSpentSec = (Date.now() - lessonStartTime) / 1000;
  if (timeSpentSec > 120) { addXP(5); showXpPopup(5); }
});

/* ----- Init ----- */
window.addEventListener("DOMContentLoaded", () => {
  loadLesson(currentLesson);
});