'use strict';

var filter = require('array-filter');
var getData = require('./getData');

var toStr = Object.prototype.toString;
var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;

var isHTMLBuiltin = function isBuiltin(constructor) {
	return !hasToStringTag && toStr.call(constructor).slice(8, 12) === 'HTML';
};

module.exports = function byConstructor(constructor) {
	if (typeof constructor !== 'function' && !isHTMLBuiltin(constructor)) {
		throw new TypeError('constructor must be a function, got ' + typeof constructor);
	}
	var data = getData();
	if (constructor === data.all) {
		return data.elements;
	}
	if (constructor === data.unknown) {
		return [];
	}
	return filter(data.elements, function (item) {
		return item.constructor === constructor;
	});
};
