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

function close1Index(){
	
}

function close2Index(){
	
}

function wordsOnSamePage(){
	
}

function wordOnSamePage(){
	
}

function settning(splitWord){
	if(!close1Index()){
		if(!close2Index()){
			if(!wordsOnSamePage()){
				wordOnSamePage();
			}
		}
	}
}

function oneWord(){
	
}

function moreWords(searchString){
	var splitWord = searchString.value.split(" ");
	if(splitWord > 1){
		settning(splitWord);
	}
	if(splitWord = 1){
		oneWord(splitWord);
	}
}

function loadDoc(listSave,page,numberOfPage) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var page1 = [];
		var fileString = this.responseText;
		var cleanString = fileString.replace(/[\?\|!"#¤%&\/\(\)=\+-\.,_'¨\^}{\[\]\$£@:;*`~€<>§]| (?= )/g, " ");
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
		console.log(searchString.value);
		if(same == searchString.value){
			console.log(count);
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
		console.log(cleanSearchString);
		for(i = 0; i < parse.length; i++){
			for(var j = 0; j < parse[i].length; j++){
				if(cleanSearchString==parse[i][j]){
					console.log('We have a match at page: ' + pages[0][i] +" " + parse[i][j]);
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
}

function stop(){
	started = false;
	clearInterval(Timer);
}