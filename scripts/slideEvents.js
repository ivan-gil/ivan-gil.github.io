var TouchMouseHandlers = function() {
};

TouchMouseHandlers.prototype.down = function(event) {
	
	this._pressing = true;
	var touch;
	event.preventDefault();
	if(event.changedTouches) {
		touch = event.changedTouches[0];
		this.startX = touch.pageX;
	}
	else {
		this.startX = event.clientX
	}
	this._carouselWidth = document.getElementsByClassName('carousel')[0].offsetWidth;
};

TouchMouseHandlers.prototype.move = function(event) {
	swipe.swipeWrapper.style.transition = 200 + 'ms cubic-bezier(0,0,0.25,1)';
	if(event.changedTouches) {
		swipe.partialSwipe(event.changedTouches[0].pageX - this.startX , this._carouselWidth);
	}
	else if (this._pressing) {
		event.preventDefault;
		swipe.partialSwipe(event.clientX - this.startX , this._carouselWidth);

	}
};

TouchMouseHandlers.prototype.up = function(event) {
	this._pressing = false;
	swipe.swipeWrapper.style.transition = 600 + 'ms cubic-bezier(0,0,0.25,1)';
	var touch;
	if(event.changedTouches) {
		touch = event.changedTouches[0];
		if (this.startX - touch.pageX > 100) {
				swipe.swipeLeft();
		} 
		else if (this.startX - touch.pageX < -100) {
			swipe.swipeRight();
		} 
		else {
				swipe.resumePartialSwipe();
		}
	}
	else {

		// event.preventDefault();
		if (this.startX - event.clientX > 100) {
		swipe.swipeLeft();
		} 
		else if (this.startX - event.clientX < -100) {
			swipe.swipeRight();
		} 
		else {
			swipe.resumePartialSwipe();
		}

	}
}

var handlers = new TouchMouseHandlers();
var carousel = document.getElementsByClassName('carousel')[0];
	
carousel.addEventListener('touchstart', handlers.down);
carousel.addEventListener('mousedown', handlers.down);

carousel.addEventListener('touchmove', handlers.move);
carousel.addEventListener('mousemove', handlers.move);

carousel.addEventListener('touchend', handlers.up);
carousel.addEventListener('mouseup', handlers.up);