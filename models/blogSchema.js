
//======================================================================
//                           Blog Schema
//======================================================================

var mongoose = require('mongoose');

// set up schema of database entries
var blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  gist: String,
  bodyOne: String,
  bodyTwo: String,
  bodyThree: String,
  image: String,
  links: String,
  posted: {type: Date, default: Date.now},
});

// create the database variable
module.exports = mongoose.model("blogs", blogSchema);
