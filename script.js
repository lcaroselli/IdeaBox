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
	ideaArray.forEach(function (object, index) {
		ideaCardOutput(ideaArray[index]);
	});
}


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
			<h3 contenteditable> ${newIdeaObject.title} </h3>
			<button class="delete-btn"></button>
		  <p id="body" class="body-text" contenteditable> ${newIdeaObject.body}</p>
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

function resetForm() {
	$('.title').val('');
	$('.body').val('');
	$('.title').focus();
}


//Events
$('.search').on('keyup', function() {
	var search = $(this).val().toLowerCase();
	var myFilteredArray = ideaArray.filter(function(ideaObject) {
		return ideaObject.body.toLowerCase().includes(search) || ideaObject.title.toLowerCase().includes(search);
		})
	$('.idea-card').empty();
	myFilteredArray.forEach(function (object, index) {
		ideaCardOutput(myFilteredArray[index]);
	}
);
});

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
	var id = event.target.closest('article').id;
	for (var i = 0; i < ideaArray.length; i++) {
		if(ideaArray[i].id == id){
			ideaArray[i].quality = closestCardQualityElement[0].innerText;
		}
	}
	storeIdea();
	});

$('body').on('click', '.upvote-btn', function() {
	var closestCard = (event.target.closest('article'));
	var closestCardQualityElement = ($(this).siblings('#quality').children('.quality-rating'));
	closestCardQualityElement[0].innerText = upQuality(closestCardQualityElement[0].innerText);
	var id = event.target.closest('article').id;
	for (var i = 0; i < ideaArray.length; i++) {
		if(ideaArray[i].id == id){
			ideaArray[i].quality = closestCardQualityElement[0].innerText;
		}
	}
	storeIdea();
});

$('body').on('blur', 'h3', function(e) {
	var id = e.target.closest('article').id;
	for (var i = 0; i < ideaArray.length; i++) {
		if(ideaArray[i].id == id){
			console.log(e.target.innerText);
			ideaArray[i].title = e.target.innerText;
		}
	}
	storeIdea();
});

$('body').on('blur', '#body', function(e) {
	var id = e.target.closest('article').id;
	for (var i = 0; i < ideaArray.length; i++) {
		if(ideaArray[i].id == id){
			console.log(e.target.innerText);
			ideaArray[i].body = e.target.innerText;
		}
	}
	storeIdea();
});
