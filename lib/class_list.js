module.exports = ClassList;

var indexOf = require('indexof');

function ClassList() {
    this.length = 0;
    this._classes = [];
}

ClassList.prototype.set = function(classes) {
    this._classes = classes.trim().split(/\s+/);
    this.length = this._classes.length;
}

ClassList.prototype.add = function() {
    "use strict";
    for (var i = 0; i < arguments.length; ++i) {
        var c = arguments[i], ix = indexOf(this._classes, c);
        if (ix < 0) {
            this._classes.push(c);
            this.length++;
        }
    }
}

ClassList.prototype.remove = function() {
    "use strict";
    for (var i = 0; i < arguments.length; ++i) {
        var c = arguments[i], ix = indexOf(this._classes, c);
        if (ix >= 0) {
            this._classes.splice(ix, 1);
            this.length--;
        }
    }
}

ClassList.prototype.toggle = function(className) {
    var ix = indexOf(this._classes, className);
    if (ix < 0) {
        this._classes.push(className);
        this.length++;
    } else {
        this._classes.splice(ix, 1);
        this.length--;
    }
}

ClassList.prototype.contains = function(className) {
    return indexOf(this._classes, className) >= 0;
}

ClassList.prototype.toString = function() {
    return this._classes.join(' ');
}

ClassList.prototype.equals = function(rhs) {
    
    var l = this.length;

    if (l !== rhs.length)
        return false;

    for (var i = 0; i < l; ++i)
        if (this._classes[i] !== rhs._classes[i])
            return false;

    return true;

}