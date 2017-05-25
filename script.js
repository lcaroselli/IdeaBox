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
		`<article> ${newIdeaObject.id}
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
	var ideaToPrepend = newIdea(ideaCard);
	ideaArray.push(ideaCard);
	ideaDiv.prepend(ideaCardOutput(ideaCard));
	storeIdea();
	//Persist the idea's quality as well
}

function upQuality(quality){
	switch (quality) {
		case 'swill':
	  	return 'plausible';
			break;
	  case 'plausible':
	    return 'genius';
			break;
	  case 'genius':
			return 'genius';
			break;
	}
}

function downQuality(quality){
	switch (quality) {
		case 'genius':
			return 'plausible';
			break;
		case 'plausible':
			return 'swill';
			break;
		case 'swill':
			return 'swill';
			break;
	}
}

function filterIdeaCard() {
	// var filteredArray = ideaArray.filter(function(obj) {
	//each thing in search bar evaluate to truthy
	// As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
	// Clearing the search box should restore all the ideas to the list.
	// });
}
// Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < ideaArray.length; i++) {
//         a = ...[i].getElementsByTagName("...")[0];
//         if (object.indexOf(filter -- OBJECT?) > -1) {
//when the indexOf that object is greater than -1 it is a truthy value and it will pass
//             ...[i].style.display = "";
//         } else {
//             ...[i].style.display = "none";
//         }
//     }
//var filteredArray = ideaArray.filter(function(object) {
  //return ideaArray.indexOf(object) > -1
// include search string})
// }

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
	var closestCard = (event.target.closest('article'));
	var closestCardQualityElement = ($(this).siblings('#quality').children('.quality-rating'));
	closestCardQualityElement[0].innerText = downQuality(closestCardQualityElement[0].innerText);
	console.log(closestCardQualityElement[0].innerText);
	var id = event.target.closest('article').id;
	console.log(id);
	});

$('body').on('click', '.upvote-btn', function() {
	var closestCard = (event.target.closest('article'));
	var closestCardQualityElement = ($(this).siblings('#quality').children('.quality-rating'));
	closestCardQualityElement[0].innerText = upQuality(closestCardQualityElement[0].innerText);
	console.log(closestCardQualityElement[0].innerText);
});

//save the quality changes to the localStorage
