// Navigation bar with dropdown menus and stuff //

const MOBILE_MENU_MAX_WIDTH = 899;

window.addEventListener("resize", function() { onResize(); });
document.addEventListener("click", function(ev) { onDocumentClick(ev); });
document.querySelector("#navbar > ul").addEventListener("click", function(ev) { onNavbarClick(ev); });
document.querySelector("#navbar-show").addEventListener("click", function(ev) { onMobileMenuClick(ev); });
document.querySelector("#navbar-hide").addEventListener("click", function(ev) { onMobileMenuClick(ev); });

let shownList = null;
let isMobileMenuShown = false;

function onResize() {
  updateMobileMenu();
}

function onDocumentClick(ev) {
  showList(null);
  showMobileMenu(false);
}

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

function onMobileMenuClick(ev) {
  let target = ev.target;
  if (!ev.defaultPrevented && target.nodeName === "A") {
    showMobileMenu(!isMobileMenuShown);
    updateMobileMenu();
    ev.preventDefault();
    ev.stopPropagation();
  }
}

function showList(list) {
  let oldShownList = shownList;
  if (shownList) {
    shownList.style.display = "none";
    shownList = null;
  }
  if (list && list !== oldShownList) {
    list.style.display = "block";
    shownList = list;
  }
}

function showMobileMenu(show) {
  isMobileMenuShown = show;
  updateMobileMenu();
}

function updateMobileMenu() {
  let navbarTopList = document.querySelector("#navbar > ul");
  let navbarShow = document.getElementById("navbar-show");
  let navbarHide = document.getElementById("navbar-hide");
  let width = document.documentElement.clientWidth;
  if (!isMobileMenuShown || (isMobileMenuShown && width > MOBILE_MENU_MAX_WIDTH)) {
    showList(null);
    navbarShow.style.display = "";
    navbarHide.style.display = "";
    navbarTopList.style.display = "";
    isMobileMenuShown = false;
  } else {
    navbarShow.style.display = "none";
    navbarHide.style.display = "block";
    navbarTopList.style.display = "block";
  }
}
