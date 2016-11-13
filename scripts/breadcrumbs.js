/*
FILE NAME: breadbrumbs.js
WRITTEN BY: Thomas
WHEN: 2016 autumn
PURPOSE: Dynamic update of breadcrumb trail
*/

//  run all functions on top while having function declarations on bottom (hoisted)
window.addEventListener(EVENT_ON_LOADED, 
  function(ev){ updateBreadCrumbs(ev)} );



function updateBreadCrumbs(){

	let eventus = arguments[0];
	let bread_tag = document.getElementById("breadcrumbs");
	displayElement(bread_tag);
	
	let bread_list = bread_tag.getElementsByTagName("ul");
	bread_list[0].innerHTML = "";	
	
	var section = eventus.detail.section;
	var sectionname = eventus.detail.section_name;
	var page = eventus.detail.page;
	var pagename = eventus.detail.page_name;
		
	var link = 	FILE_PROTOCOL_PAGE_ROOT;
	addBreadCrumb(link, "Home", bread_list);	
		
	let query = "";
	
	if(section && !page || page && page == section){
		query = "?section=" + section;
		link = link + query;
		addBreadCrumb(link, sectionname, bread_list);
	}
	else if(!section && page){
		query = "?page=" + page;
		link = link + query;
		//addBreadCrumb(link, pagename, bread_list);
	}
	else if(section && page){	
		query = "?section=" + section;
		link = link + query;
		addBreadCrumb(link, sectionname, bread_list);
		query = query  + "&page=" + page;
		link = link + query;
		addBreadCrumb(link, pagename, bread_list);	
	}	  
}

// Generic/modular extraction query from URL and return table with name/value-pairs
function getQueryPairs(){
	var query = window.location.search.substring(1);
    var queryTab = query.split("&");
    return queryTab;
}

// Append a hyperlinked breadcrumb to BrCr-trail
function addBreadCrumb(weblink, brCrName, brCrList){
	var list_element = document.createElement("LI");
	var anchor_element = document.createElement("A");
	list_element.appendChild(anchor_element);
	anchor_element.setAttribute("href", weblink);
		
	var txt_node = document.createTextNode(brCrName);
	anchor_element.appendChild(txt_node);
	brCrList[0].appendChild(list_element);
}

// Show/Hide breadcrumbs trail
function displayElement(elementID){
	var styleElement = elementID.style;
	styleElement.display = "block";  
	styleElement.visibility = "visible";
}
