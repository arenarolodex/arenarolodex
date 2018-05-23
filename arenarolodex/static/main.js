$(function() {
	//Display the news

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			$('#instructions').after(this.responseText);
		}
	};
	xhttp.open("GET", "https://gist.githubusercontent.com/epixtallion/55ea460b3ba4c911b1e6e82304305a1f/raw", true);
	xhttp.send();

	for (var i = 1; i <= 8; i++){
		var choice = "<div>" +
	                "<select id=\"category" + i + "\">" +
	                    "<option selected value=\"base\">Please Select</option>" +
	                    "<option value=\"math\">Math/CS</option>" +
	                    "<option value=\"english\">English</option>" +
	                    "<option value=\"science\">Science</option>" +
	                    "<option value=\"history\">History/Social Studies</option>" +
	                    "<option value=\"vpa\">VPAs</option>" +
	                    "<option value=\"language\">World Language</option>" +
	                    "<option value=\"pe\">PE/Sports</option>" +
	                    "<option value=\"others\">Other</option>" +
	                    "<option value=\"snacks\">Snacks</option>" +
	                    "</select>" +
	                "<br>" +
	                "<label>Choose a class from the list:" +
	                    "<select id=\"block" + i + "\" name=\"block" + i + "\"></select></label>" +
	                "<label>Preferred teacher?" +
	                    "<select id=\"teach" + i + "\" name=\"teach" + i + "\"></select></label>" +
	                "<label>Preferred block?" +
	                    "<select id=\"pref" + i + "\" name=\"pref" + i + "\"></select></label>" +
	                "<br>" +
	            "</div>";
		$('form').prepend(choice);
		$('#block' + i).append("<option selected value=\"\">Choose a course...</option>");
		$('#teach' + i).append("<option selected value=\"\">Choose a teacher...</option>");
		$('#pref' + i).append("<option selected value=\"\">Choose a block...</option>");
	}


	var i;
	for (i = 1; i <= 8; i++){
		$("#category" + i).on("change", { value: i }, function(event) {

			var $dropdown = $(this);

			$.getJSON("/options.json", function(data) {

				var key = $dropdown.val();
				var vals = [];
				var courses = {};
				Object.keys(data).forEach(function(dept){
					courses[dept] = [];
					for (var course of data[dept]){
						courses[dept].push(course.name);
					}
				});

				if (key == 'base')
						vals = ['Please choose from above'];
				else
					vals = courses[key]

				$("#block"+event.data.value).empty();
				console.log("Emptied block data from #block"+event.data.value);
				console.log(event.data.value);
				$("#block"+event.data.value).append("<option selected value=\"base\">Please select</option>");
				$.each(vals, function(index, value) {
					$("#block"+event.data.value).append("<option value=\"" + value + "\">"+value+"</option>");
				});
			});
		});

		$("#block" + i).on("change", { value: i }, function(event) {
			console.log("Switched " + $(this).val());

			var $dropdown = $(this);

			$.getJSON("/options.json", function(data) {

				var key = $dropdown.val();
				var vals = [];

				for (var obj of data[$("#category"+event.data.value).val()]){
					if (obj.name == $dropdown.val())
						for (teach of obj.teachers){
							vals.push(teach.name);
						}
				}

				console.log("Emptied teachdata");
				$("#teach"+event.data.value).empty();
				$("#teach"+event.data.value).append("<option selected value=\"base\">Please select</option>");
				$.each(vals, function(index, value) {
					$("#teach"+event.data.value).append("<option value=\"" + value + "\">"+value+"</option>");
				});
			});
		});

		$("#teach" + i).on("change", { value: i }, function(event) {
			console.log("Switched " + $(this).val());

			var $dropdown = $(this);

			$.getJSON("/options.json", function(data) {

				var key = $dropdown.val();
				var vals = [];

				for (var obj of data[$("#category"+event.data.value).val()]){
					if (obj.name == $("#block"+event.data.value).val())
						for (teach of obj.teachers){
							if (teach.name == $("#teach"+event.data.value).val())
								vals = teach.blocks;
						}
				}

				console.log("Emptied blockdata");
				$("#pref"+event.data.value).empty();
				$("#pref"+event.data.value).append("<option selected value=\"base\">Please select</option>");
				$.each(vals, function(index, value) {
					$("#pref"+event.data.value).append("<option value=\"" + value + "\">"+value+"</option>");
				});
			});
		});
	}

	console.log("testing 123");
});
