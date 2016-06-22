var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var User_Schema= new Schema({
  email : String,
  password : String
});

module.exports=mongoose.model('users',User_Schema);
