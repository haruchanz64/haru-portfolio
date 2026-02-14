// Lazy-load YouTube videos on click
document.addEventListener('DOMContentLoaded', () => {
  const videoPreviews = document.querySelectorAll('.video-preview');

  videoPreviews.forEach(preview => {
    const playButton = preview.querySelector('.play-button');
    const videoId = preview.dataset.videoId;

    playButton.addEventListener('click', () => {
      const loadingSpinner = document.createElement('div');
      loadingSpinner.className = 'video-loading';
      loadingSpinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      preview.style.opacity = '0.5';
      playButton.style.display = 'none';
      preview.appendChild(loadingSpinner);
      
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`;
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('loading', 'eager');
      
      iframe.onload = () => {
        preview.parentElement.innerHTML = '';
        preview.parentElement.appendChild(iframe);
      };
      
      setTimeout(() => {
        if (preview.parentElement.contains(preview)) {
          preview.parentElement.innerHTML = '';
          preview.parentElement.appendChild(iframe);
        }
      }, 2000);
      
      preview.parentElement.appendChild(iframe);
      iframe.style.opacity = '0';
    });
  });
});