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
			return 'swill';
	}
}

function filterIdeaCard() {
	// var filteredArray = ideaArray.filter(function(obj) {
	// As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
	// Clearing the search box should restore all the ideas to the list.
	// });
}
// Loop through all list items, and hide those who don't match the search query
//     for (i = 0; i < ideaArray.length; i++) {
//         a = ...[i].getElementsByTagName("...")[0];
//         if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//             ...[i].style.display = "";
//         } else {
//             ...[i].style.display = "none";
//         }
//     }
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
	ideaArray.forEach(function(object, index, array) {
		var qualityText = $('.quality-rating')
		console.log(object.quality);
		object.quality = downQuality(object.quality);
		qualityText.innerText = downQuality(object.quality);
	});
});


$('body').on('click', '.upvote-btn', function() {
	ideaArray.forEach(function(object, index, array) {
		var qualityText = $('.quality-rating')
		console.log(object.quality);
		object.quality = upQuality(object.quality);
		qualityText.innerText = upQuality(object.quality);
	});
});


//foreach object in our array, grab the id a
//Target the value (text) of that property
//Change the value (text) of that property according to the downvote/upvote sequence
//save the quality changes to the DOM and to the localStorage
//
