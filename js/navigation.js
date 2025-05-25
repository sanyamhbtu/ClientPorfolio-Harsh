/**
 * Sets up navigation functionality including:
 * - Smooth scrolling to sections
 * - Sticky navbar on scroll
 * - Mobile menu toggle
 * - Active link highlighting
 */
export function setupNavigation() {
  const mainNav = document.getElementById('main-nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const sections = document.querySelectorAll('section');
  
  // Handle scroll events for sticky nav
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
    
    // Update active link based on scroll position
    updateActiveLink();
  });
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  
  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
  
  // Smooth scrolling for nav links
  const allLinks = [...navLinks, ...mobileLinks];
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop;
        
        window.scrollTo({
          top: offsetTop - 60, // Account for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active link based on scroll position
  function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = `#${section.id}`;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Initialize active link on page load
  updateActiveLink();
}