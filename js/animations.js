/**
 * Sets up animations for page elements using Intersection Observer
 */
export function setupAnimations() {
  // Animate section titles when they come into view
  const sectionTitles = document.querySelectorAll('.section-title');
  
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  sectionTitles.forEach(title => {
    titleObserver.observe(title);
  });
  
  // Animate other elements with data-animate attribute if needed
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        
        elementObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  animatedElements.forEach(element => {
    elementObserver.observe(element);
  });
}