window.addEventListener('resize', function() {
		document.getElementsByClassName('loading')[0].style.display = 'block';
		var oldnumber = nav.itemsInSlides;
		nav.countingItemsOnSlide();
		if(oldnumber != nav.itemsInSlides) {
			nav.updateNavigation();
		}
		setTimeout( function(){
         document.getElementsByClassName('loading')[0].style.display = 'none';

     },1500)
	});