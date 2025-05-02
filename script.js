window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');
  });
  
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (link.hostname === window.location.hostname && href && !href.startsWith('#')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.remove('fade-in');
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = href;
        }, 500); // match the CSS transition duration
      });
    }
  });
  