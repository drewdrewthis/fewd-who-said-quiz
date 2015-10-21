$( document ).ready(function() {

    var currentElement = "";

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
			console.log($(this).prop("id") + " " + $(this).data("candidate"));
		},
		out: function( event, ui ) {
			$(this).removeClass( "ui-received" );
			console.log("removed");
		}
	});

	$(".candidate-list").children("li")
	.draggable({ 
		start: function( event, ui ) {
			currentElement = $(this).prop('id');
		},
		revert: "invalid", 
		snap: ".ui-widget-header",
		snapMode: "inner",
		snapTolerance: 30
	});
});
