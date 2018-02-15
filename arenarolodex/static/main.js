$(function() {

	$("#one-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $firstChoice = $("#first-choice");
			$firstChoice.empty();
			$.each(vals, function(index, value) {
				$firstChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});

	$("#two-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
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
				$secondChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});

	$("#three-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $thirdChoice = $("#third-choice");
			$thirdChoice.empty();
			$.each(vals, function(index, value) {
				$thirdChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});

	$("#four-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $fourthChoice = $("#fourth-choice");
			$fourthChoice.empty();
			$.each(vals, function(index, value) {
				$fourthChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});

	$("#five-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $fifthChoice = $("#fifth-choice");
			$fifthChoice.empty();
			$.each(vals, function(index, value) {
				$fifthChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});

	$("#six-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $sixthChoice = $("#sixth-choice");
			$sixthChoice.empty();
			$.each(vals, function(index, value) {
				$sixthChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});

	$("#seven-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $seventhChoice = $("#seventh-choice");
			$seventhChoice.empty();
			$.each(vals, function(index, value) {
				$seventhChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});
	
	$("#eight-choice").change(function() {

		var $dropdown = $(this);
	
		$.getJSON("/static/options.json", function(data) {
		
			var key = $dropdown.val();
			var vals = [];
								
			switch(key) {
				case 'math':
					vals = data.math.split(",");
					break;
				case 'english':
					vals = data.english.split(",");
					break;
				case 'science':
					vals = data.science.split(",");
					break;
				case 'history':
					vals = data.history.split(",");
					break;
				case 'vpa':
					vals = data.vpa.split(",");
					break;
				case 'language':
					vals = data.language.split(",");
					break;
				case 'pe':
					vals = data.pe.split(",");
					break;
				case 'others':
					vals = data.others.split(",");
					break;
				case 'snacks':
					vals = data.snacks.split(",");
					break;
				case 'base':
					vals = ['Please choose from above'];
			}
			
			var $eighthChoice = $("#eighth-choice");
			$eighthChoice.empty();
			$.each(vals, function(index, value) {
				$eighthChoice.append("<option value=\"" + value + "\"></option>");
			});
	
		});
	});


	console.log("testing 123");
});


