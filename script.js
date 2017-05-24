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
		`<article>
			<h3> ${newIdeaObject.title} </h3>
		  <img class="delete-btn" height="20px" width="20px">
		  <p class="body-text"> ${newIdeaObject.body}</p>
		  <img class="upvote-btn" height="20px" width="20px">
		  <img class="downvote-btn" height="20px" width="20px">
		  <p id="quality">quality: <span class="quality-rating"> ${newIdeaObject.quality} </span></p>
		  <hr>
		</article>`);
	addClassStyling('p', "body-text");
}

function addClassStyling (element, className) {
	$('element').addClass("className");
}


	function saveIdeaCard() {
		var ideaCard = new newIdea(ideaHeader.val(), ideaCopy.val());

	  //Save array items to local storage
	  var ideasJson = JSON.stringify(ideaArray);
	  localStorage.setItem('ideas', ideasJson);

	  var ideaToPrepend = newIdea(ideaCard);
		ideaArray.push(ideaCard);
	  ideaDiv.prepend(ideaCardOutput(ideaCard));
	}


//Events
$('.save').on('click', saveIdeaCard);
$('.delete-btn .delete-btn:hover').on('click', console.log('nice'));
