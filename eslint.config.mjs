import ljharb from '@ljharb/eslint-config/flat';
import globals from 'globals';

export default [
	...ljharb,
	{
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			'array-bracket-newline': 'off',
		},
	},
	{
		files: ['test/**'],
		rules: {
			complexity: 'off',
		},
	},
];
