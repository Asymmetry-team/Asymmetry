// Apply the saved theme BEFORE first paint so a dark-mode reload doesn't
// flash light. Mirrors the localStorage key used by ThemeToggle.jsx.
// Kept as an external file (not inline) so the site CSP (script-src 'self')
// allows it.
// JS is running → lets CSS hide not-yet-started count-ups (see hero.css)
// (not during the build-time pre-render, or the static HTML would ship
// with the counters hidden for crawlers)
if (navigator.userAgent !== "ReactSnap") {
  document.documentElement.classList.add("js");
}
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
