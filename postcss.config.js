//connect plugins to the file
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  //connect plugins
  plugins: [
    autoprefixer,
    //pass an object with options upon connecting cssnano
    cssnano({ preset: "default" }),
  ],
};
