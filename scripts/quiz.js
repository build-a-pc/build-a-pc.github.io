// Quiz //
/*
FILE NAME: scripts/quiz.js
WRITTEN BY: Runar Espelund
WHEN: Oktober 2016
PURPOSE: Check if a given answer to quiz is correct or not
*/

//Function to check answer in radio buttons
var correct=0
function validateRadio(){
	correct=0
	let list = document.querySelector(".ol")
	let numbersOfLi = list.getElementsByTagName("li")
	for (var i=0;i<numbersOfLi.length;i++){
		let inputs = numbersOfLi[i].getElementsByTagName("input")
		var k=(inputs.length-1)
		var hidden = numbersOfLi[i].querySelector("input[type=hidden]")
		for(var k=0; k<inputs.length; k++){
			if (inputs[k].checked==true){
				if (inputs[k].value==hidden.value){
					correct++;
				}
			}
		}
	}
	var quizResult = document.getElementById("resultatQuiz")
	quizResult.innerHTML=("You got "+correct+" / "+numbersOfLi.length+" correct")
}
