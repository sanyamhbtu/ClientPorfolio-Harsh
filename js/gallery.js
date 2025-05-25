/**
 * Sets up the photo gallery with filtering and masonry layout
 */
export function setupGallery() {
  // Sample photo data - in a real project, this might come from an API or CMS
  const photos = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg',
      title: 'Mountain Lake Reflection',
      category: 'nature',
      size: 'wide' // wide, tall, or normal
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg',
      title: 'Nighttime City Streets',
      category: 'event',
      size: 'normal'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg',
      title: 'Golden Hour Portrait',
      category: 'portrait',
      size: 'tall'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg',
      title: 'Forest Waterfall',
      category: 'nature',
      size: 'normal'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg',
      title: 'Concert Lights',
      category: 'event',
      size: 'wide'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg',
      title: 'Studio Portrait',
      category: 'portrait',
      size: 'normal'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
      title: 'Mountain Summit',
      category: 'nature',
      size: 'tall'
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/2897883/pexels-photo-2897883.jpeg',
      title: 'Wedding Moment',
      category: 'event',
      size: 'normal'
    }
  ];

  const gallery = document.getElementById('photo-gallery');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Generate gallery items
  function renderGallery(filter = 'all') {
    // Clear gallery
    gallery.innerHTML = '';
    
    // Filter photos if needed
    const filteredPhotos = filter === 'all' 
      ? photos 
      : photos.filter(photo => photo.category === filter);
    
    // Add photos to gallery
    filteredPhotos.forEach(photo => {
      const item = document.createElement('div');
      item.className = `gallery-item ${photo.size}`;
      item.dataset.category = photo.category;
      
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = photo.title;
      img.loading = 'lazy';
      
      const caption = document.createElement('div');
      caption.className = 'gallery-caption';
      caption.textContent = photo.title;
      
      item.appendChild(img);
      item.appendChild(caption);
      gallery.appendChild(item);
      
      // Add click event to open lightbox
      item.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxContainer = document.querySelector('.lightbox-container');
        
        // Create image for lightbox
        lightboxContainer.innerHTML = '';
        const lightboxImg = document.createElement('img');
        lightboxImg.src = photo.url;
        lightboxImg.alt = photo.title;
        
        lightboxContainer.appendChild(lightboxImg);
        lightbox.classList.add('open');
      });

      // Observe for scroll animations
      observeElement(item);
    });
  }
  
  // Handle filter clicks
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Render filtered gallery
      renderGallery(filter);
    });
  });
  
  // Intersection Observer for scroll animations
  function observeElement(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 100 * Math.random() * 5); // Stagger effect
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(element);
  }
  
  // Initialize gallery with all photos
  renderGallery();
}