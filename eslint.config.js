import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: ['js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                document: 'readonly',
                window: 'readonly',
                IntersectionObserver: 'readonly',
            },
        },
        rules: {
            // Стиль коду
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            curly: ['error', 'all'],
            'dot-notation': 'error',

            // Якість коду
            'no-unused-vars': 'error',
            'no-console': 'warn',
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
            'no-use-before-define': ['error', { functions: false }],

            // Безпека
            'no-eval': 'error',
            'no-implied-eval': 'error',
            'no-script-url': 'error',
        },
    },
    {
        // Ігнорувати залежності та згенеровані файли
        ignores: ['node_modules/**', 'dist/**', '.git/**'],
    },
];
