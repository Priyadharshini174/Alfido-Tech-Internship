const colorBtn = document.getElementById("colorBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const colorCode = document.getElementById("colorCode");
const timestamp = document.getElementById("timestamp");
const quoteBox = document.getElementById("quoteBox");
const contrastLabel = document.getElementById("contrastLabel");
const historyList = document.getElementById("colorHistory");
const gradientToggle = document.getElementById("gradientToggle");

let colorHistory = [];

const quotes = [
  "Colors speak louder than words.",
  "A touch of color can change everything.",
  "Elegance is the balance between simplicity and beauty.",
  "Design is a silent ambassador of your brand.",
  "Minimal is memorable."
];

function getRandomColor() {
  const r1 = Math.floor(Math.random() * 256);
  const g1 = Math.floor(Math.random() * 256);
  const b1 = Math.floor(Math.random() * 256);
  const r2 = Math.floor(Math.random() * 256);
  const g2 = Math.floor(Math.random() * 256);
  const b2 = Math.floor(Math.random() * 256);

  return {
    rgb: `rgb(${r1}, ${g1}, ${b1})`,
    hex: `#${[r1, g1, b1].map(x => x.toString(16).padStart(2, '0')).join('')}`,
    gradient: `linear-gradient(to right, rgb(${r1}, ${g1}, ${b1}), rgb(${r2}, ${g2}, ${b2}))`,
    textColor: getContrastYIQ(r1, g1, b1)
  };
}

function getContrastYIQ(r, g, b) {
  const yiq = (r*299 + g*587 + b*114) / 1000;
  return yiq >= 128 ? "Dark text recommended" : "Light text recommended";
}

function updateTimestamp() {
  const now = new Date();
  timestamp.textContent = `Changed at: ${now.toLocaleTimeString()}`;
}

function updateHistory(color) {
  colorHistory.unshift(color);
  if (colorHistory.length > 5) colorHistory.pop();

  historyList.innerHTML = "";
  colorHistory.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.rgb} (${c.hex})`;
    li.style.background = c.rgb;
    li.style.color = c.textColor === "Dark text recommended" ? "#000" : "#fff";
    historyList.appendChild(li);
  });
}

function updateQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = quote;
}

colorBtn.addEventListener("click", () => {
  const color = getRandomColor();

  document.body.style.background = gradientToggle.checked ? color.gradient : color.rgb;
  colorCode.textContent = `Current Color: ${color.rgb} (${color.hex})`;
  contrastLabel.textContent = color.textColor;
  updateTimestamp();
  updateHistory(color);
  updateQuote();
});

copyBtn.addEventListener("click", () => {
  const text = colorCode.textContent.replace("Current Color: ", "");
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => copyBtn.textContent = "📋 Copy Color", 1200);
  });
});

resetBtn.addEventListener("click", () => {
  document.body.style.background = "#f4f4f4";
  colorCode.textContent = "Background reset to default.";
  timestamp.textContent = "";
  contrastLabel.textContent = "";
  quoteBox.textContent = "";
  copyBtn.textContent = "📋 Copy Color";
});
