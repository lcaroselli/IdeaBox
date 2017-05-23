//Global Variables
var ideaCopy = $('.body'); //body input
var ideaHeader = $('.title'); //header input
var saveBtn = $('.save'); //save button
var ideaList = $('.card-box'); //section holding our ideas
var ideaDiv = $('.idea-card'); //article area for card info

var ideaArray =[]; //our empty array to hold our idea objects; we should make it so it fetches what's already in our local storage first



//Functions
//Constructor Function
	function newIdea(title, body) {
		this.title=title;
		this.body=body;
		this.id=Math.floor(Math.random() * 999999);
		this.quality='swill';
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

	  //Save array to local
		//Persist the idea's quality as well

	  var ideaToPrepend = newIdea(ideaCard);
		ideaArray.push(ideaCard);
	  ideaDiv.prepend(ideaCardOutput(ideaCard));

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

		//Tie the Quality value to unique ID of each card
		//Swill ++ -> plausible
		//Plausible ++ -> Genius
		//Genius ++ -> No effect
		//Genius -- -> plausible
		//Plausible -- -> swill
		//Swill -- -> No effect
		//Inner text of swill to change upon increment


	function deleteIdeaCard() {
		//need to target the specific Id of the card and delete that card upon clicking the 'x' btn
		//remove from DOM
		//remove from local storage
	}

	function filterIdeaCard() {
		//filter array method
		//As user types in search box, the list should filter in real time to ideas whose title or body include user's text; Clearing search box should restore all ideas to field
	}

	function fetchStorageItems() {
	// 	local storage to parse, to map
	// 	push those items into array on page loadd
	}



//Events
$('.save').on('click', saveIdeaCard);
$('body').on('click', '.delete-btn', function() {
		console.log('delete')
	});
$('body').on('click', '.downvote-btn', function() {
		console.log('downvote')
	});
$('body').on('click', '.upvote-btn', function() {
		console.log('upvote')
	});
//Click event --> click text fields on card, target that text to edit; when user clicks title or body, text should become an editable field pre-populated with existing text; changes saved by clicking outside of text field or pressing enter/return key; edits reflected in storage
