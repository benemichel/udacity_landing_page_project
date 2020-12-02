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
const navbar = document.getElementsByClassName('navbar__menu').item(0);
const nav = document.getElementById('navbar__list');
const scrollToTopButton = document.getElementsByClassName('scroll-to-top-button').item(0);
let navbarTimer;
const main = document.getElementsByTagName('main').item(0);
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= -10 && rect.bottom <= window.innerHeight
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
    const nav = document.getElementById('navbar__list');
    const sections = document.getElementsByTagName('section');

    for (const section of sections) {
        const newLink = document.createElement('a');
        const newListItem = document.createElement('li');
        const header = section.dataset.nav;

        const anchorTarget = '#' + section.id;
        newLink.setAttribute('href', anchorTarget)
        newLink.textContent = header;
        newLink.className = 'menu__link'

        newListItem.appendChild(newLink);
        nav.appendChild(newListItem);
    }
}


// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
    const sections = document.getElementsByTagName('section');
    const navLinks = document.getElementsByClassName('menu__link');
    let activeSectionString;

    //Change section class
    for (const section of sections) {
        if (isInViewport(section)) {
            if (section.classList.contains('section_active')) {

            } else {
                section.classList.add('section_active')
                activeSectionString = section.dataset.nav;
            }
        } else {
            if (section.classList.contains('section_active')) {
                section.classList.remove('section_active')

            }
        }
    }

    //change navbar link class
    if (activeSectionString) {
        for (const navLink of navLinks) {
            if (navLink.textContent === activeSectionString) {
                if (!navLink.classList.contains('menu__link_active')) {
                    navLink.classList.add('menu__link_active');
                }
            } else {
                if (navLink.classList.contains('menu__link_active')) {
                    navLink.classList.remove('menu__link_active');
                }
            }
        }
    }
}

// Scroll to anchor ID using scrollTO event, remove default event callback
const scrollToID = (event) => {
    const dataAttributeValue = event.target.textContent
    const target = document.querySelector("[data-nav='" + dataAttributeValue + "']");

    event.preventDefault();

    const rect = target.getBoundingClientRect();
    window.scrollTo({
            top: rect.top + window.pageYOffset,
            left: 0,
            behavior: 'smooth'
        }
    );
}

// Toggle scroll to top button
const toggleScrollToTopButton = () => {
    const sttButton = document.getElementsByClassName('scroll-to-top-button').item(0);
    if (window.pageYOffset > window.innerHeight) {
        if (sttButton.classList.contains('scroll-to-top-button_hidden')) {
            sttButton.classList.remove('scroll-to-top-button_hidden');
        }
    } else {
        if (!sttButton.classList.contains('scroll-to-top-button_hidden')) {
            sttButton.classList.add('scroll-to-top-button_hidden');
        }
    }
}

// Scroll to top functionality for button
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

//hide navbar menu if there is no scrolling for certain amount of time
const toggleNavbar = () => {
    if (navbar.classList.contains('navbar__menu_hidden')) {
        navbar.classList.remove('navbar__menu_hidden');
    }

    clearTimeout(navbarTimer);
    navbarTimer = window.setTimeout(() => {
        navbar.classList.add('navbar__menu_hidden');
    }, 1500);
}

//collapse section
const collapseSections = (event) => {
    if (event.target.tagName === 'H2') {
        event.target.parentElement.classList.toggle('section_collapsed');
    }
}


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click
nav.addEventListener('click', scrollToID)

// Set sections as active
window.addEventListener('scroll', setActiveSection);

//Toggle scroll to top button visibility
window.addEventListener('scroll', toggleScrollToTopButton);

//Add scroll to top button functionality
scrollToTopButton.addEventListener('click', scrollToTop);

//Toggle navbar
window.addEventListener('scroll', toggleNavbar);

//make sections collapsible
main.addEventListener('click', collapseSections);