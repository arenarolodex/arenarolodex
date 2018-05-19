var choices = ["#one-choice", "#two-choice", "#three-choice", "#four-choice",
							"#five-choice", "#six-choice", "#seven-choice", "#eight-choice"];

var classdata = ["#first-choice", "#second-choice","#third-choice", "#fourth-choice",
							"#fifth-choice", "#sixth-choice", "#seventh-choice", "#eighth-choice"];
var teachdata = ["#first-teach", "#second-teach", "#third-teach", "#fourth-teach",
							"#fifth-teach", "#sixth-teach", "#seventh-teach", "#eighth-teach"]

var blocks = ["#block1", "#block2", "#block3", "#block4", "#block5", "#block6", "#block7", "#block8"]


$(function() {

	var i;
	for (i = 0; i<8; i++){
		$(choices[i]).on("change", { value: i }, function(event) {

			var $dropdown = $(this);

			$.getJSON("/options.json", function(data) {

				var key = $dropdown.val();
				var vals = [];

				switch(key) {
					case 'math':
						vals = data.math;
						break;
					case 'english':
						vals = data.english;
						break;
					case 'science':
						vals = data.science;
						break;
					case 'history':
						vals = data.history;
						break;
					case 'vpa':
						vals = data.vpa;
						break;
					case 'language':
						vals = data.language;
						break;
					case 'pe':
						vals = data.pe;
						break;
					case 'others':
						vals = data.others;
						break;
					case 'snacks':
						vals = data.snacks;
						break;
					case 'base':
						vals = ['Please choose from above'];
				}

				$(classdata[event.data.value]).empty();
				console.log("Emptied " + classdata[event.data.value] + " from " + choices[event.data.value]);
				console.log(event.data.value);
				$.each(vals, function(index, value) {
					$(classdata[event.data.value]).append("<option value=\"" + value + "\"></option>");
				});


				$(blocks[event.data.value]).empty();
				console.log(event.data.value);
				$.each(vals, function(index, value) {
					$(blocks[event.data.value]).attr("pattern", value);
				});
			});
		});
	}


	console.log("testing 123");
});
