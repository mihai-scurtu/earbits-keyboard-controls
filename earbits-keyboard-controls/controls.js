var keys = {
	SPACE: 32,
	LEFT: 37,
	RIGHT: 39,
	F: 70,
} 

function noInputFocus() {
	return !($('input[type=text]:focus, input[type=password]:focus').size());
}

$(function() {
	// disable space scroll
	$(document).on('keydown', function(e) {
		if(e.which == keys.SPACE && noInputFocus()) {
			return false;
		}
	});

	$(document).on('keyup', function(e) {
		if(noInputFocus()) {
			if(e.which == keys.SPACE) {
				$('.btn-playpause').eq(0).click();
			} else if(e.ctrlKey && e.which == keys.RIGHT) {
				$('.btn-skip').eq(0).click();
			} else if(e.ctrlKey && e.which == keys.LEFT) {
				$('.btn-rewind').eq(0).click();
			} else if(e.which == keys.F) {
				$('.btn-fullscreen').eq(0).click();
			}
		}
	});
});