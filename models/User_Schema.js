var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var User_Schema= new Schema({
  email : String,
  password : String ,
  facebook : {
  id :String,
  token : String,
  name :String,
  email :String
},
google : {
  id: String,
  token : String,
  name : String,
  email : String
}
});

module.exports=mongoose.model('User',User_Schema);
