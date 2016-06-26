var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}
console.log("Enters index.js\n");

module.exports = function(passport){

  router.get('/welcome', isAuthenticated,function(req, res) {
		var name;
		if(req.user.facebook.email)
		name="You logged in with your facebook account . Your email is :"+req.user.facebook.email;
		else if(req.user.google.email){
		name="You logged in with your google account . Your email is :"+req.user.google.email;
		}
		else {
			name ="You continued with your email. Your email is: "req.user.email;
		}
    res.render('welcome', { title: 'Success' , name : name});
    console.log(req);
  });

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("request found");
});

router.get('/login_options',function(req,res,next){
  res.render('login_options',{title : 'Login Options'});
});

router.get('/login',function(req,res,next){
  res.render('login',{title : 'Login', error: ''});
});

router.get('/signup_options',function(req,res,next){
  res.render('signup_options',{title : 'Signup Options'});
});

router.get('/signup_options2',function(req,res,next){
  res.render('signup_options2',{title : 'Signup Options'});
});

router.get('/signup',function(req,res,next){
  res.render('signup',{title : 'Signup'});
});


router.post('/login',urlencodedParser, passport.authenticate('login', {
		successRedirect: '/welcome',
		failureRedirect: '/login_options',
    	//failureFlash : true
	}));

	/*router.post('/signup', urlencodedParser, function(req, res, next) {
        passport.authenticate('signup', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
						console.log(user);
            if (! user) {
                console.log('Got the following back');
                console.log('Error: ' + err);
                console.log('User: ' + user);
                info = JSON.stringify(info);
                console.log('Info: '+ info);
                    for(var key in info) {
                        console.log(key);
                    }
                var userd = JSON.stringify(req.body);
            console.log('Request : ' + userd);
                return res.send({ success : false, message : 'authentication failed'});
            }
            return res.send({ success : true, message : 'authentication succeeded' });
          })(req, res, next);

    });*/
router.post('/signup',urlencodedParser, passport.authenticate('signup',{
		successRedirect: '/welcome',
		failureRedirect: '/signup',
    	//failureFlash : true
	}));

	router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email']}));
	router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/welcome');
  });
	router.get('/auth/facebook', passport.authenticate('facebook',{scope : ['email']}));
	router.get('/auth/facebook/callback',
	  passport.authenticate('facebook', { successRedirect: '/welcome',
	                                      failureRedirect: '/login' }));
return router;
}
