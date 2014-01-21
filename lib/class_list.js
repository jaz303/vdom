module.exports = ClassList;

var indexOf = require('indexof');

function ClassList() {
    this._classes = [];
}

Object.defineProperty(ClassList.prototype, 'length', {
    get: function() {
        return this._classes.length
    }
});

ClassList.prototype.set = function(classes) {
    this._classes = classes.trim().split(/\s+/);
}

ClassList.prototype.add = function() {
    "use strict";
    for (var i = 0; i < arguments.length; ++i) {
        var c = arguments[i], ix = indexOf(this._classes, c);
        if (ix < 0) {
            this._classes.push(c);
        }
    }
}

ClassList.prototype.remove = function() {
    "use strict";
    for (var i = 0; i < arguments.length; ++i) {
        var c = arguments[i], ix = indexOf(this._classes, c);
        if (ix >= 0) {
            this._classes.splice(ix, 1);
        }
    }
}

ClassList.prototype.toggle = function(className) {
    var ix = indexOf(this._classes, className);
    if (ix < 0) {
        this._classes.push(className);
    } else {
        this._classes.splice(ix, 1);
    }
}

ClassList.prototype.contains = function(className) {
    return indexOf(this._classes, className) >= 0;
}

ClassList.prototype.toString = function() {
    return this._classes.join(' ');
}