module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "standard",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  "env": {
    "jest": true,
  },
  "globals": {
    "config": false,
    "runChain": false,
    "runAction": false,
  },
  "rules": {
    "comma-dangle": [2, "always-multiline"],
    "object-curly-spacing": [2, "always"],
    "array-bracket-spacing": [2, "never"],
    "import/no-unresolved": [2, { "ignore": ["^config$"] }],
    "import/order": [2, { "newlines-between": "always" }],
    "jsx-quotes": [2, "prefer-double"],
    "react/jsx-curly-spacing": [2, "never"],
  },
}
