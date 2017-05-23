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
	var deleteBtnNode = `<img src="images/delete.svg" class="delete-btn" alt="Delete Button">`
  var ideaCopyNode = `<p> ${ideaCard.body} </p>`
	// var ideaQualityNode = `<p> ${ideaCard.quality} </p>`
	var ideaHrNode = `<hr>`

	$(function(){
		$("p:first").addClass("body-text");
	});

  ideaDiv.prepend(ideaHeaderNode, deleteBtnNode, ideaCopyNode, /*ideaQualityNode,*/ ideaHrNode);
  ideaArray.push(ideaCard);
})
