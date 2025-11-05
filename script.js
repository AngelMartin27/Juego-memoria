const colors = ["red", "blue", "green", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 0;

function startGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  document.getElementById("status").textContent = "¡Vamos!";
  nextRound();
}

function nextRound() {
  level++;
  playerSequence = [];
  const nextColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(nextColor);
  showSequence();
}

function showSequence() {
  let i = 0;
  const interval = setInterval(() => {
    const color = sequence[i];
    flashColor(color);
    i++;
    if (i >= sequence.length) clearInterval(interval);
  }, 800);
}

function flashColor(color) {
  const el = document.getElementById(color);
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 400);
}

colors.forEach(color => {
  document.getElementById(color).addEventListener("click", () => {
    playerSequence.push(color);
    flashColor(color);
    checkSequence();
  });
});

function checkSequence() {
  const index = playerSequence.length - 1;
  if (playerSequence[index] !== sequence[index]) {
    document.getElementById("status").textContent = "❌ Fallaste. Nivel alcanzado: " + level;
    return;
  }

  if (playerSequence.length === sequence.length) {
    document.getElementById("status").textContent = "✅ Correcto. Nivel " + level;
    setTimeout(nextRound, 1000);
  }
}

