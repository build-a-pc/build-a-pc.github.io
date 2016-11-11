// Quiz //
/*
FILE NAME: scripts/quiz.js
WRITTEN BY: Runar Espelund
WHEN: Oktober 2016
PURPOSE: Check if a given answer to quiz is correct or not
*/

//Function to check answer in radio buttons
var riktig=0
function validateRadio(){
	var quiz=document.getElementsByClassName("quiz")[0]
	console.log(quiz);
	var ol=quiz.getElementsByTagName("OL")[0]
	console.log(ol);
	var lists=ol.getElementsByTagName("LI")
	console.log(lists);
	console.log(lists)
	for (var i=0;i<lists.length;i++){
		var answers=ol.getElementsByTagName("LABEL")
		for (var n=0;n<answers.length;n++){
			if (answers.checked==true){
				riktig++
			}
		}
	}
	console.log(riktig)
}
