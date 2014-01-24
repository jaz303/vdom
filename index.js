var Element = require('./element'),
    Text    = require('./text_node');

module.exports = {
    element     : Element,
    isElement   : Element.is,
    text        : Text,
    isText      : Text.is
};