
let Timer;
let Timer2;
let same = "";
let count = 0;
let started = false;
let parse = [];
let soke = "";
let pages = [];
let show;
loadDoc(pages,"content.txt",0,0);

function dropDown(whatPage,splitWord){
  let div = document.querySelector(".search #dropdown");
  div.innerHTML = "";
  for(let i = 0; i < whatPage.length; i++){
    let pageLink = whatPage[i].split("\\\\");
    if(whatPage[i] == "home"){
      let a = document.createElement("a");
      a.setAttribute("href",".");
      a.innerHTML = "Section: Home";
      div.appendChild(a);
    }
    if(whatPage[i] == "sitemap"){
      let a = document.createElement("a");
      a.setAttribute("href","?page=sitemap");
      a.innerHTML = "Section: Sitemap";
      div.appendChild(a);
    }
    if((pageLink.length > 1)){
      let a = document.createElement("a");
      a.setAttribute("href","?section="+pageLink[0]+"&page="+pageLink[1]);
      a.innerHTML = ("Section: " + containPageNameMoreThan1Word(pageLink[0]) + ", Page: " + containPageNameMoreThan1Word(pageLink[1]));
      div.appendChild(a);
    }
    if((pageLink.length == 1) && whatPage[i] != "home" && whatPage[i] != "sitemap"){
      let a = document.createElement("a");
      a.setAttribute("href","?section="+whatPage[i]);
      a.innerHTML = ("Section: " + containPageNameMoreThan1Word(pageLink[0]));
      div.appendChild(a);
    }
    if((pageLink.length == 0)){
      let a = document.createElement("a");
      a.innerHTML = ("No hits, try remove words or search on something else");
      div.appendChild(a);
    }	
  }
  let show = document.querySelector(".search #dropdown");
  show.style.display = "block";
}

function containPageNameMoreThan1Word(pageLink){
  let splitPageLink = pageLink.split("_");
  for(let i = 0; i < splitPageLink.length; i++){
	if(splitPageLink[i].length < 4){
	  splitPageLink[i] = splitPageLink[i] = splitPageLink[i].toUpperCase();;
	}
	if(splitPageLink[i].length >= 4){
	  splitPageLink[i] = splitPageLink[i].charAt(0).toUpperCase() + splitPageLink[i].slice(1);		
	}
  }
  if(splitPageLink.length == 3){
	return (splitPageLink[0] + " og " + splitPageLink[1] + " og " + splitPageLink[2]);
  }
  if(splitPageLink.length == 2){
	return (splitPageLink[0] + " og " + splitPageLink[1]);
  }
  if(splitPageLink.length == 1){
	return splitPageLink[0];
  }
  if(splitPageLink.length > 5){
	return "Something is wrong, no page shall exist of more than 3 nameparts";
  }
	
}

function close1Index(splitWord){
  let hits = [];
  for(let h = 0; h < splitWord.length; h++){
    hits[h]=[];
    let number = 0;
    for(let i = 0; i < parse.length; i++){
    loop1:for(let j = 0; j < parse[i].length; j++){
        if(splitWord[h]==parse[i][j]){
          console.log("hit");
          hits[h][number] = pages[0][i];
          number = number + 1;
          break loop1;
        }
      }
    }
  }
  hits.sort();
  let number1 = 0;
  let whatPage = [];
  for(let h = 0; h < hits[0].length; h++){
    whatPage[h] = hits[0][h];
    number1 = number1 + 1;
    for(let i = 1; i < hits.length; i++){
      loop2:for(let j = 0; j < hits[i].length; j++){
        if(hits[0][h] == hits[i][j]){
          number1 = number1 + 1;
          break loop2;
        }
      }
    }
  }
  dropDown(whatPage,splitWord);
}

function moreWords(searchString){
  let splitWord = searchString.split(" ");
  close1Index(splitWord);
}

function loadDoc(listSave,page,numberOfPage,run) {
  let fileString;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    let page1 = [];
	if(run == 0){
		fileString = this.responseText;
	}
    if(run >= 1){
		fileString = exractBody(this.responseText);
	}
    let cleanString = fileString.replace(/[\?\|!"#¤%&\/\(\)=\+\-'¨\^}{\[\]\$£@:;*`~€<>§]| (?= )/g, " ");
    let cleanerString = cleanString.replace(/[A-Z]/gi, function myFunction(x){return x.toLowerCase();});
    let word = [];
    let lines = cleanerString.split("\n");
    let words = [];
    for (let i = 0; i < lines.length; i++){
      words.push(lines[i].split(" "));
    }
    for(let i = 0; i < words.length; i++){
      for(let j = 0; j < words[i].length; j++){
        word.push(words[i][j]);
      }
    }
    for(let i = 0; i < word.length; i++){
      page1[i] = word[i];
    }
    listSave[numberOfPage] = page1;
  }
  };
  xhttp.open("GET", "https://build\-a\-pc\.github\.io\\"+page, true);
  xhttp.send();
}

function exractBody(response) {
  let dom1 = document.createElement("html");
  dom1.innerHTML = response;
  let bodyText = dom1.getElementsByTagName("body")[0].innerHTML;
  return bodyText;
}

function checkTextBox(){
  let searchString = document.getElementById("search-bar");
  if(searchString.value !== ""){
    if(same == searchString.value){
      count = count+1;
    }
    same = searchString.value;
  }
  if(count == 2){
    clearInterval(Timer);
    started = false;
    same = "";
    count = 0;
    soke = searchString;
    let cleanSearchString = searchString.value.replace(/[A-Z]/gi, function myFunction(x){return x.toLowerCase();});
    moreWords(cleanSearchString);
    }
}


function start(){
  if(!started){
    started = true;
    Timer = setInterval(checkTextBox, 1000);
    for(let i = 0; i < pages[0].length;i++){
      loadDoc(parse,"pages\\"+pages[0][i]+".inc.html",i,1);
    }
  }
  let show = document.querySelector(".search #dropdown");
  show.style.display = "none";
}

function stop(){
  started = false;
  clearInterval(Timer);
  show = document.querySelector(".search #dropdown");
  Timer2 = setInterval(hideDropDown, 500);
}

function hideDropDown(){
  show.style.display = "none";
  clearInterval(Timer2);
}
