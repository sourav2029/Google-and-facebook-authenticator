var passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth =require('../models/auth');
var User =require('../models/User_Schema');

module.exports=function(passport){
  console.log("Inside google");
  passport.use(new GoogleStrategy({
     clientID: configAuth.GoogleAuth.clientID,
    clientSecret:configAuth.GoogleAuth.clientSecret,
    callbackURL: configAuth.GoogleAuth.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    console.log(profile);
      // asynchronous
      process.nextTick(function() {
          // find the user in the database based on their facebook id
          User.findOne({ 'google.id' : profile.id }, function(err, user) {

              // if there is an error, stop everything and return that
              // ie an error connecting to the database
              if (err)
                  return done(err);

              // if the user is found, then log them in
              if (user) {
                  return done(null, user); // user found, return that user
              } else {
                  // if there is no user found with that facebook id, create them
                  var newUser= new User();

                  // set all of the facebook information in our user model
                  newUser.google.id    = profile.id; // set the users facebook id
                  newUser.google.token = token; // we will save the token that facebook provides to the user
                  newUser.google.name  = profile.displayName; // look at the passport user profile to see how names are returned
                  newUser.google.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                  // save our user to the database
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      // if successful, return the new user
                      return done(null, newUser);
                  });
              }

          });
      });
  }
));
}
