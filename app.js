//Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Set this to the EXACT duration of your GIF animation in milliseconds
    // For example, if your curtain opens in 3 seconds, use 3000.
    const gifDuration = 3000; 

    // Create a timer for the GIF
    const animationTimer = new Promise(resolve => setTimeout(resolve, gifDuration));

    // Wait for BOTH the page to load and the GIF timer to finish
    animationTimer.then(() => {
        // Start the fade out effect
        preloader.classList.add('fade-out');
        
        // Reveal the main content
        mainContent.style.display = 'block';

        // Completely remove preloader from DOM after fade animation is done
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800); 
    });
});
//End of Preloader

//NavBar
var navbar = document.getElementById("navbar");
var menu = document.getElementById("menu");

window.onscroll = function(){
  if(window.pageYOffset >= menu.offsetTop){
      navbar.classList.add("sticky");
       }
  else{
      navbar.classList.remove("sticky");
    }
  }

//For the scrolling animation from section to section
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden, .hidden2");
hiddenElements.forEach((el) => observer.observe(el));