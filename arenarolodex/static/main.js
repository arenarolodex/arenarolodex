var choices = ["#one-choice", "#two-choice", "#three-choice", "#four-choice",
							"#five-choice", "#six-choice", "#seven-choice", "#eight-choice"];
var choices2 = ["#first-choice-select", "#second-choice-select","#third-choice-select", "#fourth-choice-select",
							"#fifth-choice-select", "#sixth-choice-select", "#seventh-choice-select", "#eighth-choice-select"];
var choices3 = ["#teach1","#teach2","#teach3","#teach4","#teach5","#teach6","#teach7","#teach8"];

var classdata = ["#first-choice", "#second-choice","#third-choice", "#fourth-choice",
							"#fifth-choice", "#sixth-choice", "#seventh-choice", "#eighth-choice"];
var teachdata = ["#first-teach", "#second-teach", "#third-teach", "#fourth-teach",
							"#fifth-teach", "#sixth-teach", "#seventh-teach", "#eighth-teach"]
var blockdata = ["#first-pref", "#second-pref", "#third-pref", "#fourth-pref",
							"#fifth-pref", "#sixth-pref", "#seventh-pref", "#eighth-pref"]


$(function() {

	var i;
	for (i = 0; i<8; i++){
		$(choices[i]).on("change", { value: i }, function(event) {

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

				$(classdata[event.data.value]).empty();
				console.log("Emptied " + classdata[event.data.value] + " from " + choices[event.data.value]);
				console.log(event.data.value);
				$.each(vals, function(index, value) {
					$(classdata[event.data.value]).append("<option value=\"" + value + "\"></option>");
				});
			});
		});
	}

	for (i = 0; i<8; i++){
		$(choices2[i]).on("change", { value: i }, function(event) {
			console.log("Switched "+$(this).val());

			var $dropdown = $(this);

			$.getJSON("/options.json", function(data) {

				var key = $dropdown.val();
				var vals = [];

				for (var obj of data[$(choices[event.data.value]).val()]){
					if (obj.name == $dropdown.val())
						for (teach of obj.teachers){
							vals.push(teach.name);
						}
				}

				console.log("Emptied teachdata");
				$(teachdata[event.data.value]).empty();
				$.each(vals, function(index, value) {
					$(teachdata[event.data.value]).append("<option value=\"" + value + "\"></option>");
				});
			});
		});
	}

	for (i = 0; i<8; i++){
		$(choices3[i]).on("change", { value: i }, function(event) {
			console.log("Switched "+$(this).val());

			var $dropdown = $(this);

			$.getJSON("/options.json", function(data) {

				var key = $dropdown.val();
				var vals = [];

				for (var obj of data[$(choices[event.data.value]).val()]){
					if (obj.name == $(choices2[event.data.value]).val())
						for (teach of obj.teachers){
							if (teach.name == $(choices3[event.data.value]).val())
								vals = teach.blocks;
						}
				}

				console.log("Emptied blockdata");
				$(blockdata[event.data.value]).empty();
				$.each(vals, function(index, value) {
					$(blockdata[event.data.value]).append("<option value=\"" + value + "\"></option>");
				});
			});
		});
	}

	console.log("testing 123");
});
