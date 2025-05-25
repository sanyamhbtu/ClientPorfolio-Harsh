/**
 * Sets up the lightbox functionality for photos and videos
 */
export function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeLightbox = document.querySelector('.close-lightbox');
  
  // Close lightbox when the close button is clicked
  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    
    // If there's a video playing, stop it by clearing the lightbox container
    const lightboxContainer = document.querySelector('.lightbox-container');
    if (lightboxContainer.querySelector('iframe')) {
      setTimeout(() => {
        lightboxContainer.innerHTML = '';
      }, 300); // Wait for the fade out animation
    }
  });
  
  // Close lightbox when clicking outside the content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox.click();
    }
  });
  
  // Close lightbox with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox.click();
    }
  });
}