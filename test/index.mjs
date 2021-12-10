import * as Module from 'html-element-map';
import test from 'tape';

test('named exports', async (t) => {
	t.deepEqual(
		Object.keys(Module).sort(),
		['byTag', 'byConstructor', 'byConstructorName'].sort(),
		'has expected named exports',
	);

	const { byTag, byConstructor, byConstructorName } = Module;
	t.equal((await import('html-element-map/byTag')).default, byTag, 'byTag named export matches deep export');
	t.equal((await import('html-element-map/byConstructor')).default, byConstructor, 'byConstructor named export matches deep export');
	t.equal((await import('html-element-map/byConstructorName')).default, byConstructorName, 'byConstructorName named export matches deep export');

	t.end();
});
