# html-element-map <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

Look up HTML tag names via HTML Element constructors, and vice versa.

## Entry points

### `byTag`

```js
const assert = require('assert');
const byTag = require('html-element-map/byTag');
// or: import byTag from 'html-element-map/byTag';
// or: import { byTag } from 'html-element-map';

assert.deepEqual(
		byTag('a'),
		[{
				constructor: window.HTMLAnchorElement,
				constructorName: 'HTMLAnchorElement',
				expectedConstructor: window.HTMLAnchorElement,
				tag: 'a'
		}],
);
```

### `byConstructor`

```js
const assert = require('assert');
const byConstructor = require('html-element-map/byConstructor');
// or: import byConstructor from 'html-element-map/byConstructor';
// or: import { byConstructor } from 'html-element-map';

assert.deepEqual(
		byConstructor(window.HTMLAnchorElement),
		[{
				constructor: window.HTMLAnchorElement,
				constructorName: 'HTMLAnchorElement',
				expectedConstructor: window.HTMLAnchorElement,
				tag: 'a'
		}],
);
```

### `byConstructorName`

```js
const assert = require('assert');
const byConstructorName = require('html-element-map/byConstructorName');
// or: import byConstructorName from 'html-element-map/byConstructorName';
// or: import { byConstructorName } from 'html-element-map';

assert.deepEqual(
		byConstructorName('HTMLAnchorElement'),
		[{
				constructor: window.HTMLAnchorElement,
				constructorName: 'HTMLAnchorElement',
				expectedConstructor: window.HTMLAnchorElement,
				tag: 'a'
		}],
);
```

[package-url]: https://npmjs.org/package/html-element-map
[npm-version-svg]: https://versionbadg.es/ljharb/html-element-map.svg
[deps-svg]: https://david-dm.org/ljharb/html-element-map.svg
[deps-url]: https://david-dm.org/ljharb/html-element-map
[dev-deps-svg]: https://david-dm.org/ljharb/html-element-map/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/html-element-map#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/html-element-map.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/html-element-map.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/html-element-map.svg
[downloads-url]: https://npm-stat.com/charts.html?package=html-element-map
[codecov-image]: https://codecov.io/gh/ljharb/html-element-map/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/ljharb/html-element-map/
[actions-image]: https://img.shields.io/github/check-runs/ljharb/html-element-map/main
[actions-url]: https://github.com/ljharb/html-element-map/actions
