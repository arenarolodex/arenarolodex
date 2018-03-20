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

				$(choices[i]).empty();
				$.each(vals, function(index, value) {
					$(choices[i]).append("<option value=\"" + value + "\"></option>");
				});

			});
		});
	}

	console.log("testing 123");
});
