var TextNode 	= require('./text_node'),
	ClassList 	= require('./lib/class_list');

module.exports = Element;

// TODO: namespaces (SVG etc)
// TODO: classes
// TODO: events

function Element(tagName, children) {

	if (!(this instanceof Element))
		return new Element(tagName, children);
	
	this.tagName = tagName.toLowerCase();
	this.id = null;
	this.classList = new ClassList();
	this.childNodes = []; // readonly
	this.attributes = {}; // readonly
	this.styles = {}; // readonly
	this.parentNode = null; // readonly

	if (Array.isArray(children)) {
		for (var i = 0, l = children.length; i < l; ++i) {
			this.appendChild(children[i]);
		}
	} else if (typeof children === 'string') {
		this.setTextContent(children);
	}

}

require('util').inherits(Element, require('./node'));

Element.prototype.isElement = function() {
	return true;
}

//
// Children

Element.prototype.appendChild = function(child) {

	if (child.parentNode) {
		child.parentNode.removeChild(child);
	}

	this.childNodes.push(child);
	child.parentNode = this;

}

Element.prototype.removeChild = function(child) {
	for (var i = 0, l = this.childNodes.length; i < l; ++i) {
		if (this.childNodes[i] === child) {
			child.parentNode = null;
			this.childNodes.splice(i, 1);
			return;
		}
	}
}

//
// Attributes

Element.prototype.setAttribute = function(attr, value) {
	this.attributes[attr] = value;
}

Element.prototype.getAttribute = function(attr, defaultValue) {
	return this.attributes[attr] || defaultValue;
}

Element.prototype.hasAttribute = function(attr) {
	return attr in this.attributes;
}

Element.prototype.removeAttribute = function(attr) {
	delete this.attributes[attr];
}

//
// Styles

Element.prototype.setStyle = function(prop, value) {
	this.styles[prop] = value;
}

Element.prototype.getStyle = function(prop) {
	return this.styles[prop];
}

Element.prototype.hasStyle = function(prop) {
	return prop in this.styles;
}

Element.prototype.removeStyle = function(prop) {
	delete this.styles[prop];
}

//
// Text

Element.prototype.setTextContent = function(textContent) {
	this.childNodes = [new TextNode(textContent)];
}

//
//

Element.prototype.reify = function(doc) {

	doc = doc || document;
	
	var el = doc.createElement(this.tagName);

	el.id = this.id;

	if (this.classList && this.classList.length) {
		el.className = this.classList.toString();
	}

	if (this.attributes) {
		for (var k in this.attributes) {
			el.setAttribute(k, this.attributes[k]);
		}
	}

	if (this.styles) {
		for (var k in this.styles) {
			el.style[k] = this.styles[k];
		}
	}

	if (this.childNodes) {
		for (var i = 0, l = this.childNodes.length; i < l; ++i) {
			el.appendChild(this.childNodes[i].reify(doc));
		}
	}

	return el;

}