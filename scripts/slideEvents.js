var TouchMouseHandlers = function() {
	this.startX = 0;
	this._pressing = false;
	this._carouselWidth = 0;
};

TouchMouseHandlers.prototype.down = function(event) {
	this._pressing = true;
	var touch;
	if(event.changeTouches) {
		touch = event.changeTouches[0];
		this.startX = touch.pageX;
	}
	else {
		this.startX = event.clientX
	}
	this._carouselWidth = document.getElementsByClassName('carousel')[0].offsetWidth;
};

TouchMouseHandlers.prototype.move = function(event) {
	swipe.swipeWrapper.style.transition = 200 + 'ms cubic-bezier(0,0,0.25,1)';
	if(event.changeTouches) {
		event.preventDefault;
		swipe.partialSwipe(event.changedTouches[0].pageX - this.startX , this._carouselWidth);
	}
	else if (this._pressing) {
		swipe.partialSwipe(event.clientX - this.startX , this._carouselWidth);

	}
};

TouchMouseHandlers.prototype.up = function(event) {
	var that = this;
	this._pressing = false;
	swipe.swipeWrapper.style.transition = 600 + 'ms cubic-bezier(0,0,0.25,1)';
	var touch;
	if(event.changeTouches) {

		event.preventDefault();
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

window.addEventListener('mousedown', handlers.down);	
window.addEventListener('touchstart', handlers.down);

window.addEventListener('mousemove', handlers.move);
window.addEventListener('touchmove', handlers.move);

window.addEventListener('mouseup', handlers.up);
window.addEventListener('touchend', handlers.up);
