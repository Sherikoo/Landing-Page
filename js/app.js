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
const sections = document.querySelectorAll("section");
let navbar = document.querySelector("#navbar__list");
const divs = document.querySelectorAll(".landing__container");
const header = document.querySelector(".page__header");
const backToTopButton = document.querySelector("#top");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function deactivateAllNavbarItems() {
	const navbarItems = document.querySelectorAll(".navbar_item");
	for(let navbarItem of navbarItems) {
		navbarItem.classList.remove("activeNavbarItem");
	}
}

function deactivateAllSections() {
	for(let section of sections) {
		section.classList.remove("your-active-class");
	}
}

function isInViewport(section) {
    const rect = section.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

function getSectionOfNavbarItem(navbarItem) {
	return document.querySelector(navbarItem.getAttribute("href"));
}

function getNavbarItemOfSection(section) {
	const href = "#" + section.getAttribute("id");
	const navbarItems = document.querySelectorAll(".navbar_item");
    for(let n of navbarItems) {
        if(n.getAttribute("href") === href) {
            return n;
        }
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

//build the nav
function buildNavbar() {
	for(const section of sections) {
	let listItem = document.createElement("li");
	listItem.innerHTML = `<a href="#${section.getAttribute("id")}" class="navbar_item">${section.getAttribute("data-nav")}</a>`;
	navbar.appendChild(listItem);
    }
}

// Add class 'your-active-class' to section when near top of viewport
function activateSection(section) {
	section.classList.add("your-active-class");
}

// Add class 'activeNavbarItem' to clicked or corresponding navbar link of section in viewport
function activateNavbarItem(navbarItem) {
	navbarItem.classList.add("activeNavbarItem");
}

// Funtion to hide navbar on scroll
function hideNavbarOnScrolling() {
	window.clearTimeout();
	setTimeout(function() {
		header.className = "page__header show";
	}, 750);
	header.className = "page__header hide";
}

// Function to scroll to top
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hide and show back-to-top button
function hideAndShowBackToTopButton() {
	if (window.scrollY > 0) {
      	backToTopButton.className = "show";
    } 
    else {
      	backToTopButton.className = "hide";
    }
}

// Paragraphs collapse on click
function paragraphCollapse(e, div) {
	if (e.target.nodeName.toLowerCase() === 'h2') {
	    let divChildren = div.children;
	    for(let child of divChildren) {
			if(child.nodeName.toLowerCase() === "p") {
				child.classList.toggle("collapse");
			}
	    }
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavbar();

// Scroll to section on link click
const navbarItems = document.querySelectorAll(".navbar_item");
for(let navbarItem of navbarItems) {
	navbarItem.addEventListener("click", function(e) {
		e.preventDefault();
		deactivateAllNavbarItems();
		deactivateAllSections();
		activateNavbarItem(navbarItem);
		const sectionToView = getSectionOfNavbarItem(navbarItem);
		activateSection(sectionToView);
		sectionToView.scrollIntoView({behavior: "smooth"});
	});
}

// Set sections as active
window.addEventListener("scroll", function() {
	for(let section of sections) {
		if(isInViewport(section)){
			deactivateAllNavbarItems();
			deactivateAllSections();
			activateSection(section);
			activateNavbarItem(getNavbarItemOfSection(section));
		}
	}
});


// Paragraphs collapse on click
for(let div of divs) {
	div.addEventListener("click", function(e) {
		paragraphCollapse(e, div);
	});
}

// Back To Top Button
window.addEventListener('scroll', hideAndShowBackToTopButton);

backToTopButton.addEventListener("click", scrollToTop);

// Hide Navbar while when user stops scrolling
window.addEventListener("scroll", hideNavbarOnScrolling);
