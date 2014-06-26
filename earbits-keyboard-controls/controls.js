var options = {
	keys: {
		SPACE: 32,
		LEFT: 37,
		RIGHT: 39,
		F: 70
	},
	volumeIncrement: 5
} 

function noInputFocus() {
	return !($('input[type=text]:focus, input[type=password]:focus').size());
}

function setVolume(value, slider) {
	var volSlider = /*slider ? slider : */$('.volume-slider');

	volSlider.slider('value', value);
	volSlider.slider('option', 'slide')(null, {value: volSlider.slider('value')});
}

function adjustVolume(delta, slider) {
	var volSlider = /*slider ? slider : */$('.volume-slider');
	console.log(volSlider.slider('value'));
	var value = Math.min(Math.max(volSlider.slider('value') + delta, 0), 100);;

	setVolume(value, volSlider);
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

	var bindVolumeInterval = setInterval(function() {
		if(typeof $('.volume-slider').slider != 'undefined') {
			$('#menu, #audio-controls').on('mousewheel', function(e) {
				e.preventDefault();
				// console.log(e);
				if(parseInt(e.deltaY) > 0) {
					adjustVolume(options.volumeIncrement);
				} else {
					adjustVolume(-options.volumeIncrement);
				}
			});
			clearInterval(bindVolumeInterval);
			console.log('volume-bind ok');
		} else {
			console.log('volume-bind fail');
		}
	}, 1000);
});