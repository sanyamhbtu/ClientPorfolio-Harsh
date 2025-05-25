/**
 * Sets up the video gallery with lightbox functionality
 */
export function setupVideos() {
  // Sample video data - in a real project, this might come from an API or CMS
  const videos = [
    {
      id: 1,
      title: 'Aerial Mountain View',
      thumbnail: 'https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual video URL
    },
    {
      id: 2,
      title: 'Urban Time-lapse',
      thumbnail: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual video URL
    },
    {
      id: 3,
      title: 'Wedding Highlights',
      thumbnail: 'https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual video URL
    },
    {
      id: 4,
      title: 'Nature Documentary',
      thumbnail: 'https://images.pexels.com/photos/2739548/pexels-photo-2739548.jpeg',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with your actual video URL
    }
  ];

  const videoGrid = document.getElementById('video-gallery');
  
  // Generate video items
  function renderVideos() {
    videos.forEach(video => {
      const videoItem = document.createElement('div');
      videoItem.className = 'video-item';
      
      const img = document.createElement('img');
      img.src = video.thumbnail;
      img.alt = video.title;
      img.loading = 'lazy';
      
      const overlay = document.createElement('div');
      overlay.className = 'video-overlay';
      
      const playButton = document.createElement('div');
      playButton.className = 'play-button';
      
      const title = document.createElement('div');
      title.className = 'video-title';
      title.textContent = video.title;
      
      overlay.appendChild(playButton);
      overlay.appendChild(title);
      
      videoItem.appendChild(img);
      videoItem.appendChild(overlay);
      
      videoGrid.appendChild(videoItem);
      
      // Add click event to open video in lightbox
      videoItem.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxContainer = document.querySelector('.lightbox-container');
        
        // Create iframe for video
        lightboxContainer.innerHTML = '';
        
        const videoContainer = document.createElement('div');
        videoContainer.style.position = 'relative';
        videoContainer.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
        videoContainer.style.height = '0';
        videoContainer.style.overflow = 'hidden';
        
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.src = `${video.embedUrl}?autoplay=1`;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '1');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        
        videoContainer.appendChild(iframe);
        lightboxContainer.appendChild(videoContainer);
        lightbox.classList.add('open');
      });

      // Observe for scroll animations
      observeElement(videoItem);
    });
  }
  
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
  
  // Initialize videos
  renderVideos();
}