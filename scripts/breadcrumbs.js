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
  /*
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
	
	let bread_tag = document.getElementById("breadcrumbs");
	let bread_list = bread_tag.getElementsByTagName("ul");
	console.log(bread_list.length);
	bread_list[0].innerHTML = "";
	
	let li_home = document.createElement("LI");
	let txt_home = document.createTextNode("Home");
	li_home.appendChild(txt_home);
	bread_list[0].appendChild(li_home);
	
	
	let sectionName = options.section_name;
	let pageName = options.page_name;	
	
	console.log("sectionName : " + sectionName);
	console.log("pageName : " + pageName);
	
	if(sectionName){
		let li_sect = document.createElement("LI");
		var txt_sect = document.createTextNode(sectionName);
		li_sect.appendChild(txt_sect);
		bread_list[0].appendChild(li_sect);
		console.log("A=" +li_sect.innerHTML);
	}	
	if(pageName){
		let li_page = document.createElement("LI");
		var txt_page = document.createTextNode(pageName);
		li_page.appendChild(txt_page);
		bread_list[0].appendChild(li_page);
		console.log("B="+li_page.innerHTML);
	}
	
	if(sectionName){
		console.log("1>" + txt_page.textContent + " 2>" + txt_sect.textContent);
		//bread_list[0].removeChild(bread_list[0].lastChild);
	}
	else{
		console.log("s1>" + txt_page.textContent);
		bread_list[0].removeChild(bread_list[0].lastChild);
	}
	
	if(true){
	console.log("Zzz# " + (bread_list.length-1));
	 	//console.log("REMOVE CHILD");
	 	//console.log("ABC = " + bread_list[0].lastChild);
	 	//bread_list[0].lastChild.innerHTML = ""; // fjerner bare tekst ikke listeelement
	 	
	 	
	 	//bread_list[0].removeChild(bread_list[0].lastChild);
	}
	
	/* print content of brod_liste
	console.log(li_home.innerHTML);
	
	for(idx=0; idx<bread_list.length; idx++){
		console.log(bread_list[idx].innerHTML);
	}	
	*/
	
	
	
	/* Denne finner <head>
	let tempest = document.scripts;
	for(idx=0; idx < tempest.length; idx++){
		console.log(tempest[idx]);
		var tempo = tempest[idx].getAttribute("src");
		console.log(tempo);
	}*/

	/* Denne klarer ikke finne meta i undersider, bare de 8 i index.html
   let metaTags = document.getElementsByTagName('meta'); 
   console.log("Number of meta tags : " + metaTags.length);
   for (var i=0; i<metaTags.length; i++) { 
   	 console.log(metaTags[i]);
   	  let temp10 = metaTags[i].getAttribute("section_name");	
   	  console.log("temp10 = " + temp10);
   	  
      if (temp10) { 
  			console.log("found the section_name!");
  			console.log(temp10);
      } 
   }*/ 
  }
);



// Show/Hide breadcrumbs trail
function breadcrumsDisplayedstate() {
	let styleBrCr = document.getElementById("breadcrumbs").style;
	styleBrCr.display = "block";  
	styleBrCr.visibility = "visible";
}


/* Show/Hide breadcrumbs trail
function breadcrumsDisplayedstate() {
	let styleBrCr = document.getElementById("breadcrumbs").style;
	console.log("styleBrCr.display = " + styleBrCr.display);
	if(styleBrCr.display == "none"){  
	  styleBrCr.display = "block";  
	  styleBrCr.visibility = "visible";
	  console.log("\n make breadcrumbs ON (visible)");
	  console.log("\n\n*******************************************");
	}
	else{
	  //document.getElementById("breadcrumbs").style.display = "none";
	  styleBrCr.display = "none";
	  styleBrCr.visibility = "visible";
	 // temp.visibility = "collapse";
	  //#breadcrumbs {display: none;}
	  console.log("\n make breadcrumbs OFF (invisible)");
	  console.log("\n\n*******************************************");
	}
}

*/




/*
document.getElementById("content").addEventListener("load", 
  function(){
  console.log("\n\n******  UNLOAD   ******");
  console.log("\t \t");
  console.log("\n\n*******************************************");  
  alert(" test it");
  }
);

window.addEventListener("click", 
  function(ev){
	alert("ev.target = " + ev.target);
	
  }
)

window.addEventListener("popstate", 
	function(event) {
		alert("Star Wars");
	}
)

window.addEventListener("hashchange", 
function(){
alert("change");

});

document.onreadystatechange = function () {
   switch (document.readyState){
  	case "loading":
		alert("Loading");
		console.log("Loading");
    	break;
  	case "interactive":
    	alert("Interactive");
	    break;
   case "complete":
    	alert("Complete");
    	break;
  }	
}
*/



/*
window.addEventListener("load", 
  function(){
  console.log("\n\n******  LOAD WINDOW   ******");
  console.log("\t \t");
  console.log("\n\n*******************************************");  
  //alert(" test it");
  }
);



document.addEventListener("click",
  function(trigger){ 
	console.log("\n breadcrumbds eventListener: trigger = " + trigger);  
	//breadcrumbShow(true);
	//breadcrumbsVisibility();
  }
)


// visibility breadcrumbs trail
function breadcrumbsVisibility(){
	let styleBreadCr = document.getElementById("breadcrumbs").style;
	
	if(styleBreadCr.visibility == "hidden"){   
	   styleBreadCr.visibility = "visible";
	   console.log("\n make breadcrumbs ON (visible)");
	}
	else{
	  styleBreadCr.visibility = "hidden";
	  console.log("\n make breadcrumbs OFF (invisible)");
	}
}
*/

