var BasicCard = require("./BasicCard.js");
var basicData = require("./basic.json");
var ClozeCard = require("./ClozeCard.js");
var clozeData = require("./cloze.json");
var inquirer = require("inquirer");
var question = 1;
var correct = 0;
var incorrect = 0;
var currentCard;
var cardArray = [];

//This function will be run once and will fill the cardArray with objects we have stored in the basic.json file.
//A user can add as many additional objects as they like to the basic.json file and the game will operate normally.

function initBasic(){
	for (var i =0; i < basicData.length; i++){
		currentCard = new BasicCard(basicData[i].front, basicData[i].back);
		cardArray.push(currentCard);
	}
basicFlash();
}

//This function will be run once and will fill the cardArray with objects we have stored in the cloze.json file.
//A user can add as many additional objects as they like to the cloze.json file and the game will operate normally.

function initCloze(){
		for (var i =0; i < clozeData.length; i++){
		currentCard = new ClozeCard(clozeData[i].text, clozeData[i].cloze);
		cardArray.push(currentCard);
	}
clozeFlash();
}

//The following three functions will reveal the results of an answer. I could have left this at two functions, but 
//I wanted the correct answer to be revealed for both basic and cloze flashcards systems.

function correctAnswer(){
	correct++;
	if (question >= basicData.length) {
	console.log("==============================================");
  console.log("Correct! That was the last question!");
  console.log("==============================================");	
	} else {
  console.log("==============================================");
  console.log("Correct! Let's keep this going.");
  console.log("==============================================");
	}
}

function incorrectAnswerBasic(){
	incorrect++;
	if (question >= basicData.length) {
	console.log("==============================================");
  console.log("Incorrect! The correct answer was "+cardArray[question-1].back+". Unfortunately, that was the last question...");
  console.log("==============================================");	
	} else {
  console.log("==============================================");
  console.log("Incorrect! The correct answer was "+cardArray[question-1].back+". Let's move on.");
  console.log("==============================================");
  };
}

function incorrectAnswerCloze(){
	incorrect++;
	if (question >= clozeData.length) {
	console.log("==============================================");
  console.log("Incorrect! The correct answer was "+cardArray[question-1].cloze+". Unfortunately, that was the last question...");
  console.log("==============================================");	
	} else {
  console.log("==============================================");
  console.log("Incorrect! The correct answer was "+cardArray[question-1].cloze+". Let's move on.");
  console.log("==============================================");
  };
}

//This inquirer function handles the basic flashcard questions. Correct and incorrect answers are tallied up for 
//the result screen at the end. Additionally, I made use of a recursive function to limit the code required for this. 
//The game will continue until the user has reached the last object or question in the basic.json file. I've also 
//included a command to end the flashcard system and return the user to the terminal/GitBash.

function basicFlash(){

if (question <= basicData.length) {

	inquirer.prompt([
	  
	  {
	    type: "input",
	    name: "answer",
	    message: question+". "+cardArray[question-1].front,
	    suffix: "\nAnswer:"
	  },

	]).then(function(user) {

	  if (user.answer === cardArray[question-1].back) {
	 	correctAnswer(); 	
	  } else if (user.answer === "^X"){
	  	end();
	  	process.exit();
	  } else {
	  	incorrectAnswerBasic();
		}
		question++;
		basicFlash();
		}) 
	} else {
		end();
	}
};

// Identical to the function above, except this is for the cloze flashcard system. As such, the question references
// the partial property of the cloze flashcard objects. In ClozeCard.js, we see that the partial property takes the
// full text and replaces the matching string of the answer with a set of ellipses. In the event that the user adds
// a question and answer to the cloze.json file where there is no match between the cloze and full text, an error message
// will be returned detailing that issue. I've also included a command to end the flashcard system and return the user
// to the terminal/GitBash.

function clozeFlash(){

if (question <= clozeData.length) {

	inquirer.prompt([
	  
	  {
	    type: "input",
	    name: "answer",
	    message: question+". "+cardArray[question-1].partial,
	    suffix: "\nAnswer:"
	  },

	]).then(function(user) {

	  if (user.answer === cardArray[question-1].cloze) {
	  	correctAnswer();
	  } else if (user.answer === "^X"){
	  	end();
	  	process.exit();
	  } else {
	  	incorrectAnswerCloze();
		}
		question++;
		clozeFlash(); 
		}) 
	} else {
		end();
	}
};

// This function ends the flashcard session and reports the results to the user. I noticed the box would appear odd
// if either the correct or incorrect variable was two digits, so I altered that spacing in either event.

function end() {
	console.log("")
	console.log("===================RESULTS====================");
	console.log("==============================================");
	if (correct >= 10){
	console.log("==----------Correct Answers: "+correct+"-------------==")
	} else {
	console.log("==----------Correct Answers: "+correct+"--------------==")
	}
	if (incorrect >= 10){
	console.log("==----------Incorrect Answers: "+incorrect+"-----------==")
	} else {
	console.log("==----------Incorrect Answers: "+incorrect+"------------==")
	} 
	console.log("==============================================")
}

// This inquirer prompt initiates the flashcard system. The user will be prompted with deciding whether
// they want to use basic flashcards or cloze fashcards for their session. Any answer aside from
// basic or cloze will repeat the question. I also ensured that their answer here would not be case-sensitive.

inquirer.prompt([
	  
	  {
	    type: "input",
	    name: "cardType",
	    message: "Would you like to use the [basic] flashcards or the [cloze] flashcards for this session?",
	    suffix: "\nAnswer:",
	    validate: function(name) {
	    	name = name.toLowerCase();
	    	if (name === "basic" || name === "cloze") {
	    		return true;
	    		} else {
	    			return false;
	    		}
	    	}
	  },

	]).then(function(user) {
	  user.cardType = user.cardType.toLowerCase(); 
	  if (user.cardType === "basic") {
	  	console.log("================================================================================");
	    console.log("Starting basic US Politics Trivia flashcards! Answers are case-sensitive!"+
	    			"\r\n\r\nNote: Full names and correct spelling are required. If the person is referenced"+
	    			"\r\nwith their middle initial, the first letter followed by a period will suffice."+
	    			"\r\nExample: 'Franklin D. Roosevelt' would be a correct answer."+
	    			"\r\n\r\nEnter '^X' at any time to end the game and receive your results up to that point.");
	    console.log("================================================================================");
	    initBasic();
	  	} else {
	    console.log("================================================================================");
	    console.log("Starting cloze US Politics Trivia flashcards! Answers are case-sensitive!"+
	    			"\r\n\r\nNote: Full names and correct spelling are required. If the person is refrenced"+
	    			"\r\nwith their middle initial, the first letter followed by a period will suffice."+
	    			"\r\nExample: 'Franklin D. Roosevelt' would be a correct answer."+
	    			"\r\n\r\nEnter '^X' at any time to end the game and receive your results up to that point.")
	    console.log("================================================================================");
	    initCloze();
	  	}
	 });