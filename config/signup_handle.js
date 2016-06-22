var user=require('../models/User_Schema');
module.exports=function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  if(!email || !password)
  {
    console.log("Wrong email or password");
    res.render('signup',{title:'Errorm',error:'Email or Password missing'})
  }
  else {
    user.findOne({'email':email}).count(function(err,count){
      if(count>0)
    	res.render('signup',{title:'Signup',error:"User Already exist"});
      else {
        var new_user=new user({
          'email':email,
          'password':password
        });
        new_user.save(function(err){
          if(err) throw err;
          console.log("Error in saving ");
          res.render('welcome',{title:"Signup Successful", name:email});
        });
      }
    });
  }
}
