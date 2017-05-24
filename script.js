//Global Variables
var ideaCopy = $('.body');
var ideaHeader = $('.title');
var saveBtn = $('.save');
var ideaList = $('.card-box');
var ideaDiv = $('.idea-card');

var ideaArray =[];


//Functions
//Document ready state
$(document).ready(function() {
	loadIdeas();
});

function storeIdea() {
	localStorage.setItem('ideaBoxArray', JSON.stringify(ideaArray));
}

function loadIdeas() {
	ideaArray = JSON.parse(localStorage.getItem('ideaBoxArray')) || [];
		for (var i = 0; i < ideaArray.length; i++) {  //Refactor into foreach
			ideaCardOutput(ideaArray[i]);
		}
};


//Constructor Function
	function newIdea(title, body) {
		this.title = title;
		this.body = body;
		this.id = Math.floor(Math.random() * 999999);
		this.quality = 'swill';
	}

	function ideaCardOutput (newIdeaObject) {
		$('.idea-card').prepend (
			`<h3> ${newIdeaObject.title} </h3>
	  	<img class="delete-btn" height="20px" width="20px">
	  	<p class="body-text"> ${newIdeaObject.body}</p>
	  	<img class="upvote-btn" height="20px" width="20px">
	  	<img class="downvote-btn" height="20px" width="20px">
	  	<p id="quality">quality: <span class="quality-rating"> ${newIdeaObject.quality} </span></p>
	  	<hr>`);
		addClassStyling('p', "body-text");
}

	function addClassStyling (element, className) {
		$('element').addClass("className");
	}

	function saveIdeaCard() {
		var ideaCard = new newIdea(ideaHeader.val(), ideaCopy.val());
	  var ideaToPrepend = newIdea(ideaCard);
		ideaArray.push(ideaCard);
	  ideaDiv.prepend(ideaCardOutput(ideaCard));
		storeIdea();
		//Persist the idea's quality as well
		//text fields cleared after saving idea
	}

	function upQuality(quality){
		switch (quality) {
	   	case 'swill':
	   		return 'plausible';
	   	case 'plausible':
	      return 'genius';
	    case 'genius':
				return 'genius';
			}
		}

	function downQuality(quality){
		switch (quality) {
			case 'genius':
				return 'plausible';
			case 'plausible':
				return 'swill';
			case 'swill':
				return 'TESTING';
		}
	}

	// function ...(){
		//Target a specific object instance on our array
		//Capture the span element on that specific object instance
			//<p id="quality">quality: <span class="quality-rating"> ${newIdeaObject.quality} </span></p>
		//Target the text of that span
		//Update the text of that span to change according to the downvote/upvote sequence
		//save the quality changes to the DOM and to the localStorage
	// }

	//Tyler
	function deleteIdeaCard() {
		//need to target the specific Id of the card and delete that card upon clicking the 'x' btn
		//remove from DOM
		//remove from local storage
	}

	//Me
	function filterIdeaCard() {
		//filter array method
		//As user types in search box, the list should filter in real time to ideas whose title or body include user's text; Clearing search box should restore all ideas to field
	}

function resetForm() {
	$('.title').val('');
	$('.body').val('');
	$('.title').focus();
}

//Events
$('.save').on('click', function () {
	saveIdeaCard();
	event.preventDefault();
	resetForm();
});

$('body').on('click', '.delete-btn', function() {
		console.log('delete');
	});

$('body').on('click', '.downvote-btn', function() {
		var objectQuality = $();
		downQuality(objectQuality);
		console.log(objectQuality);
		console.log('downvote');
	});

$('body').on('click', '.upvote-btn', function() {
		var objectQuality = $(ideaArray[quality]);
		upQuality (objectQuality);
		console.log('upvote');
	});

//Tyler
//Click event --> click text fields on card, target that text to edit; when user clicks title or body, text should become an editable field pre-populated with existing text; changes saved by clicking outside of text field or pressing enter/return key; edits reflected in storage
