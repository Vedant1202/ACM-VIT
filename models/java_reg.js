
//======================================================================
//                           Java Event Registration Schema
//======================================================================


var mongoose = require('mongoose');


//set up Admin
var javaRegSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneno: Number,
  rollno: String,
  year: String,
  branch: String,
  division: String
});

//Export model
module.exports = mongoose.model("javaReg", javaRegSchema);
