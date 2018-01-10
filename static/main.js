$(function() {

	$("#first-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $secondChoice = $("#second-choice");
			$secondChoice.empty();
			$.each(vals, function(index, value) {
				$secondChoice.append("<option>" + value + "</option>");
			});
	
		});
	});
	console.log("testing 123");
});


