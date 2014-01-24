var TextNode    = require('./text_node'),
    ClassList   = require('./lib/class_list');

// TODO: namespaces (SVG etc)

module.exports = Element;
module.exports.is = isElement;

function isElement(thing) {
    return (thing instanceof Element);
}

function objeq(l, r) {

    for (var k in l)
        if (!(k in r) || l[k] !== r[k])
            return false;

    for (var k in r)
        if (!(k in l))
            return false;

    return true;

}

// TODO: allow dictionary of properties to be passed
function Element(tagName, children) {

    if (!isElement(this)) return new Element(tagName, children);
    
    // (all of these attributes should be treated as read-only)
    this.id         = null;
    this.key        = null;
    this.tagName    = tagName.toLowerCase();
    this.classList  = new ClassList();
    this.attributes = {};
    this.styles     = {};
    this.childNodes = [];
    this.parentNode = null;

    if (Array.isArray(children)) {
        for (var i = 0, l = children.length; i < l; ++i) {
            this.appendChild(children[i]);
        }
    } else if (typeof children === 'string') {
        this.setTextContent(children);
    }

}

require('util').inherits(Element, require('./node'));

//
// Deep Equals - compares everything except the parent

Element.prototype.deepEquals = function(rhs) {

    if (!isElement(rhs))
        return false;

    if (this.tagName !== rhs.tagName)
        return false;

    if (!this.classList.equals(rhs.classList))
        return false;

    if (!objeq(this.attributes) || !objeq(this.styles))
        return false;

    if (this.childNodes.length !== rhs.childNodes.length)
        return false;

    for (var i = 0, l = this.childNodes.length; i < l; ++i)
        if (!this.childNodes[i].deepEquals(rhs.childNodes[i]))
            return false;

    return true;

}

//
// Children

// TODO: insertAfter, insertBefore etc

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
            return true;
        }
    }
    return false;
}

Element.prototype.replaceChild = function(oldChild, newChild) {
    for (var i = 0, l = this.childNodes.length; i < l; ++i) {
        if (this.childNodes[i] === oldChild) {
            this.childNodes[i] = newChild;
            return true;
        }
    }
    return false;
}

//
// Attributes

Element.prototype.setAttribute = function(attr, value) {
    this.attributes[attr] = value;

    if (attr === 'id') {
        this.id = value;
    } else if (attr === 'key') {
        this.key = value;
    }
}

Element.prototype.getAttribute = function(attr, defaultValue) {
    return this.attributes[attr] || defaultValue;
}

Element.prototype.hasAttribute = function(attr) {
    return attr in this.attributes;
}

Element.prototype.removeAttribute = function(attr) {
    delete this.attributes[attr];

    if (attr === 'id') {
        this.id = null;
    } else if (attr === 'key') {
        this.key = null;
    }
}

//
// ID

Element.prototype.getId = function() {
    return this.getAttribute('id');
}

Element.prototype.setId = function(id) {
    return this.setAttribute('id', id);
}

//
// Key

Element.prototype.getKey = function() {
    return this.getAttribute('key');
}

Element.prototype.setKey = function(key) {
    return this.setAttribute('key');
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

    if (this.attributes) {
        for (var k in this.attributes) {
            el.setAttribute(k, this.attributes[k]);
        }
    }

    if (this.classList && this.classList.length) {
        el.className = this.classList.toString();
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