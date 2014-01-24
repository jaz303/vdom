module.exports = TextNode;
module.exports.is = isText;

function isText(thing) {
	return (thing instanceof TextNode);
}

function TextNode(content) {

    if (!isText(this)) return new TextNode(content);

    this.content = '' + (content || '');

}

require('util').inherits(TextNode, require('./node'));

TextNode.prototype.deepEquals = function(rhs) {

	if (!isText(rhs))
		return false;

	return this.content === rhs.content;

}

TextNode.prototype.set = function(content) {
    this.content = '' + (content || '');
}

TextNode.prototype.get = function() {
    return this.content;
}

TextNode.prototype.append = function(str) {
    this.content += str;
}

TextNode.prototype.transform = function(cb) {
    this.content = cb(this.content);
}

TextNode.prototype.reify = function(doc) {
    return (doc || document).createTextNode(this.content);
}