$("#first-choice").change(function() {

	var $dropdown = $(this);

	$.getJSON("jsondata/data.json", function(data) {
	
		var key = $dropdown.val();
		var vals = [];
							
		switch(key) {
			case 'beverages':
				vals = data.beverages.split(",");
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