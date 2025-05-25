import './style.css';
import AOS from 'aos';
import { gsap } from 'gsap';

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');
const modal = document.getElementById('video-modal');
const closeModal = document.querySelector('.close-modal');
const videoContainer = document.querySelector('.video-container');
const playButtons = document.querySelectorAll('.play-btn');
const preloader = document.getElementById('preloader');
const form = document.querySelector('.contact-form');

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.style.display = 'none';
    // Animate hero section elements
    gsap.from('.hero-text h1', { 
      duration: 1,
      y: 100,
      opacity: 0,
      ease: 'power4.out'
    });
    gsap.from('.hero-text .subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.3,
      ease: 'power4.out'
    });
    gsap.from('.hero-text .description', {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.5,
      ease: 'power4.out'
    });
    gsap.from('.cta-button', {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.7,
      ease: 'power4.out'
    });
    gsap.from('.hero-image', {
      duration: 1,
      x: 100,
      opacity: 0,
      delay: 0.5,
      ease: 'power4.out'
    });
  }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
[...navLinks, ...mobileLinks].forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Video modal
playButtons.forEach(button => {
  button.addEventListener('click', () => {
    const videoId = button.dataset.video;
    videoContainer.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
    modal.classList.add('open');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
  setTimeout(() => {
    videoContainer.innerHTML = '';
  }, 300);
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal.click();
  }
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Add your form submission logic here
  alert('Message sent successfully!');
  form.reset();
});