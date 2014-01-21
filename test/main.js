var vdom = require('../');

var COLORS = ['red', 'green', 'blue', 'yellow', 'orange'];

window.init = function() {

	var div = vdom.element('div');

	var h1 = vdom.element('h1', 'Hello World');
	
	var ul = vdom.element('ul', [1,2,3,4,5].map(function(num, ix) {
		var el = vdom.element('li', 'This is item ' + num);
		el.setStyle('backgroundColor', COLORS[ix]);
		el.classList.add(['black', 'white'][ix % 2]);
		el.classList.add(['small', 'medium', 'large'][ix % 3]);
		return el;
	}));
	
	div.appendChild(h1);
	div.appendChild(ul);

	document.body.appendChild(div.reify());

}