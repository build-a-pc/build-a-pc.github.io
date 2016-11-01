// Search //

var Timer;
var same = "";
var count = 0;
var started = false;
var parse = [];
var soke = "";
var pages = [];
var numberOfPages = 0;
var rankedHits = [];
loadDoc(pages,'content.txt',0,'txt');

function dropDown(whatPage,splitWord){
	var div = document.getElementById('dropdown');
	div.innerHTML = ""
	for(var i = 0; i < whatPage.length; i++){
		var a = document.createElement("a");
		a.setAttribute("href",'#'+whatPage[i]);
		a.innerHTML = splitWord[0];
		div.appendChild(a);
	}
	var show = document.getElementById("dropdown");
	show.style.display = 'block';
}


function close1Index(splitWord){
	var hits = [];
	for(var h = 0; h < splitWord.length; h++){
		hits[h]=[];
		var number = 0;
		for(var i = 0; i < parse.length; i++){
		loop1:for(var j = 0; j < parse[i].length; j++){
				if(splitWord[h]==parse[i][j]){
					console.log('hit')
					hits[h][number] = pages[0][i];
					number = number + 1;
					break loop1;
				}
			}
		}
	}
	hits.sort();
	var number1 = 0;
	var whatPage = [];
	for(var h = 0; h < hits[0].length; h++){
		whatPage[h] = hits[0][h];
		number1 = number1 + 1;
		for(var i = 1; i < hits.length; i++){
			loop2:for(var j = 0; j < hits[i].length; j++){
				if(hits[0][h] == hits[i][j]){
					number1 = number1 + 1;
					break loop2;
				}
			}
		}
	}
	if((number1/whatPage.length)==splitWord.length){
		console.log('Hurra')
	}
	dropDown(whatPage,splitWord);
}

function moreWords(searchString){
	var splitWord = searchString.split(" ");
	close1Index(splitWord);
}

function loadDoc(listSave,page,numberOfPage) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var page1 = [];
		var fileString = this.responseText;
		var cleanString = fileString.replace(/[\?\|!"#¤%&\/\(\)=\+-\.,'¨\^}{\[\]\$£@:;*`~€<>§]| (?= )/g, " ");
		var cleanerString = cleanString.replace(/[A-Z]/gi, function myFunction(x){return x.toLowerCase();});
		var word = [];
		var lines = cleanerString.split("\n");
		var words = [];
		for (var i = 0; i < lines.length; i++){
			words.push(lines[i].split(" "));
		}
		for(var i = 0; i < words.length; i++){
			for(var j = 0; j < words[i].length; j++){
				word.push(words[i][j]);
			}
		}
		for(var i = 0; i < word.length; i++){
			page1[i] = word[i];
		}
		listSave[numberOfPage] = page1;
	}
  };
  xhttp.open("GET", "https://build\-a\-pc\.github\.io\\"+page, true);
  xhttp.send();
}

function checkTextBox(){
	var page = 1;
	var searchString = document.getElementById('search');
	if(searchString.value !== ''){
		if(same == searchString.value){
			count = count+1;
		}
		same = searchString.value;
	}
	if(count == 2){
		clearInterval(Timer);
		started = false;
		console.log('3 times');
		same = "";
		count = 0;
		soke = searchString;
		var cleanSearchString = searchString.value.replace(/[A-Z]/gi, function myFunction(x){return x.toLowerCase();});
		moreWords(cleanSearchString);
		for(i = 0; i < parse.length; i++){
			loop3:for(var j = 0; j < parse[i].length; j++){
				if(cleanSearchString==parse[i][j]){
					console.log('We have a match at page: ' + pages[0][i] +" " + parse[i][j]);
					break loop3;
				}
			}
			
		}
	}
};

function start(){
	if(!started){
		started = true;
		Timer = setInterval(checkTextBox, 1000);
		for(var i = 0; i < pages[0].length;i++){
			loadDoc(parse,'pages\\'+pages[0][i]+'.inc.html',i,'html')
		}
	}
	var show = document.getElementById("dropdown");
	show.style.display = 'none';
}

function stop(){
	started = false;
	clearInterval(Timer);
	var show = document.getElementById("dropdown");
	show.style.display = 'none';
}