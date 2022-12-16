module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "es6": true,
    },
    "extends": [
        'airbnb-base',
        'airbnb-typescript/base',
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": [
            path.resolve(__dirname, 'tsconfig.json'),
            path.resolve(__dirname, 'tsconfig.eslint.json'),
          ],
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-explicit-any': 'error',
    }
}
