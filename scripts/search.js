// Search //

var Timer = setInterval(checkTextBox, 1000);
var same = "";
var count = 0;
var plus = 1;

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function checkTextBox(){
	var userName = document.getElementById('fName');
	if(userName.value !== ''){
		console.log(userName.value);
		if(same == userName.value){
			count = count + plus;
		}
		same = userName.value;
	}
	if(count == 2){
		clearInterval(setInterval);
		console.log('2 times');
		same = "";
		count = 0;
		readTextFile("https://build\-a\-pc\.github\.io\\content.txt")
	}
};// Search //
