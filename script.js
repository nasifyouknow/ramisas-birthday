/*
  RAMISA'S BIRTHDAY SURPRISE 💗

  CUSTOMIZATION:
  1. Change the four place names in PLACES.
  2. Edit the birthday message in index.html.
  3. Afternoon: 2 PM, 3 PM, 4 PM, 5 PM.
  4. Night: 6 PM, 7 PM, 8 PM, 9 PM.
*/

const PLACES = [
  "Chef's Table Courtside",
  "BOHO",
  "C'Paris",
  "WAZA"
];

const TIMES = {
  Afternoon: [
    { label: "2:00 PM", icon: "☀️" },
    { label: "3:00 PM", icon: "🌷" },
    { label: "4:00 PM", icon: "🍰" },
    { label: "5:00 PM", icon: "🌅" }
  ],
  Night: [
    { label: "6:00 PM", icon: "🌆" },
    { label: "7:00 PM", icon: "🕯️" },
    { label: "8:00 PM", icon: "🌙" },
    { label: "9:00 PM", icon: "✨" }
  ]
};

/* Pink confetti colours (RGB) */
const CONFETTI_COLORS = [
  "rgb(236, 72, 153)",
  "rgb(249, 168, 212)",
  "rgb(219, 39, 119)",
  "rgb(252, 231, 243)",
  "rgb(226, 190, 126)"
];

const screen = document.getElementById("screen");
const eyebrow = document.getElementById("eyebrow");

document.getElementById("startBtn").addEventListener("click", showPlanQuestion);

/* ---------- helpers ---------- */

function setScreen(label, html) {
  eyebrow.textContent = label;
  screen.innerHTML = html;
  document.querySelector(".card").scrollIntoView({ behavior: "smooth", block: "center" });
}

function on(id, handler) {
  document.getElementById(id).addEventListener("click", handler);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

/* Single-select list: highlights the clicked option and reports its value */
function bindSelect(optionSelector, checkSelector, getValue, onSelect) {
  document.querySelectorAll(optionSelector).forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(optionSelector).forEach(item => {
        const active = item === button;
        item.classList.toggle("selected", active);
        item.querySelector(checkSelector).textContent = active ? "♥" : "♡";
      });
      onSelect(getValue(button));
    });
  });
}

function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  for (let i = 0; i < 44; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.animationDuration = 2.6 + Math.random() * 2.4 + "s";
    piece.style.animationDelay = Math.random() * 0.8 + "s";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}

/* ---------- screens ---------- */

function showPlanQuestion() {
  setScreen("Today is all about you 💗", `
    <div class="step-label"><span>1</span> Your birthday plan</div>

    <h2 class="subheading">So, birthday girl…</h2>

    <p class="body-copy">How would you love to celebrate your special day with me?</p>

    <div class="choices">
      <button class="choice-btn" id="homeBtn">
        <span class="choice-icon">🏡</span>
        <span class="choice-title">At home</span>
        <span class="choice-detail">Cozy, sweet & just us</span>
      </button>

      <button class="choice-btn" id="outsideBtn">
        <span class="choice-icon">✨</span>
        <span class="choice-title">Go outside</span>
        <span class="choice-detail">A little date adventure</span>
      </button>
    </div>
  `);

  on("homeBtn", showHomeEnding);
  on("outsideBtn", showPlacePicker);
}

function showHomeEnding() {
  setScreen("My favorite place is with you", `
    <div class="big-emoji">🏡</div>

    <h2 class="subheading">Home date it is, my love.</h2>

    <p class="body-copy">
      We’ll make our own little world, enjoy something delicious,
      and collect another beautiful memory together.
      Honestly, anywhere feels like home when I’m with you.
    </p>

    <div class="quote-line"><span>♡</span></div>

    <p class="message">
      Happy birthday again, Bou. You deserve all the love,
      comfort, and happiness in the world.
      I love you endlessly. 💗
    </p>

    <button class="secondary-btn" id="backBtn">← Change my mind</button>
  `);

  on("backBtn", showPlanQuestion);
  celebrate();
}

function showPlacePicker() {
  const options = PLACES.map((place, i) => `
    <button class="place-option ${i === 0 ? "selected" : ""}" data-place="${i}" type="button">
      <span class="place-number">${i + 1}</span>
      <span class="place-name">${escapeHTML(place)}</span>
      <span class="place-check">${i === 0 ? "♥" : "♡"}</span>
    </button>
  `).join("");

  setScreen("Let's make a little memory", `
    <div class="step-label"><span>2</span> Pick our place</div>

    <h2 class="subheading">Where should we go? 🌹</h2>

    <p class="body-copy">Choose the place that sounds perfect for your birthday date.</p>

    <div class="place-list">${options}</div>

    <div class="actions">
      <button class="primary-btn" id="placeNext">This one sounds lovely <span>♡</span></button>
      <button class="secondary-btn" id="backBtn">← Go back</button>
    </div>
  `);

  let selectedIndex = 0;

  bindSelect(".place-option", ".place-check",
    b => Number(b.dataset.place),
    value => { selectedIndex = value; });

  on("placeNext", () => showTimePeriod(PLACES[selectedIndex]));
  on("backBtn", showPlanQuestion);
}

function showTimePeriod(place) {
  setScreen("One lovely date, just us", `
    <div class="step-label"><span>3</span> Choose the vibe</div>

    <h2 class="subheading">Afternoon or night? ✨</h2>

    <p class="body-copy">
      You picked <span class="result-pill">📍 ${escapeHTML(place)}</span>
      <br />
      Now choose when you’d like our date to begin.
    </p>

    <div class="choices">
      <button class="choice-btn" id="afternoonBtn">
        <span class="choice-icon">☀️</span>
        <span class="choice-title">Afternoon</span>
        <span class="choice-detail">Sunshine & sweet treats</span>
      </button>

      <button class="choice-btn" id="nightBtn">
        <span class="choice-icon">🌙</span>
        <span class="choice-title">Night</span>
        <span class="choice-detail">Lights, dinner & romance</span>
      </button>
    </div>

    <div class="actions">
      <button class="secondary-btn" id="backBtn">← Change place</button>
    </div>
  `);

  on("afternoonBtn", () => showTimePicker(place, "Afternoon"));
  on("nightBtn", () => showTimePicker(place, "Night"));
  on("backBtn", showPlacePicker);
}

function showTimePicker(place, period) {
  let selectedTime = TIMES[period][1].label;

  const options = TIMES[period].map((time, index) => `
    <button class="time-option ${index === 1 ? "selected" : ""}" data-time="${time.label}" type="button">
      <span class="time-icon">${time.icon}</span>
      <span class="time-label">${time.label}</span>
      <span class="time-check">${index === 1 ? "♥" : "♡"}</span>
    </button>
  `).join("");

  setScreen(
    period === "Night" ? "A little night-time magic 🌙" : "A little afternoon magic 🌷",
    `
      <div class="step-label"><span>4</span> Pick our time</div>

      <h2 class="subheading">What time feels perfect?</h2>

      <p class="body-copy">
        Four lovely options for our ${period.toLowerCase()}
        date at <strong>${escapeHTML(place)}</strong>.
      </p>

      <div class="time-grid">${options}</div>

      <p class="small-note">Tap a time to choose it 💗</p>

      <div class="actions">
        <button class="primary-btn" id="confirmTime">That’s our plan <span>♡</span></button>
        <button class="secondary-btn" id="backBtn">← Go back</button>
      </div>
    `
  );

  bindSelect(".time-option", ".time-check",
    b => b.dataset.time,
    value => { selectedTime = value; });

  on("confirmTime", () => showFinal(place, period, selectedTime));
  on("backBtn", () => showTimePeriod(place));
}

function showFinal(place, period, time) {
  const isNight = period === "Night";

  setScreen("I’m already excited 💗", `
    <div class="big-emoji">${isNight ? "🌙" : "🌷"}</div>

    <h2 class="subheading">I can’t wait, my Bou!</h2>

    <p class="body-copy">
      Our birthday date plan is set.
      Just thinking about it makes me smile.
    </p>

    <div class="plan-summary">
      <div class="summary-row">
        <span class="summary-icon">♡</span>
        <div><small>Our place</small><strong>${escapeHTML(place)}</strong></div>
      </div>

      <div class="summary-row">
        <span class="summary-icon">${isNight ? "☾" : "☀"}</span>
        <div><small>The vibe</small><strong>${period}</strong></div>
      </div>

      <div class="summary-row">
        <span class="summary-icon">◷</span>
        <div><small>Our time</small><strong>${escapeHTML(time)}</strong></div>
      </div>
    </div>

    <div class="quote-line"><span>✦</span></div>

    <p class="message">
      I can’t wait to see your smile, hold your hand,
      and make another beautiful memory with you.
      More than the place or the time, I’m excited because
      I get to spend it with you.
      Happy Birthday, my love. 💗
    </p>

    <button class="secondary-btn" id="restartBtn">Plan it again ↺</button>
  `);

  on("restartBtn", showPlanQuestion);
  celebrate();
}
