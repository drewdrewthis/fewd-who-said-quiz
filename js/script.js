$( document ).ready(function() {

    var currentElement = "";

    function checkRoundOver(){
    	var placed = 0;
    	$('.ui-widget-header').each( function( index, element ) {
    		
    		if($(this).data('candidate')){
    			console.log($(this).prop('id') + " has " + $(this).data('candidate'));
    			placed++;
    			console.log("placed =" + placed);

    			if(placed == 4) {
    				alert("Round over");
    			}
    		}
    	});
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
});
