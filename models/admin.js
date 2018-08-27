
//======================================================================
//                           Message Schema
//======================================================================


var mongoose                = require('mongoose');
    passportLocalMongoose   = require('passport-local-mongoose');

//set up Admin
var adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//Setup methods to admin model
adminSchema.plugin(passportLocalMongoose);

//Export model
module.exports = mongoose.model("admin", adminSchema);
