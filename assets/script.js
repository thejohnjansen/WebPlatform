const storageKey = "wp26-theme";
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem(storageKey, theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "paper" ? "Switch to Night Theme" : "Switch to Paper Theme";
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "night" || savedTheme === "paper") {
    setTheme(savedTheme);
    return;
  }
  setTheme("paper");
}

initTheme();

themeToggle?.addEventListener("click", () => {
  const nextTheme = html.getAttribute("data-theme") === "paper" ? "night" : "paper";
  setTheme(nextTheme);
});
