var DataManipulations = function() {
	this.clipList = [];
	this.ids = '';
	this.idStat = [];
	this.pageToken;
}

DataManipulations.prototype.getData = function() {
	var that = this;
	var input = document.getElementsByTagName('input')[0];
	var wrapperChildNodes = document.getElementsByClassName('wrapper')[0];
	var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + input.value + '&order=relevance&maxResults=5&key=AIzaSyDJW9BNFNM3rYKzVnErm6_oZNfAKqZjDLQ&type=video' + this.pageToken;
	var xhr = new XMLHttpRequest();
	if(this.pageToken) {
		xhr.open('GET', url + this.pageToken, true);
	}
	else {
		xhr.open('GET', url, true);		
	}
	xhr.send();

	xhr.onreadystatechange = function() {

		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
	    	alert(xhr.status + ': ' + xhr.statusText);
	  	} 
	  	else {
	  		that.pageToken = '&pageToken=' + JSON.parse(xhr.responseText).nextPageToken;
	  		console.log(that.pageToken);
		    var entries = JSON.parse(xhr.responseText).items;

			for (var i = 0; i < entries.length; i++) {
				var date = new Date(Date.parse(entries[i].snippet.publishedAt));
				that.ids += entries[i].id.videoId + ',';
				var entry = {
					id: entries[i].id.videoId,
					youtubeLink: "https://www.youtube.com/watch?v=" + entries[i].id.videoId,
					title: entries[i].snippet.title,
					description: entries[i].snippet.description,
					thumbnail: entries[i].snippet.thumbnails.high.url,
					publishedAt: date.toUTCString(),
					viewCount: 0,
					likeCount: 0
				};
				that.clipList.push(entry);
			};
			that.getAdditionalData();
		}
	}
};

DataManipulations.prototype.getAdditionalData = function () {
	var that = this;
	var button = document.getElementById('search');
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + this.ids + '&key=AIzaSyDJW9BNFNM3rYKzVnErm6_oZNfAKqZjDLQ', true);
	xhr.send();

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;

		if (xhr.status != 200) {
				alert(xhr.status + ': ' + xhr.statusText);
			} 
		else {
			that.idStat = JSON.parse(xhr.responseText).items;

			for (var i = 0; i < that.idStat.length; i++) {
				that.clipList[i].viewCount = that.idStat[i].statistics.viewCount;
				that.clipList[i].likeCount = that.idStat[i].statistics.likeCount;
			};		

			that.renderElements();
			nav.updateNavigation();
		}
	}
};

DataManipulations.prototype.renderElements = function () {
	var wrapper = document.getElementsByClassName('wrapper')[0];
	for (var i = 0; i < this.clipList.length; i++) {
		var videoEl = document.createElement('figure');
		var figImg = document.createElement('p');
		var figCaption = document.createElement('figcaption');

		figImg.classList.add('fig-img');
		figImg.innerHTML = "<p class='title'>" + this.clipList[i].title + "</p><img src='"+ this.clipList[i].thumbnail +"' alt=''>";

		figCaption.innerHTML = "<p>likes:" + this.clipList[i].likeCount + " </p><p>View count: " + this.clipList[i].viewCount + "</p>";
		videoEl.classList.add('slide');
		videoEl.appendChild(figImg);
		videoEl.appendChild(figCaption);
		wrapper.appendChild(videoEl);
	};
	this.clipList = [];
	this.ids = '';
	this.idStat = [];
};

DataManipulations.prototype.removeSlides = function() {
	var wrapper = document.getElementsByClassName('wrapper')[0];
	dataMan.pageToken = '';
	wrapper.innerHTML = '';
}

var dataMan = new DataManipulations();