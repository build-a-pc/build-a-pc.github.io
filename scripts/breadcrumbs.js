/*
FILE NAME: breadbrumbs.js
WRITTEN BY: Thomas
WHEN: 2016 autumn
PURPOSE: Dynamic update of breadcrumb trail
*/

console.log("\n\n******  RUN   BREADCRUMBS  ******");
console.log("\t hello world ....");
console.log("\n\n*******************************************");


 let visibleState = false;
 let displayState = false;


window.addEventListener("baponcontentloaded", 
	function(ev){
	  console.log("baponcontent  LOADED ");
	  let temp = ev.detail;
	  console.log("temp = " + temp);
	  console.log("ev.detail = " + ev.detail);
	  //breadcrumsDisplayedstate();
	  }
)

// TMP onloaded example
window.addEventListener(EVENT_ON_LOADED, function(ev) {

	breadcrumsDisplayedstate();
    console.log("\nEVENT_ON_LOADED");
    let options = ev.detail;
	
	let bread_tag = document.getElementById("breadcrumbs");
	let bread_list = bread_tag.getElementsByTagName("ul");
	bread_list[0].innerHTML = "";	
	
	let li_home = document.createElement("LI");
	let anc_home = document.createElement("A");	
	li_home.appendChild(anc_home);
	let txt_home = document.createTextNode("Home");
	anc_home.setAttribute("href", FILE_PROTOCOL_PAGE_ROOT);
	anc_home.appendChild(txt_home);
	bread_list[0].appendChild(li_home);
	
	let sectionName = options.section_name;
	let pageName = options.page_name;	
		
	
	if(sectionName){
		let li_sect = document.createElement("LI");
		var anc_sect = document.createElement("A");
    	li_sect.appendChild(anc_sect);
		
		var txt_sect = document.createTextNode(sectionName);
		anc_sect.setAttribute("href", "http://www.vg.no");
		anc_sect.appendChild(txt_sect);
		bread_list[0].appendChild(li_sect);
	}	
	if(pageName){
		let li_page = document.createElement("LI");
		var anc_page = document.createElement("A");
		li_page.appendChild(anc_page);
		anc_page.setAttribute("href", "http://www.dagbladet.no");
		
		var txt_page = document.createTextNode(pageName);
		anc_page.appendChild(txt_page);
		bread_list[0].appendChild(li_page);
		console.log("Blink="+li_page.innerHTML);
	}
		
	
	if(sectionName){
		console.log("1>" + txt_page.textContent + " 2>" + txt_sect.textContent);
	}
	else{
		console.log("s1>" + txt_page.textContent);
		bread_list[0].removeChild(bread_list[0].lastChild);
	}
	
	if(true){
	console.log("Zzz# " + (bread_list.length-1));
	}
	
		
	
  }
);



// Show/Hide breadcrumbs trail
function breadcrumsDisplayedstate() {
	let styleBrCr = document.getElementById("breadcrumbs").style;
	styleBrCr.display = "block";  
	styleBrCr.visibility = "visible";
}
