var basic = require("./BasicCard.js");
var cloze = require("./ClozeCard.js");
var inquirer = require("inquirer");
var question = 1;
var correct = 0;
var incorrect = 0;

//This function will be referenced once the basic flashcards have been selected and will be called after each
//question has been answered, correctly or incorrectly. 

function basicCards(){
if (question == 1) {
	flashcardquestion = new BasicCard("Who was the first President of the United States?", "George Washington")
	} else if (question == 2) {
	flashcardquestion = new BasicCard("Who was the sixteenth President of the United States?", "Abraham Lincoln")
	} else if (question == 3) {
	flashcardquestion = new BasicCard("Who was a founding father who currently has a celebrated Broadway musical covering his life and works?", "Alexander Hamilton")
	} else if (question == 4) {
	flashcardquestion = new BasicCard("Who was the only President to serve more than two terms?", "Franklin D. Roosevelt")
	} else if (question == 5) {
	flashcardquestion = new BasicCard("Who was the only President to serve two non-consecutive terms?", "Grover Cleveland")
	} else if (question == 6) {
	flashcardquestion = new BasicCard("Who was the oldest person elected President?", "Donald Trump")
	} else if (question == 7) {
	flashcardquestion = new BasicCard("Who was the first President to live in the White House?", "John Adams")
	} else if (question == 8) {
	flashcardquestion = new BasicCard("Who was the first President born outside the contiguous United States?", "Barack Obama")
	} else if (question == 9) {
	flashcardquestion = new BasicCard("Which U.S. President signed the treaty to purchase Alaska from Russia?", "Andrew Johnson")
	} else if (question == 10) {
	flashcardquestion = new BasicCard("Who was the first President to appear on television?", "Franklin D. Roosevelt")
	} 
}

//This function will be referenced once cloze flashcards have been selected and will be called after each
//question has been answered, correctly or incorrectly.

function clozeCards(){
	if (question == 1) {
	flashcardquestion = new ClozeCard("George Washington was the first President of the United States.", "George Washington")
	} else if (question == 2) {
	flashcardquestion = new ClozeCard("Abraham Lincoln was the sixteenth President of the United States.", "Abraham Lincoln")
	} else if (question == 3) {
	flashcardquestion = new ClozeCard("Alexander Hamilton was a founding father who currently has a celebrated Broadway musical covering his life and works.", "Alexander Hamilton")
	} else if (question == 4) {
	flashcardquestion = new ClozeCard("Franklin D. Roosevelt was the only President to serve more than two terms.", "Franklin D. Roosevelt")
	} else if (question == 5) {
	flashcardquestion = new ClozeCard("Grover Cleveland was the only President to serve two non-consecutive terms.", "Grover Cleveland")
	} else if (question == 6) {
	flashcardquestion = new ClozeCard("The oldest person elected President was Donald Trump at 70 years old.", "Donald Trump")
	} else if (question == 7) {
	flashcardquestion = new ClozeCard("John Adams was the first President to live in the White House.", "John Adams")
	} else if (question == 8) {
	flashcardquestion = new ClozeCard("Barack Obama was the first President born outside the contiguous United States.", "Barack Obama")
	} else if (question == 9) {
	flashcardquestion = new ClozeCard("On March 30, 1867, Andrew Johnson signed the treaty to purchase Alaska from Russia.", "Andrew Johnson")
	} else if (question == 10) {
	flashcardquestion = new ClozeCard("Franklin D. Roosevelt was the first President to appear on television.", "Franklin D. Roosevelt")
	}	
}

//The following three functions will reveal the results of an answer. I could have left this at two functions, but 
//I wanted the correct answer to be revealed for both basic and cloze flashcards.

function correctAnswer(){
	correct++;
	if (question == 10) {
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
	if (question == 10) {
	console.log("==============================================");
  console.log("Incorrect! The correct answer was "+flashcardquestion.back+". Unfortunately, that was the last question...");
  console.log("==============================================");	
	} else {
  console.log("==============================================");
  console.log("Incorrect! The correct answer was "+flashcardquestion.back+". Let's move on.");
  console.log("==============================================");
  };
}

function incorrectAnswerCloze(){
	incorrect++;
	if (question == 10) {
	console.log("==============================================");
  console.log("Incorrect! The correct answer was "+flashcardquestion.cloze+". Unfortunately, that was the last question...");
  console.log("==============================================");	
	} else {
  console.log("==============================================");
  console.log("Incorrect! The correct answer was "+flashcardquestion.cloze+". Let's move on.");
  console.log("==============================================");
  };
}

//This inquirer function handles the basic flashcard questions. The user will be presented by a question that they
//will answer. Correct and incorrect answers tally up for the result screen at the end.

function startBasic(){

basicCards();

if (question <= 10) {

	inquirer.prompt([
	  
	  {
	    type: "input",
	    name: "answer",
	    message: question+". "+flashcardquestion.front,
	    suffix: "\nAnswer:"
	  },

	]).then(function(user) {

	  if (user.answer === flashcardquestion.back) {
	 	correctAnswer(); 	
	  } else {
	  incorrectAnswerBasic();
		}
		question++;
		startBasic(); 
		}) 
	} else {
		end();
	}
};

// This inquirer function provides the user with a series of questions where the answer is blocked out.
// It otherwise functions identically to the basic flashcard function.

function startCloze(){

clozeCards();

if (question <= 10) {

	inquirer.prompt([
	  
	  {
	    type: "input",
	    name: "answer",
	    message: question+". "+flashcardquestion.partial,
	    suffix: "\nAnswer:"
	  },

	]).then(function(user) {

	  if (user.answer === flashcardquestion.cloze) {
	  	correctAnswer();
	  } else {
	  	incorrectAnswerCloze();
		}
		question++;
		startCloze(); 
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
// basic or cloze will repeat the question.

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
	  	console.log("==============================================");
	    console.log("Starting basic US Politics Trivia flashcards!");
	    console.log("==============================================");
	    startBasic();
	  	} else {
	    console.log("==============================================");
	    console.log("Starting cloze US Politics Trivia flashcards!");
	    console.log("==============================================");
	    startCloze();
	  	}
	 });