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
	this.id = Date.now();
	this.quality = 'swill';
}

function ideaCardOutput (newIdeaObject) {
	$('.idea-card').prepend (
		`<article id="${newIdeaObject.id}">
			<h3> ${newIdeaObject.title} </h3>
			<button class="delete-btn"></button>
		  <p class="body-text"> ${newIdeaObject.body}</p>
		  <img class="upvote-btn" height="20px" width="20px">
		  <img class="downvote-btn" height="20px" width="20px">
		  <p id="quality" class="body-text">quality: <span class="quality-rating"> ${newIdeaObject.quality} </span></p>
		  <hr>
		</article>`
	);
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
			return 'TEST';
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
	var closestCard = (event.target.closest('article'));
	var id = event.target.closest('article').id
	for (var i = 0; i < ideaArray.length; i++) {
		if(ideaArray[i].id == id){
			ideaArray.splice(i, 1)
		}
	}
	storeIdea()
	closestCard.remove()
});

$('body').on('click', '.downvote-btn', function() {
	var closestCard = (event.target.closest('article'));
	var closestCardQualityElement = ($(this).siblings('#quality').children('.quality-rating'));
	closestCardQualityElement[0].innerText = downQuality(closestCardQualityElement[0].innerText);
	console.log(closestCardQualityElement[0].innerText);
	});


$('body').on('click', '.upvote-btn', function() {
	ideaArray.forEach(function(object, index, array) {
		console.log(object.id);
		console.log(object.quality);
		object.quality = upQuality(object.quality);
		$('.quality-rating').text(object.quality);
	});
});


//foreach object in our array, grab the id a
//Target the value (text) of that property
//Change the value (text) of that property according to the downvote/upvote sequence
//save the quality changes to the DOM and to the localStorage
//
