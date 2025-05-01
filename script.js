// Fade in effect when the page loads
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
  });
  
  // Fade out effect before navigating away
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && link.getAttribute('href')) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#') || href === '') return; // Skip anchor links
  
        e.preventDefault();
        document.body.classList.remove('fade-in');
        setTimeout(() => {
          window.location.href = href;
        }, 500); // Match transition duration
      });
    }
  });
  