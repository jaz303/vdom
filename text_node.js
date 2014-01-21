module.exports = TextNode;

function TextNode(content) {

	if (!(this instanceof TextNode))
		return new TextNode(content);

	this.content = content || '';
}

require('util').inherits(TextNode, require('./node'));

TextNode.prototype.isTextNode = function() {
	return true;
}

TextNode.prototype.set = function(content) {
	this.content = content;
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