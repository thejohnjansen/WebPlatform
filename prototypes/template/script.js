const actionButton = document.getElementById("actionButton");
const status = document.getElementById("status");

actionButton?.addEventListener("click", () => {
  const now = new Date().toLocaleTimeString();
  status.textContent = `Button clicked at ${now}`;
});
