module.exports = {
  parserOptions: {
    ecmaVersion: 2020, // vous permet d'utiliser des fonctionnalités modernes d'ECMAScript
    sourceType: 'module', // vous permet d'utiliser les imports
    ecmaFeatures: {
      jsx: true, // vous permet d'utiliser JSX
    },
  },

  rules: {
    indent: ['error', 2],
    // ...autres règles
  },
};
