// Search //

var Timer = setInterval(checkTextBox, 1000);
var same = "";
var count = 0;
var plus = 1;

function matchFound(searchString,page){
	
}

function loadDoc(searchString,page) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		var fileString = this.responseText;
		var cleanString = fileString.replace(/[\?\|!"#¤%&\/\(\)=\+-\.,_'¨\^}{\[\]\$£@:;*`~€<>§]| (?= )/g, "")
		var word = []
		var lines = cleanString.split("\n");
		var words = []
		for (var i = 0; i < lines.length; i++){
			words.push(lines[i].split(" "));
		}
		for(var i = 0; i < words.length; i++){
			for(var j = 0; j < words[i].length; j++){
				word.push(words[i][j]);
			}
		}
		for (var i = 0; i < word.length; i++){
			if(word[i]==searchString){
				console.log('We have a match');
				matchFound(searchString,page);
			}
		}
    }
  };
  xhttp.open("GET", "https://build\-a\-pc\.github\.io\\content.txt", true);
  xhttp.send();
}

function checkTextBox(){
	var page = 1;
	var searchString = document.getElementById('search');
	if(searchString.value !== ''){
		console.log(searchString.value);
		if(same == searchString.value){
			count = count + plus;
		}
		same = searchString.value;
	}
	if(count == 2){
		clearInterval(setInterval);
		console.log('3 times');
		same = "";
		count = 0;
		//readTextFile("https://build\-a\-pc\.github\.io\\content.txt")//
		loadDoc(searchString.value,page);
	}
};