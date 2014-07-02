var options = {
	keys: {
		SPACE: 32,
		LEFT: 37,
		RIGHT: 39,
		F: 70
	},
	volumeIncrement: 5,
} 

function noInputFocus() {
	return !($('input[type=text]:focus, input[type=password]:focus').size());
}

function setVolume(value) {
  // Sanitize parameter, to make sure it doesn't need any escaping
  value = parseInt(value, 10);
  console.log(value);

  var script = document.createElement("script");
  script.async = false;
  script.textContent = "(function() {" +
      "var _volume = " + value + ";" +
      "var volSlider = $('.volume-slider');" +
      "volSlider.slider('value', _volume);" +
      "volSlider.slider('option', 'slide')(null, {value: volSlider.slider('value')});" +
    "})()";
  document.documentElement.appendChild(script);
  document.documentElement.removeChild(script);
}

function adjustVolume(delta) {
	var volSlider = $('.volume-slider');
	console.log(Math.min(Math.max(parseInt(volSlider.find('.ui-slider-handle').css('bottom')) + delta, 0), 100));
	var value = Math.min(Math.max(parseInt(volSlider.find('.ui-slider-handle').css('bottom')) + delta, 0), 100);

	setVolume(value);
}

$(window).load(function() {
	// disable space scroll
	$(document).on('keydown', function(e) {
		if(e.which == options.keys.SPACE && noInputFocus()) {
			return false;
		}
	});

	$(document).on('keyup', function(e) {
		if(noInputFocus()) {
			if(e.which == options.keys.SPACE) {
				$('.btn-playpause').eq(0).click();
			} else if(e.ctrlKey && e.which == options.keys.RIGHT) {
				$('.btn-skip').eq(0).click();
			} else if(e.ctrlKey && e.which == options.keys.LEFT) {
				$('.btn-rewind').eq(0).click();
			} else if(e.which == options.keys.F) {
				$('.btn-fullscreen').eq(0).click();
			}
		}
	});

	// bind mouse wheel
	$('#menu, #audio-controls').on('mousewheel', function(e) {
		e.preventDefault();
		if(parseInt(e.deltaY) > 0) {
			adjustVolume(options.volumeIncrement);
		} else {
			adjustVolume(-options.volumeIncrement);
		}
	});
});