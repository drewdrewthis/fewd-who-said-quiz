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
    	qNum = 0;

    function start() {
    	$('.question-placeholder').text(q[qNum].question);	
    	var thisRoundScore = 0;
    };

    function checkAns() {

    	for(var candidate in q[qNum]) {
    		if(q[qNum].candidate.userAns == "Correct") {
    			thisRoundScore += 25;
    		}
    	}

    	alert('Your score is ' + thisRoundScore)
    }

    function roundOver(){
    	$('.proceed-dialog, .overlay').show();

    	

    	$('#bernieAns').text(q[0].bernie.answer);
    	$('#hilaryAns').text(q[0].hilary.answer);
    	$('#trumpAns').text(q[0].trump.answer);
    	$('#cruzAns').text(q[0].cruz.answer);

    	console.log(q[qNum]);

    	checkAns();
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
