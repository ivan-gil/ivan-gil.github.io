var Navigation = function() {
	this.itemsInSlides;
	this.numberOfSlides;
	this.carouselWith;
	this.idOfAdditionalSearch;
	this.odd = false;

};

Navigation.prototype.countingItemsOnSlide = function() {
	this.carouselWith = document.getElementsByClassName('carousel')[0].offsetWidth;
		if (this.carouselWith < 600) {
			this.itemsInSlides = 1;
		} else if (this.carouselWith < 800) {
			this.itemsInSlides = 2;
		} else if (this.carouselWith < 1500) {
			this.itemsInSlides = 3;
		} else {
			this.itemsInSlides = 4;
		}
};

Navigation.prototype.countingSlides = function() {
	this.carouselWith = document.getElementsByClassName('carousel')[0].offsetWidth;
	var wrapperChildNodesNumber = document.getElementsByClassName('wrapper')[0].childNodes.length;
	if(wrapperChildNodesNumber % this.itemsInSlides > 0) {
		this.odd = true;
		this.numberOfSlides = ~~(wrapperChildNodesNumber / this.itemsInSlides) + 1;
		this.idOfAdditionalSearch = ~~(wrapperChildNodesNumber / this.itemsInSlides);
	}
	else {
		this.numberOfSlides = wrapperChildNodesNumber / this.itemsInSlides;
		this.idOfAdditionalSearch = wrapperChildNodesNumber / this.itemsInSlides;
	}

};

Navigation.prototype.renderingNavigation = function() {
	var that = this;
	var navigationList = document.getElementsByTagName('ul')[0];
	navigationList.addEventListener('mousedown', this.navHandler);
	navigationList.addEventListener('touchstart', this.navHandler);
	navigationList.innerHTML = '';
	for (var i = 0; i < this.numberOfSlides; i++) {
		var a = document.createElement('a');
		a.id = i ;
		a.appendChild(document.createTextNode(i + 1));
		navigationList.appendChild(a);
	};
	this.currentDot();
};

Navigation.prototype.updateNavigation = function() {
	var wrapperChilds = document.getElementsByClassName('wrapper')[0].children.length;
	this.countingItemsOnSlide();
	this.countingSlides();
	if(Math.abs(swipe._swipeLength / 100) >= nav.idOfAdditionalSearch && wrapperChilds) {
		dataMan.getData();
	}
	this.renderingNavigation();
};

Navigation.prototype.navHandler = function(event) {
	var target = event.target;
	swipe.pagSwipeLeft(target.id);
};

Navigation.prototype.currentDot = function() {
	var id = Math.abs(swipe._swipeLength / 100);
	var ulChildren = document.getElementsByTagName('ul')[0].children;
	for (var i = 0; i < ulChildren.length; i++) {
		ulChildren[i].classList.remove('current');
	};
	if(document.getElementById(id)) {
	document.getElementById(id).classList.add('current');		
	};
};

var nav = new Navigation();