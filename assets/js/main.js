// ========================================
// Footer Update
// ========================================
document.getElementById("currentYear").textContent = new Date().getFullYear();

// ========================================
// Navbar Active Link & Mobile Offcanvas
// ========================================

const navLinks = document.querySelectorAll(
  ".navbar-menu .nav-link, nav[aria-label='Mobile Navigation'] .nav-link",
);

const sections = document.querySelectorAll(
  "#about, #services, #portfolio, #contact",
);

// Update active navbar link
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (
      currentSection &&
      link.getAttribute("href") === `#${currentSection.id}`
    ) {
      link.classList.add("active");
    }
  });
}

// Handle navbar links
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Set active link immediately
    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    link.classList.add("active");

    // Close mobile offcanvas
    const mobileOffcanvas = document.getElementById("navbarList");

    if (mobileOffcanvas) {
      const offcanvasInstance =
        bootstrap.Offcanvas.getInstance(mobileOffcanvas) ||
        new bootstrap.Offcanvas(mobileOffcanvas);

      offcanvasInstance.hide();
    }
  });
});

// Update active link while scrolling
window.addEventListener("scroll", updateActiveNavLink);

// Initial state
updateActiveNavLink();

// ========================================
// Scroll To Top Button
// ========================================

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 1000) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
