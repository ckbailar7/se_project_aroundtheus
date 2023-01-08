const presets = [
  [
    "@babel/preset-env",
    {
      //preset you want to use
      //browser versions in which we want our code supported
      targets: "defaults, not IE 11, not dead",

      //use Polyfills for the browser specified in the above targets option
      // Babel uses Polyfills from the core-js library
      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = { presets };
