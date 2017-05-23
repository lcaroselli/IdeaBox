//Global Variables
var ideaCopy = $('.body'); //body input
var ideaHeader = $('.title'); //header input
var saveBtn = $('.save'); //save button
var ideaList = $('.card-box'); //section holding our idea cards
var ideaDiv = $('.idea-card'); //article area for card info

var ideaArray =[]; //our empty array to hold our idea objects



//Functions
//Constructor Function
	function newIdea(title, body) {
		this.title=title;
		this.body=body;
		this.id=Math.floor(Math.random() * 999999);
	}


	function ideaCardOutput (newIdeaObject) {
		var newArticle = document.createElement('article');
  		newArticle.innerHTML =
				`<h3> ${newIdeaObject.title} </h3>
	  		<img class="delete-btn" height="20px" width="20px">
	  		<p class="body-text"> ${newIdeaObject.body}</p>
	  		<img class="upvote-btn" height="20px" width="20px">
	  		<img class="downvote-btn" height="20px" width="20px">
	  		<p id="quality">quality: <span class="quality-rating"> ${newIdeaObject.quality} </span></p>
	  		<hr>`;

  		return newArticle;

		addClassStyling('p', "body-text");
}


	function addClassStyling (element, className) {
		$('element').addClass("className");
	}


	function saveIdeaCard() {
		var ideaCard = new newIdea(ideaHeader.val(), ideaCopy.val());

	  //Save array items to local storage
	  	// var ideasJson = JSON.stringify(ideaArray);
	  	// localStorage.setItem('ideas', ideasJson);

	  var ideaToPrepend = newIdea(ideaCard);
		ideaArray.push(ideaCard);
	  ideaDiv.prepend(ideaCardOutput(ideaCard));
	}



//Events
$('.save').on('click', saveIdeaCard);
