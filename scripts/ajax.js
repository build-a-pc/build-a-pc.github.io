/*
FILE NAME: ajax.js
WRITTEN BY: Håvard
WHEN: 2016 autumn
PURPOSE: Takes care of loading content pages and other core functionality.
*/

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
const CENTER_EXTRA_YSPACE = 14;
const META_TITLE = "title";
const META_DESCRIPTION = "description";
const META_AUTHOR = "author";
const META_PAGE = "page";
const META_SECTION = "section";
const META_PAGE_NAME = "page_name";
const META_SECTION_NAME = "section_name";
const META_PREV_PAGE_URI = "prev_page_uri";
const META_PREV_PAGE_NAME = "prev_page_name";
const META_NEXT_PAGE_URI = "next_page_uri";
const META_NEXT_PAGE_NAME = "next_page_name";
const META_SHOW_BREADCRUMBS = "show_breadcrumbs";
const META_SHOW_PAGE_BREADCRUMB = "show_page_breadcrumb";

let pageUriRoot = "";
let currentUriQuery = "";

// Called when browser is resized.
window.addEventListener("resize", function() { updateContentContainerHeight(); });

// Called when window is loaded.
window.addEventListener("load", function() {
  updateContentContainerHeight();
  gotoContentPage(window.location.href, true);
});

// Called when history state is popped.
window.addEventListener("popstate", function() { gotoContentPage(window.location.href); });

// Catches mouse clicks AJAX can handle.
window.addEventListener("click", function(ev) {
  let target = ev.target;
  if (!ev.defaultPrevented && ev.button === 0 && target.nodeName === "A") {
    if (target.origin === window.location.origin &&
        target.pathname === window.location.pathname) {
      ev.preventDefault();
      if (target.search !== window.location.search) {
        gotoContentPage(target.href, true);
      } else if (target.hash !== window.location.hash) {
        window.location.hash = target.hash;
      }
    }
  }
});

// Updates content container height.
function updateContentContainerHeight() {
  let header = document.getElementById("site-header-container");
  let center = document.getElementById("site-center");
  let footer = document.getElementById("site-footer-container");
  center.style.minHeight = String(window.innerHeight - header.clientHeight - footer.clientHeight - CENTER_EXTRA_YSPACE) + "px";
}

// Loads content page on given URI.
function gotoContentPage(uri, force=false) {
  let args = getArguments(uri);
  let section = args["section"];
  let page = args["page"];
  let fileUri = getFileUri(section, page);
  let pageUriQuery = getPageUriQuery(section, page);
  let browserUriQuery = window.location.search;

  if (force || pageUriQuery !== currentUriQuery || pageUriQuery !== browserUriQuery) {
    if (window.dispatchEvent(new Event(EVENT_ON_LOAD, {cancelable: true}))) {
      if (pageUriQuery !== browserUriQuery) {
        changeBrowserUri(window.location.pathname + pageUriQuery);
      }
      unloadOldContent();
      loadContentFile(fileUri);
      currentUriQuery = pageUriQuery;
    } else {
      console.log("[AJAX] Prevented: " + fileUri);
    }
  }
}

// Handles the actual content page file loading.
function loadContentFile(fileUri) {
  /*
   * Rules:
   * - If file not found: Go to ERROR_404_PATH.
   * - If ERROR_404_PATH not found: Log error to console.
   * - If file found: Perfect, load that masterpiece to content container.
   * - Return true if success, false if file not found.
   */

  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      switch (request.status) {
        case 200:
          loadNewContent(request.responseText);
          console.log("[AJAX] Loaded: " + fileUri);
          break;
        case 404:
          if (fileUri !== ERROR_404_PATH) {
            console.log("[AJAX] Error: 404 File not found: " + fileUri);
            loadContentFile(ERROR_404_PATH);
          } else {
            console.log("[AJAX] Error: Could not find error 404 file: " + fileUri);
          }
          break;
        default:
          console.log("[AJAX] Error: Unknown: " + request.status + ' ' + fileUri);
          break;
      }
    }
  };
  request.open("GET", fileUri, true);
  request.send();
}

// Unloads previous page and loads loading screen.
function unloadOldContent() {
  let container = document.getElementById(ID_CONTENT);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  let pNode = document.createElement("p");
  let textNode = document.createTextNode("Loading...");
  pNode.appendChild(textNode);
  container.appendChild(pNode);
}

// Loads the new content from the AJAX response into the header.
function loadNewContent(response) {
  let container = document.getElementById(ID_CONTENT);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  let dom = document.createElement("html");
  dom.innerHTML = response;
  container.innerHTML = dom.getElementsByTagName("body")[0].innerHTML;

  let info = getMetaInfo(dom);
  updateTitle(info[META_TITLE]);
  updatePrevNextBar(info[META_PREV_PAGE_URI], info[META_PREV_PAGE_NAME], info[META_NEXT_PAGE_URI], info[META_NEXT_PAGE_NAME]);

  window.dispatchEvent(new CustomEvent(EVENT_ON_LOADED, {"detail": info}));
}

// Updates window title.
function updateTitle(title) {
  let element = document.getElementsByTagName("title")[0];
  if (title) {
    element.innerHTML = TITLE + " - " + title
  } else {
    element.innerHTML = TITLE;
  }
}

// Updates the prev/next bar.
function updatePrevNextBar(prevUri, prevName, nextUri, nextName) {
  let prevNextBar = document.getElementById("prev_next_bar");
  let prevLink = document.getElementById("prev_link");
  let nextLink = document.getElementById("next_link");
  if (prevUri || nextUri) {
    prevNextBar.style.display = "block";
  } else {
    prevNextBar.style.display = null;
  }
  if (prevUri && prevName) {
    prevLink.style.display = "block";
    prevLink.setAttribute("href", prevUri);
    prevLink.getElementsByTagName("SPAN")[0].innerHTML = prevName;
  } else {
    prevLink.style.display = null;
  }
  if (nextUri && nextName) {
    nextLink.style.display = "block";
    nextLink.setAttribute("href", nextUri);
    nextLink.getElementsByTagName("SPAN")[0].innerHTML = nextName;
  } else {
    nextLink.style.display = null;
  }
}

// Gets meta info and title from DOM.
function getMetaInfo(dom) {
  let info = [];
  info[META_TITLE] = dom.getElementsByTagName("title")[0].innerHTML;
  metas = dom.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i++) {
    let metaName = metas[i].getAttribute("name")
    let metaContent = metas[i].getAttribute("content");
    switch(metaName) {
      case META_DESCRIPTION:
      case META_AUTHOR:
      case META_PAGE:
      case META_SECTION:
      case META_PAGE_NAME:
      case META_SECTION_NAME:
      case META_PREV_PAGE_URI:
      case META_PREV_PAGE_NAME:
      case META_NEXT_PAGE_URI:
      case META_NEXT_PAGE_NAME:
      case META_SHOW_BREADCRUMBS:
      case META_SHOW_PAGE_BREADCRUMB:
        info[metaName] = metaContent;
        break;
      default:
        break;
    }
  }
  return info;
}

// Changes browser URI using HTML5 History API.
function changeBrowserUri(newUri) {
  window.history.pushState(null, "title", newUri);
}

// Gets logical poge URI query for index.html.
function getPageUriQuery(section, page) {
  /*
   * Rules:
   * - Home has no section or name in query.
   * - Sections and pages with same name has no name in query.
   */

  let query = "";
  if (section) {
    query = "?section=" + section;
    if (page && section !== page) {
      query += "&page=" + page;
    }
  } else if (page && page !== "home") {
    query = "?page=" + page;
  }
  return query;
}

// Gets relative file path for page.
function getFileUri(section, page) {
  /*
   * Rules:
   * - If no section and no page: Go to home.
   * - If no section but page: Well, then the page just doesn't have a section.
   * - If section but no page: Give page same name as section.
   * - If section and page: No problem.
   */

  let path = pageUriRoot + "pages/";
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

// Gets arguments from given URI.
function getArguments(uri) {
  argumentsInQueryRegex = /(?:[\?\&]([a-zA-Z0-9_]+(?:=[a-zA-Z0-9_]*)?))/g;
  let element = document.createElement("a");
  element.href = uri;
  let query = element.search;
  let args = [];
  while (match = argumentsInQueryRegex.exec(query)) {
    let parts = match[1].split('=', 2);
    args[parts[0]] = (parts.length > 1 ? parts[1] : null);
  }
  return args;
}

// TMP onload example
window.addEventListener(EVENT_ON_LOAD, function(ev) {
  //console.log("EVENT_ON_LOAD");
  //ev.preventDefault();
});

// TMP onloaded example
window.addEventListener(EVENT_ON_LOADED, function(ev) {
/*
  console.log("EVENT_ON_LOADED");
  let options = ev.detail;
  console.log("title=" + options.title);
  console.log("description=" + options.description);
  console.log("author=" + options.author);
  console.log("page=" + options.page);
  console.log("section=" + options.section);
  console.log("page_name=" + options.page_name);
  console.log("section_name=" + options.section_name);
  console.log("prev_page_uri=" + options.prev_page_uri);
  console.log("prev_page_name=" + options.prev_page_name);
  console.log("next_page_uri=" + options.next_page_uri);
  console.log("next_page_name=" + options.next_page_name);
  console.log("show_breadcrumbs=" + options.show_breadcrumbs);
  console.log("show_page_breadcrumb=" + options.show_page_breadcrumb);
*/
});
