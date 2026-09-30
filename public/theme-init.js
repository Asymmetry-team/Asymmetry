// Apply the saved theme BEFORE first paint so a dark-mode reload doesn't
// flash light. Mirrors the localStorage key used by ThemeToggle.jsx.
// Kept as an external file (not inline) so the site CSP (script-src 'self')
// allows it.
(function () {
  try {
    var t = localStorage.getItem("theme");
    document.documentElement.setAttribute(
      "data-theme",
      t === "dark" ? "dark" : "light"
    );
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
