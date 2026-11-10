/* ## Theme Switcher ## */

(() => {
  "use strict";

  /* ## Elements ## */
  const html = document.documentElement;
  const themeButtons = document.querySelectorAll("[data-theme-value]");
  const lightIcons = document.querySelectorAll(".theme-icon-light");
  const darkIcons = document.querySelectorAll(".theme-icon-dark");

  /* ## Local Storage ## */
  const STORAGE_KEY = "theme";
  const getStoredTheme = () => localStorage.getItem(STORAGE_KEY);
  const setStoredTheme = (theme) => localStorage.setItem(STORAGE_KEY, theme);

  /* ## System Theme ## */
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const getSystemTheme = () => (systemTheme.matches ? "dark" : "light");

  /* ## Apply Theme ## */
  function applyTheme(theme) {
    const currentTheme = theme === "auto" ? getSystemTheme() : theme;
    html.setAttribute("data-bs-theme", currentTheme);
  }

  /* ## Theme Icon ## */
  function updateThemeIcon(theme) {
    const currentTheme = theme === "auto" ? getSystemTheme() : theme;
    lightIcons.forEach((icon) => {
      icon.classList.toggle("d-none", currentTheme === "dark");
    });
    darkIcons.forEach((icon) => {
      icon.classList.toggle("d-none", currentTheme !== "dark");
    });
  }

  /* ## Active Button ## */
  function setActiveButton(theme) {
    themeButtons.forEach((button) => {
      const active = button.dataset.themeValue === theme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active);
    });
  }

  /* ## Theme Buttons ## */
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.themeValue;
      setStoredTheme(theme);
      applyTheme(theme);
      updateThemeIcon(theme);
      setActiveButton(theme);
    });
  });

  /* ## System Theme Change (Auto) ## */
  systemTheme.addEventListener("change", () => {
    const savedTheme = getStoredTheme();
    if (savedTheme === "auto") {
      applyTheme("auto");
      updateThemeIcon("auto");
    }
  });

  /* ## Init  ## */
  const savedTheme = getStoredTheme() || "auto";
  applyTheme(savedTheme);
  updateThemeIcon(savedTheme);
  setActiveButton(savedTheme);
})();
