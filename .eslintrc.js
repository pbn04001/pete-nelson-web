module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "react/require-extension": "off",
    "max-len": [2, 150, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignorePattern": "\\s*<"
    }],
    "generator-star-spacing": 0,
    "brace-style": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": "off",
    "no-prototype-builtins": "off",
    "no-underscore-dangle": "off",
    "no-undef": "off",
    "no-param-reassign": "off",
    "object-shorthand": "off",
    "func-names": "off",
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
