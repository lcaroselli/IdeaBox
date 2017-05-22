//Global Variables
var ideaCopy = $('.body');
var ideaHeader = $('.title');
var ideaList = $('.card-box');
var ideaArray =[];
var ideaDiv = $('.idea-card');


//Functions
//Constructor Function
	function newIdea(title, body) {
		this.id=Math.floor(Math.random() * 999999);
		this.title=title;
		this.body=body;
		// this.quality=quality;
	}


//Events
$('.save').on('click', function(){
  var ideaCard = new newIdea(ideaHeader.val(), ideaCopy.val());
  var ideaHeaderNode = `<h3> ${ideaCard.title} </h3>`
  var ideaCopyNode = `<p> ${ideaCard.body} </p>`
  ideaDiv.prepend(ideaHeaderNode, ideaCopyNode);
  ideaArray.push(ideaCard);
})
