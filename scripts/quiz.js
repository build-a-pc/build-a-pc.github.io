// Quiz //
/*
FILE NAME: scripts/quiz.js
WRITTEN BY: Runar Espelund
WHEN: Oktober 2016
PURPOSE: Check if a given answer to quiz is correct or not
*/

//Function to check answer in radio buttons
function validateRadio(){
	var quiz=document.getElementsByClassName="quiz"
	window.alert(quiz)
	var quizAnswer=document.forms[0].elements["radioName"]
	for(var n=0;n<quizAnswer.length;n++){
		if (quizAnswer[n].checked){
			if (quizAnswer[n].value=="Value of correct answer"){
				//Do something
			}
		}
	}
}

//Function to check answer in text input field
function validateText(){
	var quizAnswer=document.getElementById("textFieldId").value.toLowerCase();
	if (quizAnswer=="Value of correct answer on lower case"){
		//Do something
	}
}

//Function to check answers in multiple choice questions
function validateCheckbox(){
	var quizAnswers=document.getElementsByName("checkboxName")
	var userAnswer=new Array()
	var correctAnswer=new Array("List all right answers")
	var boolAnswer=true;
	for (n=0;n<quizAnswers.length;n++){
		if (quizAnswers[n].checked){
			userAnswer.push(quizAnswers[n].value)
		}
	}
	userAnswer.sort()
	correctAnswer.sort()
	if (userAnswer.length==correctAnswer.length){
		for (n=0;n<userAnswer.length;n++){
			if(userAnswer[n]!=correctAnswer[n]){
				boolAnswer=false
				break
			}
		}
	}
	else{
		boolAnswer=false
	}
	if (boolAnswer==true){
		//Do something
	}
}
