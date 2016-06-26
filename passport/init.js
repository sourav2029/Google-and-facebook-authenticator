var login = require('./login');
var signup = require('./signup');
var facebook =require('./facebook');
var google=require('./google');
var User = require('../models/User_Schema');
console.log("init.js called");
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    /*passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user);
    });*/

  /*  passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:',user);
            done(err, user);
        });
    });
*/
    // Setting up Passport Strategies for Login and SignUp/Registration
    passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });


    login(passport);
    signup(passport);
    facebook(passport);
    google(passport);

}
