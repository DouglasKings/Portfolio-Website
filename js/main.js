// Selecting the hamburger menu button using its class name
let burgerBtn = document.querySelector(".burger-menu-btn");

// Selecting the actual menu that will be toggled on and off
let burgerMenu = document.querySelector(".burger-menu");

// Variable to track whether the menu is currently open or not
let isBurgerOpen = false;

// Event listener for the click action on the hamburger menu button
burgerBtn.onclick = function() {
    // Toggle the menu visibility
    if (!isBurgerOpen) {
        burgerMenu.style.display = "block";
        burgerBtn.style.backgroundPosition = "center left 50px, center";
        isBurgerOpen = true;
    } else {
        burgerMenu.style.display = "none";
        burgerBtn.style.backgroundPosition = "center, center left 50px";
        isBurgerOpen = false;
    }
};

// Select all anchor tags with href attributes starting with "#"
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Collapse the burger menu after selecting a page
        if (isBurgerOpen) {
            burgerMenu.style.display = "none"; // Hide the menu
            burgerBtn.style.backgroundPosition = "center, center left 50px"; // Reset button position
            isBurgerOpen = false; // Update state
        }
    });
});

// Function to set active state for navigation items
function setActiveNav() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navigation ul li');
    let scrollPos = window.scrollY;

    sections.forEach((section, index) => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop - 60 && scrollPos < sectionTop + sectionHeight - 60) {
            navItems[index].classList.add('active');
        } else {
            navItems[index].classList.remove('active');
        }
    });
}

// Throttle function to limit calls to setActiveNav on scroll
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

// Throttle the scroll event listener for performance
window.addEventListener('scroll', throttle(setActiveNav, 100));

// Call setActiveNav initially to set correct active state when the page loads
setActiveNav();

// Contact form confirmation message
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById('confirmation').style.display = 'block'; // Show confirmation message
    form.reset(); // Reset the form fields
});

/*Order of Scripts: The contact form script is added at the end of the JavaScript code for clarity and organization.
Event Listener: The form submission listener is set up to prevent the default behavior, show the confirmation message, and reset the form.
Seamless Functionality: Both functionalities (hamburger menu and form submission) now coexist without interfering with each other. */