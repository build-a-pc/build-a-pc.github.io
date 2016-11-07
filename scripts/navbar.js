/*
FILE NAME: navbar.js
WRITTEN BY: Håvard
WHEN: 2016 autumn
PURPOSE: Makes the navbar active and responsive.
*/

const MOBILE_MENU_MAX_WIDTH = 899;

// Adds all the required event listeners for the navbar.
window.addEventListener("resize", function() { onResize(); });
document.addEventListener("click", function(ev) { onDocumentClick(ev); });
document.querySelector("#navbar > ul").addEventListener("click", function(ev) { onNavbarClick(ev); });
document.querySelector("#navbar-show").addEventListener("click", function(ev) { onMobileMenuClick(ev); });
document.querySelector("#navbar-hide").addEventListener("click", function(ev) { onMobileMenuClick(ev); });

let shownList = null;
let isMobileMenuShown = false;

// Called then the window is resized.
function onResize() {
  updateMobileMenu();
}

// Called when something the document is clicked.
function onDocumentClick(ev) {
  showList(null);
  showMobileMenu(false);
}

// Called when something in the navbar is clicked. Stops propagation so that onDocumentCLick isn't called.
function onNavbarClick(ev) {
  let target = ev.target;
  if (!ev.defaultPrevented && target.nodeName === "A") {
    let childLists = target.parentNode.getElementsByTagName("ul");
    if (childLists.length > 0) {
      ev.preventDefault();
      ev.stopPropagation();
      showList(childLists[0]);
    }
  }
}

// Called when mobile menu is clicked.
function onMobileMenuClick(ev) {
  let target = ev.target;
  if (!ev.defaultPrevented && target.nodeName === "A") {
    showMobileMenu(!isMobileMenuShown);
    updateMobileMenu();
    ev.preventDefault();
    ev.stopPropagation();
  }
}

// Hides previous list and shows new list if list is not null.
function showList(list) {
  let oldShownList = shownList;
  if (shownList) {
    shownList.style.display = null;
    shownList = null;
  }
  if (list && list !== oldShownList) {
    list.style.display = "block";
    shownList = list;
  }
}

// Shows or hides mobile menu if appropriate to show.
function showMobileMenu(show) {
  isMobileMenuShown = show;
  updateMobileMenu();
}

// Updates mobile menu; meaning open, close or close because navbar is too big.
function updateMobileMenu() {
  let navbarTopList = document.querySelector("#navbar > ul");
  let navbarShow = document.getElementById("navbar-show");
  let navbarHide = document.getElementById("navbar-hide");
  let width = document.documentElement.clientWidth;
  if (!isMobileMenuShown || (isMobileMenuShown && width > MOBILE_MENU_MAX_WIDTH)) {
    showList(null);
    navbarShow.style.display = null;
    navbarHide.style.display = null;
    navbarTopList.style.display = null;
    isMobileMenuShown = false;
  } else {
    navbarShow.style.display = "none";
    navbarHide.style.display = "block";
    navbarTopList.style.display = "block";
  }
}
