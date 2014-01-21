module.exports = Node;

function Node() {

}

Node.prototype.isElement = function() {
    return false;
}

Node.prototype.isTextNode = function() {
    return false;
}