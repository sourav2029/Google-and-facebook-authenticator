var LocalStrategy   = require('passport-local').Strategy;
var User =require('../models/User_Schema');
var bCrypt = require('bcrypt-nodejs');
console.log("login.js called");
module.exports = function(passport){
console.log("Inside login")
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({ 'email' :  username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false);
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        })
    );

    console.log("Inside strategy")
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

}
