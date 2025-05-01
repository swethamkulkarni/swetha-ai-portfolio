document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");
  
    links.forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault(); // stop default nav for now
          const destination = this.href;
    
          // Add fade-out class to trigger CSS transition
          document.body.classList.add("fade-out");
    
          // After animation ends, go to the new page
          setTimeout(() => {
            window.location.href = destination;
          }, 500); // match this to the transition duration in CSS
        });
      });
  });
  