$( document ).ready(function() {

    var q = [
    	{ 	question : "Should abortion be a woman's unresricted right?",
    		bernie : { 
    			support : true, 
    			answer : "does think abortion should be a woman's unrestricted right."
    		},
    		hilary : { 
    			support : true, 
    			answer : "does think abortion should be a woman's unrestricted right."
    		},
    		trump : { 
    			support : false, 
    			answer : "thinks abortion should NOT be a woman's unrestricted right."
    		},
    		cruz : { 
    			support : false, 
    			answer : "thinks abortion should NOT be a woman's unrestricted right."
    		},
    	},
    	{ 	question : "This is question 2!",
    		bernie : "Yes",
    		hilary : "Yes",
    		trump : "No",
    		cruz : "No"
    	}
    ];

    var currentElement = "",
    	qNum = 0,
    	thisRoundScore = 0,
    	totalScore = 0;

    function start() {
    	$('.question-placeholder').text(q[qNum].question);	
    };

    // I thought this would let me run it in the console, but it doesn't. Why?
    var checkAns = function() {

    	var answer = "";

    	for(var candidate in q[qNum]) {

    		answer = eval("q[qNum]." + candidate + ".userAns");

    		if(answer == "Correct") {
    			thisRoundScore += 25;
    		}
    	}

    	alert('Your score is ' + thisRoundScore)
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


	start();
	
});
