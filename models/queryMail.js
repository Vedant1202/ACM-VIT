
//======================================================================
//                           Message Schema
//======================================================================

var mongoose = require('mongoose');

// set up schema of database entries
var querySchema = new mongoose.Schema({
  name: String,
  body: String,
  email: String,
  posted: {type: Date, default: Date.now},
});

// create the database variable
module.exports = mongoose.model("queryMail", querySchema);
