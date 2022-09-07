'use strict';

var test = require('tape');
var isArray = require('isarray');
var forEach = require('for-each');
var functionName = require('function.prototype.name');
var inspect = require('object-inspect');

var getData = require('../getData');

var htmlElement = /^HTMLElement(?:Constructor)?$/g;

var testConstructor = function testConstructorTag(t, constructor, tag, name, desc) {
	if (!constructor) {
		t.equal(typeof constructor, 'undefined', desc + ' does not exist');
		return;
	}

	if (typeof constructor === 'object') {
		t.equal(typeof constructor, 'object', desc + ' is type "object"');

		var objName = Object.prototype.toString.call(constructor).slice(8, -1);
		if (objName === name || (htmlElement.test(objName) && htmlElement.test(name))) {
			if (objName === name + 'Constructor') { // Safari 5.1
				t.equal(objName, name + 'Constructor', desc + ' toString [[Class]] matches constructorName + Constructor');
			} else {
				t.equal(objName, name, desc + ' toString [[Class]] matches constructorName');
			}
		}
	} if (typeof constructor === 'function') {
		t.equal(typeof constructor, 'function', desc + ' is a function');

		var actualName = functionName(constructor);
		if (actualName === name || (actualName !== 'HTMLElement' && name !== 'HTMLElement')) {
			t.equal(actualName, name, desc + ' name matches constructorName');
		}
	} else {
		t.comment('constructor is not a function # SKIP');
		return;
	}

	if (typeof document === 'undefined') {
		t.comment('no document available # SKIP');
	} else {
		t.equal(document.createElement(tag) instanceof constructor, true, 'element is instanceof ' + desc);
	}
};

/*
 * this list is sourced from `html-tag-names` v1 and v2.
 * we can't use v2 because it's ESM-only, and thus also async
 * we don't want to depend on v1 because it won't keep up to date
 */
var htmlTags = [
	'a',
	'abbr',
	'acronym',
	'address',
	// 'applet', // intentionally commented out due to IE 11 java update popup
	'area',
	'article',
	'aside',
	'audio',
	'b',
	'base',
	'basefont',
	'bdi',
	'bdo',
	'bgsound',
	'big',
	'blink',
	'blockquote',
	'body',
	'br',
	'button',
	'canvas',
	'caption',
	'center',
	'cite',
	'code',
	'col',
	'colgroup',
	'command',
	'content',
	'data',
	'datalist',
	'dd',
	'del',
	'details',
	'dfn',
	'dialog',
	'dir',
	'div',
	'dl',
	'dt',
	'element',
	'em',
	'embed',
	'fieldset',
	'figcaption',
	'figure',
	'font',
	'footer',
	'form',
	'frame',
	'frameset',
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'head',
	'header',
	'hgroup',
	'hr',
	'html',
	'i',
	'iframe',
	'image',
	'img',
	'input',
	'ins',
	'isindex',
	'kbd',
	'keygen',
	'label',
	'legend',
	'li',
	'link',
	'listing',
	'main',
	'map',
	'mark',
	'marquee',
	'math',
	'menu',
	'menuitem',
	'meta',
	'meter',
	'multicol',
	'nav',
	'nextid',
	'nobr',
	'noembed',
	'noframes',
	'noscript',
	'object',
	'ol',
	'optgroup',
	'option',
	'output',
	'p',
	'param',
	'picture',
	'plaintext',
	'pre',
	'progress',
	'q',
	'rb',
	'rbc',
	'rect',
	'rp',
	'rt',
	'rtc',
	'ruby',
	's',
	'samp',
	'script',
	'section',
	'select',
	'shadow',
	'slot',
	'small',
	'source',
	'spacer',
	'span',
	'strike',
	'strong',
	'style',
	'sub',
	'summary',
	'sup',
	'svg',
	'table',
	'tbody',
	'td',
	'template',
	'textarea',
	'tfoot',
	'th',
	'thead',
	'time',
	'title',
	'tr',
	'track',
	'tt',
	'u',
	'ul',
	'use',
	'var',
	'video',
	'wbr',
	'xmp'
];

test('getData()', function (t) {
	t.equal(typeof getData, 'function', 'is a function');

	var data = getData();
	t.equal(isArray(data.elements), true, 'data.elements is an array');

	t.equal(data.unknown, global.HTMLUnknownElement, '"unknown" is present');
	t.equal(data.all, global.HTMLElement, '"all" is present');

	t.test('all the elements', function (st) {
		forEach(data.elements, function (item) {
			st.test(inspect(item), function (s2t) {
				s2t.comment(item.tag);
				s2t.equal(typeof item.tag, 'string', 'tag is a string');
				s2t.ok(item.tag, 'tag is not empty');

				s2t.equal(typeof item.constructorName, 'string', 'constructorName is a string');
				s2t.ok(item.constructorName, 'constructorName is not empty');

				testConstructor(s2t, item.constructor, item.tag, item.constructorName, 'constructor');
				testConstructor(s2t, item.expectedConstructor, item.tag, item.constructorName, 'expected constructor');

				s2t.end();
			});
		});

		st.end();
	});

	forEach(htmlTags, function (tag) {
		t.ok(
			data.elements.some(function (item) { return item.tag === tag; }),
			tag + ' is in the data'
		);
	});

	t.end();
});
