$(function() {
	var choices = ["#one-choice", "#two-choice", "#three-choice",
								"#four-choice", "#five-choice", "#six-choice",
							  "#seven-choice", "#eight-choice"];

	for (var i = 0; i<8; i++){
		$(choices[i]).change(function() {

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

				$(choices[i]).empty();
				$.each(vals, function(index, value) {
					$(choices[i]).append("<option value=\"" + value + "\"></option>");
				});

			});
		});
	}

	console.log("testing 123");
});
