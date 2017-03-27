window.$ = cjq;

function $(selector) {
	this.elements = document.querySelectorAll(selector);
	this.selector = selector;
};

function cjq(selector) {
	if (typeof selector === 'string')
		return new $(selector);
	else if (selector === undefined)
		throw new Error('Selector is not defined');
	else
		throw new TypeError('Selector must be a string');
};

$.prototype.addClass = function(value) {
	let classArr = '';
	
	if (typeof value === 'string') {
		classArr = value.trim().split(/\s+/);

		for (let i = 0; i < this.elements.length; i++)
			for (let j = 0; j < classArr.length; j++)
				this.elements[i].classList.add(classArr[j]);
	}
	
	if (typeof value === 'function') {
		let temp = '';
		for (let i = 0; i < this.elements.length; i++) {
			temp = value(i, this.elements[i].className);
			
			if (typeof temp === 'string') {
				classArr = temp.trim().split(/\s+/);
				
				for (let j = 0; j < classArr.length; j++)
					this.elements[i].classList.add(classArr[j]);
			}
		}
	}
		
	return this;
};

$.prototype.append = function(data) {
	if (typeof data === 'string') {
		for (let i = 0; i < this.elements.length; i++)
			this.elements[i].innerHTML += data;
	}
	else if (typeof data === 'object') {
		let newNode = {};
		let copyNode = {};
		for (let i = 0; i < this.elements.length; i++) {
			newNode = this.elements[i].appendChild(data);
			copyNode = newNode.cloneNode(true);
			this.elements[i].appendChild(copyNode);
		}
		this.elements[this.elements.length-1].removeChild(copyNode);
	}

	return this;
}

$.prototype.html = function(html) {
	if (html === undefined)
		for (let i = 0; i < this.elements.length; i++)
			return this.elements[i].innerHTML;
	
	for (let i = 0; i < this.elements.length; i++)
		this.elements[i].innerHTML = html;
	
	return this;
};

$.prototype.attr = function(attribute, value) {
	if (value && typeof attribute === 'string') {
		for (let i = 0; i < this.elements.length; i++)
			this.elements[i].setAttribute(attribute, value);
	}
	else if (typeof attribute === 'string' && value === undefined)
			return this.elements[0].getAttribute(attribute);
	
	return this;
};

$.prototype.children = function(element) {
	if (element) {
		element = element.substring(1);
		let classArr = '';
		let result = [];
		for (let i = 0; i < this.elements.length; i++) {
			for (let j = 0; j < this.elements[i].children.length; j++) {
				classArr = this.elements[i].children[j].className.trim().split(/\s+/);
				for (let k = 0; k < classArr.length; k++)
					if (classArr[k] === element)
						result.push(this.elements[i].children[j]);
			}
		}
		return result;
	}

	return this.elements[0].children;
};

$.prototype.css = function(property) {
	function toCamelCase(str) {
		return str.replace(/-([a-z])/ig, function(all, letter) {
			return letter.toUpperCase();
		});
	};
	
	if (property !== undefined) {
		if (typeof property === 'string') 
			return this.elements[0].style[toCamelCase(property)];
		else if (typeof property === 'object') {
			for (let prop in property)
				for (let i = 0; i < this.elements.length; i++) 
					this.elements[i].style[toCamelCase(prop)] = property[prop];
		}
	}
	else 
		throw new TypeError('Invalid CSS property');
	
	return this;
};

$.prototype.data = function(dataName, value) {	
	if (value === undefined) {
		if (dataName === undefined)
			return this.elements[0].dataset;
		
		if (typeof dataName === 'string')
			return this.elements[0].dataset[dataName];
		
		if (typeof dataName === 'object') {
			for (let i = 0; i < this.elements.length; i++)
				for (let key in dataName)
					this.elements[i].dataset[key] = dataName[key];
		}
	}
	
	if (typeof value === 'number' && typeof dataName === 'string')
		for (let i = 0; i < this.elements.length; i++)
			this.elements[i].dataset[dataName] = value;
	
	return this;
};

$.prototype.on = function(event, selector, callback) {
	if (event && selector && callback) {
		for (let i = 0; i < this.elements.length; i++) {
			this.elements[0].addEventListener(event, function(e) {
				let target = e.target;
				while (target !== this && target !== this) {
					if (target.matches(selector)) 
						callback.call(target, e);
					target = target.parentNode;
				}
			});
		}
	}
	else
		for (let i = 0; i < this.elements.length; i++)
			this.elements[i].addEventListener(event, selector);
	
	
	return this;
};

$.prototype.one = function(event, callback) {
	for (let i = 0; i < this.elements.length; i++) {
		this.elements[i].addEventListener(event, function(e) {
			e.target.removeEventListener(e.type, arguments.callee);
			return callback(e);
		});
	}
};

$.prototype.each = function(callback) {
	if (typeof callback !== 'function')
		throw new TypeError(callback + ' is not a function');
	
	for ( let i = 0; i < this.elements.length; i++ ) {
		if (callback.call(this.elements[i], i, this.elements[i]) === false)
			break;
	}
	
	return this;
};
