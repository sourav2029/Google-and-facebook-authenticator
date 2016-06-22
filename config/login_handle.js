var user=require('../models/User_Schema');
module.exports=function(req,res){
  var email=req.body.email;
  var password=req.body.password;
  console.log(email+" and" +password);
  if(!email || !password)
  {
    console.log("Email or Password missing\n");
    res.render('login',{title:'Errorm', error:'Email or Password missing'});
  }
  else{
		user.findOne({'email':email,'password':password}).count(function(err,count){
			if(count==0)
				res.render('login',{title:'Errorw',error:'wrong Username or password'});
			else
				{
					res.render('welcome',{name:email ,title:'Successful Login'});
				}
		});
}
}
