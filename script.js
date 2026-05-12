//Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Set this to the EXACT duration of your GIF animation in milliseconds
    // For example, if your curtain opens in 3 seconds, use 3000.
    const gifDuration = 4000; 

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

//Clover Donation
const btns = document.querySelectorAll('.amt-btn');
        const customInput = document.getElementById('custom-amt');
        const totalText = document.getElementById('total-text');
        let selectedAmount = 2500;

        btns.forEach(b => b.addEventListener('click', () => {
            btns.forEach(btn => btn.classList.remove('active'));
            b.classList.add('active');
            customInput.value = '';
            selectedAmount = b.dataset.value;
            totalText.textContent = `$${(selectedAmount/100).toFixed(2)}`;
        }));

        customInput.addEventListener('input', (e) => {
            btns.forEach(btn => btn.classList.remove('active'));
            selectedAmount = e.target.value * 100;
            totalText.textContent = `$${(e.target.value || 0)}`;
        });

        document.getElementById('donate-submit').addEventListener('click', async () => {
            const response = await fetch('/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: selectedAmount })
            });
            const data = await response.json();
            if (data.url) window.location.href = data.url;
        });