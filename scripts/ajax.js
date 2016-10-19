// AJAX and stuff //

/*
 * Events (dispatched on window):
 * - baponcontentload: When content is being unloaded and new content will be loaded (does not fire first time home is loaded).
 * - baponcontentloaded: When page has been loaded into content container. Event.detail array contains info about page, see constants META_* below.
 */

const PAGE_FILE_ENDING = ".inc.html";
const ERROR_404_PATH = "/pages/error/404.inc.html";
const EVENT_ON_LOAD = "baponcontentload";
const EVENT_ON_LOADED = "baponcontentloaded";
const ID_CONTENT = "content";
const TITLE = "Build-a-PC"
const META_TITLE = "title";
const META_DESCRIPTION = "description";
const META_AUTHOR = "author";
const META_PAGE = "page";
const META_SECTION = "section";
const META_PAGE_NAME = "page_name";
const META_SECTION_NAME = "section_name";
const META_SHOW_NAVBAR = "show_navbar";
const META_SNOW_NAVBAR_PAGE = "show_navbar_page";

// Update when window is loaded.
window.addEventListener("load", function() {
  gotoContentPage(window.location.href);
});

// Update when history state is popped.
window.addEventListener("popstate", function() {
  gotoContentPage(window.location.href);
});

// Catch mouse clicks AJAX can handle.
window.addEventListener("click", function(event) {
  var target = event.target;
  if (target.nodeName == "A" || target.nodeName == "a") {
    if (target.host == window.location.host &&
      target.protocol == window.location.protocol &&
      target.pathname == window.location.pathname) {
        event.preventDefault();
        gotoContentPage(target.href);
      }
  }
});

// TMP example
window.addEventListener(EVENT_ON_LOAD, function() {
  console.log("EVENT_ON_LOAD");
});

// TMP example
window.addEventListener(EVENT_ON_LOADED, function(event) {
  console.log("EVENT_ON_LOADED: page=" + event.detail.page);
});

// Loads content page on given URL.
function gotoContentPage(url) {
  var arguments = getArguments(url);
  var section = arguments["section"];
  var page = arguments["page"];
  var fileUrl = getFileUrl(section, page);
  var pageUrlQuery = getPageUrlQuery(section, page);
  var browserUrlQuery = window.location.search;

  if (pageUrlQuery != browserUrlQuery) {
    changeBrowserUrl(window.location.pathname + pageUrlQuery);
  }

  if (window.dispatchEvent(new Event(EVENT_ON_LOAD))) {
    unloadOldContent();
    loadContentFile(fileUrl);
  } else {
    console.log("Warning: Page load prevented.");
  }
}

// Handles the actual content page file loading.
function loadContentFile(fileUrl) {
  /*
   * Rules:
   * - If file not found: Go to ERROR_404_PATH.
   * - If ERROR_404_PATH not found: Log error to console.
   * - If file found: Perfect, load that masterpiece to content container.
   * - Return true if success, false if file not found.
   */

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      switch (request.status) {
        case 200:
          loadNewContent(request.responseText);
          console.log("[AJAX] Page loaded: " + fileUrl);
          break;
        case 404:
          if (fileUrl != ERROR_404_PATH) {
            console.log("[AJAX] Error: 404 File not found: " + fileUrl);
            loadContentFile(ERROR_404_PATH);
          } else {
            console.log("[AJAX] Error: Could not find error 404 file: " + fileUrl);
          }
          break;
        default:
          console.log("[AJAX] Error: Unknown: " + request.status + ' ' + fileUrl);
          break;
      }
    }
  };
  request.open("GET", fileUrl, true);
  request.send();
}

function unloadOldContent() {
  var container = document.getElementById(ID_CONTENT);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // TODO Add "loading screen"
  var pNode = document.createElement("p");
  var textNode = document.createTextNode("Loading...");
  pNode.appendChild(textNode);
  container.appendChild(pNode);
}

function loadNewContent(response) {
  var container = document.getElementById(ID_CONTENT);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  var dom = document.createElement("html");
  dom.innerHTML = response;
  container.innerHTML = dom.getElementsByTagName("body")[0].innerHTML;

  var info = getMetaInfo(dom);
  updateTitle(info[META_TITLE]);

  window.dispatchEvent(new CustomEvent(EVENT_ON_LOADED, {"detail": info}));
}

// Updates window title.
function updateTitle(title) {
  var element = document.getElementsByTagName("title")[0];
  if (title) {
    element.innerHTML = TITLE + " - " + title
  } else {
    element.innerHTML = TITLE;
  }
}

// Gets meta info and title from DOM.
function getMetaInfo(dom) {
  var info = [];
  info[META_TITLE] = dom.getElementsByTagName("title")[0].innerHTML;
  metas = dom.getElementsByTagName("meta");
  for (var i = 0; i < metas.length; i++) {
    var metaName = metas[i].getAttribute("name")
    var metaContent = metas[i].getAttribute("content");
    switch(metaName) {
      case META_DESCRIPTION:
      case META_AUTHOR:
      case META_PAGE:
      case META_SECTION:
      case META_PAGE_NAME:
      case META_SECTION_NAME:
      case META_SHOW_NAVBAR:
      case META_SNOW_NAVBAR_PAGE:
        info[metaName] = metaContent;
        break;
      default:
        break;
    }
  }
  return info;
}

// Changes browser URL using HTML5 History API.
function changeBrowserUrl(newUrl) {
  window.history.pushState(null, "title", newUrl);
}

// Gets logical poge URL query for index.html.
function getPageUrlQuery(section, page) {
  /*
   * Rules:
   * - Home has no section or name in query.
   * - Sections and pages with same name has no name in query.
   */

  var query = "";
  if (section) {
    query = "?section=" + section;
    if (page && section != page) {
      query += "&page=" + page;
    }
  } else if (page && page != "home") {
    query = "?page=" + page;
  }
  return query;
}

// Gets relative file path for page.
function getFileUrl(section, page) {
  /*
   * Rules:
   * - If no section and no page: Go to home.
   * - If no section but page: Well, then the page just doesn't have a section.
   * - If section but no page: Give page same name as section.
   * - If section and page: No problem.
   */

  var path = "pages/";
  if (section && page) {
    path += section + '/' + page;
  } else if (!section && page) {
    path += page;
  } else if (section && !page) {
    path += section + '/' + section;
  } else if (!section && !page) {
    path += "home";
  }
  path += PAGE_FILE_ENDING;
  return path;
}

// Gets arguments from given URL.
function getArguments(url) {
  argumentsInQueryRegex = /(?:[\?\&]([a-zA-Z0-9]+(?:=[a-zA-Z0-9]*)?))/g;
  var element = document.createElement("a");
  element.href = url;
  var query = element.search;
  var arguments = [];
  while (match = argumentsInQueryRegex.exec(query)) {
    var parts = match[1].split('=', 2);
    arguments[parts[0]] = (parts.length > 1 ? parts[1] : null);
  }
  return arguments;
}
