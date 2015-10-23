$( document ).ready(function() {

    var currentElement = "",
    	qNum = 0,
    	thisRoundScore = 0,
    	totalScore = 0,
    	highScore = 0,
    	q = [];

    function buildProgbar(q) {
    	for(var i = 0; i < q.length; i++) {
    		$('.prog-bar ul').append('<li id="number' +(i+1)+'"></li>');
    	};
    };
    
    function addHandlers() {
	    $(".no-list, .yes-list").children("li:not(.title)")
		// Why does this class need to be hard coded into the html file?
		// If it's not, the element isn't snappable.
		//.addClass('.ui-widget-header')
		.droppable({

			activeClass: "ui-state-default",
			hoverClass: "ui-state-hover",
			drop: function( event, ui ) {
				$( this ).addClass( "ui-received" )
					.data("candidate",currentElement);
					console.log($(this).prop("id") + " : " + $(this).data("candidate"));

					var candidate = eval("q[qNum]." + currentElement);
					
					if( ($(this).hasClass('yes') && (candidate.support == true)) || 
						($(this).hasClass('no') && (candidate.support == false)) ) 
					{
						candidate.userAns = "Correct";
					}
					else {
						candidate.userAns = "Incorrect";
					}
				},
			out: function( event, ui ) {
				$(this).removeClass( "ui-received" )
					.data("candidate", null);
					console.log("removed");
			}
		});

		$(".candidate-list").children("li")
		.draggable({ 
			start: function( event, ui ) {
				currentElement = $(this).prop('id');
				$(this).addClass('smallercircle');
			},
			stop: function( event, ui ) {
				checkRoundOver();
			},
			revert: "invalid", 
			snap: ".ui-widget-header",
			snapMode: "inner",
			snapTolerance: 30
		});

		$('#next-btn').on('click', function() {
			next();
		});

		$('.reset').on('click', function() {
			reset();
		});
	};

    function start() {

    	$('#number'+(qNum)).toggleClass('active');
    	$('#number'+(qNum+1)).toggleClass('active').addClass('visited');
    	$('.question-placeholder').text(q[qNum].question);	
    	// Clone DOM to reset on next round
    	$(document).data('body', $('.main').clone(true,true));
    	addHandlers();
    	$('.score').text(thisRoundScore);
    };

    function gameOver(){
    	console.log("Game Over");
    	$('.proceed-dialog ul').remove();
    	$('.proceed-dialog h2').text("Game Over!");
    	$('.proceed-dialog h3').text('Your score is');
    	$('.proceed-dialog').append('<h1>'+totalScore+'</h1>');
    	$('.proceed-dialog #next-btn').hide();
    	$('.proceed-dialog .reset').show();
    }

    // I thought this would let me run it in the console, but it doesn't. Why?
    var checkAns = function() {

    	var answer = "";

    	for(var candidate in q[qNum]) {

    		answer = eval("q[qNum]." + candidate + ".userAns");

    		if(answer == "Correct") {
    			thisRoundScore += 25;
    		}
    	}

    	$('.roundPoints').text(thisRoundScore);

    	
    }

    function roundOver(){
    	$('.proceed-dialog, .overlay').show();

    	$('#bernieAns').text(q[qNum].bernie.answer);
    	$('#hilaryAns').text(q[qNum].hilary.answer);
    	$('#trumpAns').text(q[qNum].trump.answer);
    	$('#cruzAns').text(q[qNum].cruz.answer);
    	$('#userBernieAns').text(q[qNum].bernie.userAns).addClass(q[qNum].bernie.userAns);
    	$('#userHilaryAns').text(q[qNum].hilary.userAns).addClass(q[qNum].hilary.userAns);
    	$('#userTrumpAns').text(q[qNum].trump.userAns).addClass(q[qNum].trump.userAns);
    	$('#userCruzAns').text(q[qNum].cruz.userAns).addClass(q[qNum].cruz.userAns);

    	console.log(q[qNum]);

    	checkAns();

    	totalScore += thisRoundScore;

    	$('.score').text(totalScore);
    }

    function checkRoundOver(){
    	var placed = 0;
    	$('.ui-widget-header').each( function( index, element ) {
    		
    		if($(this).data('candidate')){
    			//console.log($(this).prop('id') + " has " + $(this).data('candidate'));
    			placed++;
    			if(placed == 4) {
    				roundOver();
    			}
    		}
    	});
    	console.log(placed + " candidates placed");
    }

    function next() {

    	qNum++;

    	if(qNum == (q.length)){
    		gameOver();

    		return "Game Over";
    	}
    	else {
    		// Replace saved DOM - DOESN'T work!! Why?
    		$(document).data('body').replaceAll('.main');
    		$('.overlay').hide();

    		//$('.candidate').remove();
    		start();
    	}
    }

    function reset(){
    	qNum = 0,
        thisRoundScore = 0;

    	if(totalScore > highScore) {
    		highScore = totalScore;
    		$('.highscore').text(highScore);
    	};
    	thisRoundScore = 0;
    	totalScore = 0;
    	$('.visited').removeClass('visited');
		$(document).data('body').replaceAll('.main');
		$('.overlay').hide();
    	start();
    };

	// Initializes JSON file.
	$.getJSON( "js/data.json", function(data) {
	  	console.log("JSON Retrieved");
	  	console.log(data);
	  	q = data;
	})
	.done(function(){
		buildProgbar(q);
		start();
	})
	.fail(function() {
		console.log("JSON Failed");
	});
});
