// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

const applyTheme = (dark) => {
  document.documentElement.classList.toggle('dark', dark);
  iconSun.classList.toggle('hidden', !dark);
  iconMoon.classList.toggle('hidden', dark);
};

applyTheme(localStorage.getItem('theme') === 'dark');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  iconSun.classList.toggle('hidden', !isDark);
  iconMoon.classList.toggle('hidden', isDark);
});

// Intersection Observer for reveal animations
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// Skill bar animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.transform = `scaleX(${fill.dataset.width})`;
        fill.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
const skillSection = document.getElementById('skillBars');
if (skillSection) skillObserver.observe(skillSection);

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeHref = '#' + entry.target.id;
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === activeHref ? '#2563EB' : '';
      });
      mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === activeHref);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadow-md', window.scrollY > 20);
});

// Hamburger menu toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const iconHamburger = document.getElementById('iconHamburger');
const iconClose = document.getElementById('iconClose');

const closeMenu = () => {
  mobileMenu.classList.add('hidden');
  iconHamburger.classList.remove('hidden');
  iconClose.classList.add('hidden');
};

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    closeMenu();
  } else {
    mobileMenu.classList.remove('hidden');
    iconHamburger.classList.add('hidden');
    iconClose.classList.remove('hidden');
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMenu();
  }
});
