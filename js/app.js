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

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

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
function handleActive(){
    let oneIsActive = false;
    for(let section of sections){
        if((window.scrollY + navList.offsetHeight)< (section.offsetTop + section.offsetHeight) && !oneIsActive) {
            oneIsActive = true;
            section.classList.add('active');
        }
        else {
            section.classList.remove('active');
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(navItem){
    console.log(navItem.offsetHeight);
    const sectionId = navItem.textContent.replace(/\s/g, '').toLowerCase();
    console.log(sectionId);
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
});

// Scroll to section on link click
function initNavClicks(){
    for (let navItem of navList.querySelectorAll('.menu__link')){
        navItem.addEventListener("click", function(){
            scrollToSection(navItem);
        });
    }
}

// Set sections as active
window.addEventListener("scroll", handleActive);