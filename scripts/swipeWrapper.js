var SwipeWrapper = function() {
	this.swipeWrapper = document.getElementsByClassName('wrapper')[0];
	this._swipeLength = 0;
	this._wrapperWidth = 0;
	this._carouselWidth = 0;
}

SwipeWrapper.prototype.pagSwipeLeft = function(id) {
	this._swipeLength = - id * 100;
	this.swipeWrapper.style.WebkitTransform = 'translate3d(' + this._swipeLength + '%, 0, 0';

	nav.currentDot();

};

SwipeWrapper.prototype.swipeLeft = function() {
	this._wrapperWidth = document.getElementsByClassName('wrapper')[0].scrollWidth;
	this._carouselWidth = document.getElementsByClassName('carousel')[0].offsetWidth;
	this._swipeLength -= 100;
	if(Math.abs(this._swipeLength / 100) >= nav.idOfAdditionalSearch) {
		document.getElementsByClassName('loading')[0].style.display = 'block';
		setTimeout( function(){
         document.getElementsByClassName('loading')[0].style.display = 'none';

     },2000)
		dataMan.getData();
	}
	this.swipeWrapper.style.WebkitTransform = 'translate3d(' + this._swipeLength + '%, 0, 0';
	nav.currentDot();
};

SwipeWrapper.prototype.swipeRight = function() {
	if(this._swipeLength === 0) {
		this.swipeWrapper.style.WebkitTransform = 'translate3d(' + this._swipeLength + '%, 0, 0';
		return;
	}

	this._swipeLength += 100;
	this.swipeWrapper.style.WebkitTransform = 'translate3d(' + this._swipeLength + '%, 0, 0';

	nav.currentDot();
};

SwipeWrapper.prototype.partialSwipe = function(distance, carouselWidth) {
	this.swipeWrapper.style.transition = 0;
	this.swipeWrapper.style.WebkitTransform = 'translate3d(' + (this._swipeLength * carouselWidth / 100 + distance) + 'px, 0, 0)';
};

SwipeWrapper.prototype.resumePartialSwipe = function() {
	this.swipeWrapper.style.WebkitTransform = 'translate3d(' + this._swipeLength + '%, 0, 0)';
}

var swipe = new SwipeWrapper();

var buttonSearch = function () {
	swipe._swipeLength = 0;
	dataMan.removeSlides();
	dataMan.getData();
}

var additionalSearch = function () {
	dataMan.getData();
}
var button = document.getElementById('search');
button.addEventListener('click', buttonSearch);
button.addEventListener('touchstart', buttonSearch);


window.addEventListener('keydown', function(event) {
		if (event.keyCode === 39) {
			swipe.swipeLeft();
		} else if (event.keyCode === 37) {
			swipe.swipeRight();
		} else if (event.keyCode === 13) {
			buttonSearch();
		}
	});


