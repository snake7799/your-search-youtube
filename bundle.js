/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__YouTubeApi__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pagingConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return modifyPaging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updatePaging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resetPagingConfig; });


let pagingConfig = {
	pagesCount: 0,
	currentPage: 0,
	columnCount: 3,
	videosCount: 0,
	sectionWidth: 1320
};

function translatex(page) {
	const width = pagingConfig.sectionWidth * pagingConfig.columnCount * (1 - page);
	const articles = document.querySelectorAll('#searchResults > article');
	for (let i = 0; i < articles.length; i += 1) {
		articles.item(i).style.transform = `translatex(${width}px)`;
	}
	pagingConfig.currentPage = page;
}

function setPage(pageNumber) {
	if (pageNumber == pagingConfig.pagesCount + 1 && pageNumber > 1) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__YouTubeApi__["b" /* startSearch */])(pagingConfig.columnCount);
		pagingConfig.videosCount += pagingConfig.columnCount;
	} else translatex(pageNumber);

	const pages = document.querySelectorAll('.paging > a');
	for (let i = 0; i < pages.length; i += 1) {
		if (pages.item(i).id == pageNumber) pages.item(i).classList.add('active-page');else pages.item(i).classList.remove('active-page');
	}
}

function addPage(idNumber) {
	const page = document.createElement('a');

	page.addEventListener('mousedown', e => {
		e.target.innerHTML = `<div class="page-number">${e.target.id}</div>`;
	});
	page.addEventListener('click', e => {
		e.target.innerHTML = '';
		setPage(e.target.id);
	});

	if (idNumber != undefined) page.id = idNumber;else page.id = pagingConfig.pagesCount + 1;

	document.querySelector('.paging').appendChild(page);
}

function modifyPaging(list) {
	if (pagingConfig.pagesCount * pagingConfig.columnCount < list.length) {
		pagingConfig.pagesCount += 1;
		addPage();
		setTimeout(() => {
			translatex(pagingConfig.pagesCount);
		}, 100);
	} else {
		setTimeout(() => {
			translatex(pagingConfig.currentPage);
		}, 100);
	}
}

function updatePaging(pgsCnt) {
	document.body.removeChild(document.querySelector('.paging'));
	const paging = document.createElement('div');
	paging.classList.add('paging');
	document.body.appendChild(paging);

	for (let i = 1; i <= pgsCnt + 1; i += 1) {
		addPage(i);
	}
}

function resetPagingConfig() {
	pagingConfig = {
		pagesCount: 0,
		currentPage: 0,
		columnCount: 3,
		videosCount: 0,
		sectionWidth: 1320
	};
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pagination__ = __webpack_require__(0);
/* unused harmony export nextPageToken */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return startSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resetVideoList; });



let videoList = {};
let video = {};
let nextPageToken = '';

function convertSearchResponseToVideoList(responseData) {
	video = {};
	const items = responseData.items;
	if (items != undefined) {
		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			const shortId = item.id.videoId;
			const date = new Date(Date.parse(item.snippet.publishedAt));
			Array.prototype.push.call(video, {
				id: shortId,
				youtubeLink: `http://www.youtube.com/watch?v=${shortId}`,
				title: item.snippet.title,
				thumbnail: item.snippet.thumbnails.high.url,
				description: item.snippet.description,
				author: item.snippet.channelTitle,
				publishedDate: `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`
			});
		}
	}
	nextPageToken = responseData.nextPageToken;
}

function addVideoToDocument() {
	for (let i = 0; i < video.length; i += 1) {
		const article = document.createElement('article');

		const imgDiv = document.createElement('div');
		const img = document.createElement('img');
		img.src = video[i].thumbnail;
		imgDiv.appendChild(img);

		const a = document.createElement('a');
		a.innerHTML = `<h2>${video[i].title}</h2>`;
		a.href = video[i].youtubeLink;
		imgDiv.appendChild(a);

		article.appendChild(imgDiv);

		const description = document.createElement('p');
		description.innerHTML = video[i].description;
		article.appendChild(description);

		const infoDiv = document.createElement('div');
		infoDiv.classList.add('info');
		infoDiv.innerHTML = `<div><i class="fa fa-user fa-lg" aria-hidden="true"></i>${video[i].author}</div>
							<div><i class="fa fa-calendar fa-lg" aria-hidden="true"></i>${video[i].publishedDate}</div>
							<div><i class="fa fa-eye fa-lg" aria-hidden="true"></i>${video[i].viewCount}</div>`;
		article.appendChild(infoDiv);

		article.onmousedown = function (e) {
			e.preventDefault();
		};
		article.onselectstart = function (e) {
			e.preventDefault();
		};

		document.querySelector('#searchResults').appendChild(article);
	}
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__resize__["b" /* addMarginsToArticles */])();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pagination__["e" /* modifyPaging */])(videoList);
}

function loadYouTubeAPI() {
	return new Promise(resolve => {
		gapi.client.setApiKey('AIzaSyBHAZPcismbGY6qtyWaZ1LOrLf3Wp9prh0'); // eslint-disable-line
		gapi.client.load('youtube', 'v3', resolve); // eslint-disable-line
	});
}

function startSearch(resCnt) {
	if (resCnt == 0 || isNaN(resCnt)) return;
	loadYouTubeAPI().then(() => {
		const query = document.querySelector('input').value;
		return gapi.client.youtube.search.list({ // eslint-disable-line
			q: query,
			part: 'snippet',
			type: 'video',
			maxResults: resCnt,
			pageToken: nextPageToken
		}).then(response => {
			const str = JSON.stringify(response.result);
			convertSearchResponseToVideoList(JSON.parse(str));
		}).then(() => {
			const ids = [];
			for (let i = 0; i < video.length; i += 1) {
				ids.push(video[i].id);
			}
			return gapi.client.youtube.videos.list({ // eslint-disable-line
				id: ids.join(','),
				part: 'statistics'
			});
		}).then(response => {
			const str = JSON.stringify(response.result);
			const items = JSON.parse(str).items;
			if (items != undefined) {
				for (let i = 0; i < items.length; i += 1) {
					video[i].viewCount = items[i].statistics.viewCount;
				}
				Array.prototype.push.apply(videoList, video);
			}
		}).then(() => {
			addVideoToDocument();
		}, error => console.log(error));
	});
}

function resetVideoList() {
	videoList = {};
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__YouTubeApi__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addMarginsToArticles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return resize; });



let defaultBlockWidth;
let articleMargin = 20;

(function () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) defaultBlockWidth = 800;else defaultBlockWidth = 400;
})();

function addMarginsToArticles() {
	const articles = document.querySelectorAll('#searchResults > article');
	for (let i = 0; i < articles.length; i += 1) {
		articles.item(i).style.margin = `20px ${articleMargin}px`;
	}
}

function sectionMargin() {
	return parseInt((document.querySelector('#searchResults').clientWidth - __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount * defaultBlockWidth) / 2 / __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount, 10);
}

function calculateColumnCount() {
	return parseInt(document.querySelector('#searchResults').clientWidth / (defaultBlockWidth + 40), 10);
}

function resize() {
	const firstVideoOnPage = (__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].currentPage - 1) * __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount + 1;
	__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount = calculateColumnCount();

	const newPageNumber = parseInt((firstVideoOnPage - 1) / __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount, 10) + 1;

	articleMargin = sectionMargin();
	addMarginsToArticles();

	__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].sectionWidth = defaultBlockWidth + 2 * articleMargin;

	const additionallyDownload = (__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount - __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].videosCount % __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount) % __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount;

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__YouTubeApi__["b" /* startSearch */])(additionallyDownload);
	__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].videosCount += additionallyDownload;

	if (__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].pagesCount != 0) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__pagination__["f" /* updatePaging */])(__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].pagesCount);

	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__pagination__["d" /* setPage */])(newPageNumber);
}
window.onresize = resize;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createSearchInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createSearchResultsSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createPaging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return changePositionOfSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return resetSearchResults; });
function createSearchInput() {
	const wrap = document.createElement('div');
	wrap.classList.add('searchWrap');

	const h1 = document.createElement('h1');
	h1.innerHTML = 'Your<span>Search</span>';
	wrap.appendChild(h1);

	const div = document.createElement('div');
	div.classList.add('searchInput');
	wrap.appendChild(div);

	const input = document.createElement('input');
	input.type = 'search';
	input.placeholder = 'Enter the query';
	input.autofocus = true;
	div.appendChild(input);

	const button = document.createElement('button');
	button.innerHTML = '<i class="fa fa-search fa-lg" aria-hidden="true"></i>';
	div.appendChild(button);

	document.body.appendChild(wrap);
}

function createSearchResultsSection() {
	const section = document.createElement('section');
	section.id = 'searchResults';
	document.body.appendChild(section);

	section.onmousedown = function (e) {
		e.preventDefault();
	};
	section.onselectstart = function (e) {
		e.preventDefault();
	};
}

function createPaging() {
	const paging = document.createElement('div');
	paging.classList.add('paging');
	document.body.appendChild(paging);
}

function changePositionOfSearch() {
	if (screen.width <= 500) {
		document.querySelector('h1').style.display = 'none';
		document.querySelector('.searchWrap').style.top = '2%';
		document.querySelector('.searchWrap').style.transform = 'translate(-50%, -2%)';
	} else {
		document.querySelector('.searchWrap').style.top = '3%';
		document.querySelector('.searchWrap').style.transform = 'translate(-50%, -3%)';
	}
	document.querySelector('.searchWrap > h1').style.fontSize = '48px';
	document.querySelector('.searchWrap > h1').style.marginBottom = '20px';
}

function resetSearchResults() {
	document.body.removeChild(document.querySelector('#searchResults'));
	document.body.removeChild(document.querySelector('.paging'));

	createSearchResultsSection();
	createPaging();
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleTouchStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return handleTouchMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return handleTouchEnd; });


let isDrag = false;
let drag = 0;

function isTouchOnSearchResults(path) {
	const target = document.querySelector('#searchResults');
	for (let i = 0; i < path.length; i += 1) {
		if (path[i] == target) return true;
	}
	return false;
}

function draggable(x) {
	const width = __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].sectionWidth * __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].columnCount * (1 - __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].currentPage);
	const articles = document.querySelectorAll('#searchResults > article');
	for (let i = 0; i < articles.length; i += 1) {
		articles[i].style.transform = `translatex(${width + x}px`;
	}
}

function getEventCordinateX(e) {
	if (e.type === 'mousedown' || e.type === 'mousemove' || e.type === 'mouseup') return e.x;else if (e.type === 'touchstart' || e.type === 'touchmove') return e.touches[0].clientX;else if (e.type === 'touchend') return e.changedTouches[0].clientX;
	return null;
}

function handleTouchStart(evt) {
	if (isTouchOnSearchResults(evt.path)) {
		isDrag = true;
		drag = getEventCordinateX(evt);
	}
}

function handleTouchMove(evt) {
	if (isDrag) draggable(getEventCordinateX(evt) - drag);
}

function handleTouchEnd(evt) {
	const cordX = getEventCordinateX(evt);
	if (isDrag) {
		if (cordX - drag >= 150 && __WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].currentPage != 1) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__pagination__["d" /* setPage */])(__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].currentPage - 1);else if (cordX - drag <= -150) __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__pagination__["d" /* setPage */])(parseInt(__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].currentPage, 10) + 1);else __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__pagination__["d" /* setPage */])(__WEBPACK_IMPORTED_MODULE_0__pagination__["c" /* pagingConfig */].currentPage);

		draggable(0);
	}
	isDrag = false;
}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DOMmanipulation__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pagination__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resize__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__YouTubeApi__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__touch__ = __webpack_require__(4);






(function () {
	__WEBPACK_IMPORTED_MODULE_0__DOMmanipulation__["a" /* createSearchInput */]();
	__WEBPACK_IMPORTED_MODULE_0__DOMmanipulation__["b" /* createSearchResultsSection */]();
	__WEBPACK_IMPORTED_MODULE_0__DOMmanipulation__["c" /* createPaging */]();
})();

function search() {
	__WEBPACK_IMPORTED_MODULE_0__DOMmanipulation__["d" /* changePositionOfSearch */]();
	__WEBPACK_IMPORTED_MODULE_0__DOMmanipulation__["e" /* resetSearchResults */]();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pagination__["a" /* resetPagingConfig */])();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__YouTubeApi__["a" /* resetVideoList */])();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__resize__["a" /* resize */])();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__pagination__["b" /* addPage */])();
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__YouTubeApi__["b" /* startSearch */])(__WEBPACK_IMPORTED_MODULE_1__pagination__["c" /* pagingConfig */].columnCount);
	__WEBPACK_IMPORTED_MODULE_1__pagination__["c" /* pagingConfig */].videosCount += __WEBPACK_IMPORTED_MODULE_1__pagination__["c" /* pagingConfig */].columnCount;
}

document.querySelector('input').addEventListener('keypress', e => {
	const event = e || window.event;
	if (event.keyCode === 13) search();
});
document.querySelector('button').addEventListener('click', search);

document.body.addEventListener('mousedown', __WEBPACK_IMPORTED_MODULE_4__touch__["a" /* handleTouchStart */]);
document.body.addEventListener('mousemove', __WEBPACK_IMPORTED_MODULE_4__touch__["b" /* handleTouchMove */]);
document.body.addEventListener('mouseup', __WEBPACK_IMPORTED_MODULE_4__touch__["c" /* handleTouchEnd */]);
document.body.addEventListener('touchstart', __WEBPACK_IMPORTED_MODULE_4__touch__["a" /* handleTouchStart */]);
document.body.addEventListener('touchmove', __WEBPACK_IMPORTED_MODULE_4__touch__["b" /* handleTouchMove */]);
document.body.addEventListener('touchend', __WEBPACK_IMPORTED_MODULE_4__touch__["c" /* handleTouchEnd */]);

/***/ })
/******/ ]);