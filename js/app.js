/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navList = document.querySelector('#navbar__list');
const scrollToTopButton = document.querySelector('#scroll-to-top');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let navElementList = [];

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function fillNav(){
    let navElements = document.createDocumentFragment();
    for (let section of sections){
        const navElement = document.createElement('li');
        const anchorElement = document.createElement('a');
        anchorElement.classList.add('menu__link');
        //anchorElement.href = "#" + section.id;
        anchorElement.innerHTML = section.querySelector('h2').textContent;
        navElement.appendChild(anchorElement);
        navElements.appendChild(navElement);
    }
    navList.appendChild(navElements);
}

// Add class 'active' to section when near top of viewport
function handleScroll(){
    let oneIsActive = false;
    let count = 0;
    for(let section of sections){
        if((window.scrollY + navList.offsetHeight) < (section.offsetTop + section.offsetHeight) && !oneIsActive) {
            oneIsActive = true;
            section.classList.add('active');
            navElementList[count].classList.add('active');
        }
        else {
            section.classList.remove('active');
            navElementList[count].classList.remove('active');
        }
        count++;
    }
    console.log(document.body.scrollTop);
    console.log(document.documentElement.scrollTop);
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
        scrollToTopButton.classList.add('active');
    }
    else{
        scrollToTopButton.classList.remove('active');
    }

}

// Scroll to anchor ID using scrollTO event
function scrollToSection(navItem){
    const sectionId = navItem.textContent.replace(/\s/g, '').toLowerCase();
    const section = document.getElementById(sectionId);
    window.scrollTo({top: section.offsetTop, left: 0, behavior: 'smooth'});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', function () {
    fillNav();
    initNavClicks();
    initScrollToTop();
});

// Scroll to section on link click
function initNavClicks(){
    for (let navItem of navList.querySelectorAll('.menu__link')){
        // add each menu item to a list
        navElementList.push(navItem);
        // add to each menu item an event listener which handles the scrolling
        navItem.addEventListener("click", function(){
            scrollToSection(navItem);
        });
    }
}

// Set sections as active
window.addEventListener("scroll", handleScroll);

// Scroll to Top function
function initScrollToTop(){
    scrollToTopButton.addEventListener("click", function(){
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        //document.body.scrollTop = 0; // For Safari
        //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
}