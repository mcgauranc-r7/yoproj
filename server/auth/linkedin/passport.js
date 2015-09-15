exports.setup = function (User, config) {
  var passport = require('passport');
  var LinkedInStrategy = require('passport-linkedin').Strategy;
   passport.use(new LinkedInStrategy({
    consumerKey: "77hgbjkqz3u0xi",
    consumerSecret: "MONdRYy5Truq1DLf",
    callbackURL: config.linkedin.callbackURL
  },
       function(accessToken, refreshToken, profile, done) {
           console.log(profile)
           User.findOne({
                   'linkedin.id': profile.id
               },
               function(err, user) {
                   if (err) {
                       return done(err);
                   }
                   if (!user) {
                       user = new User({
                           name: profile.displayName,
                           email: "",
                           role: 'user',
                           username: profile.username,
                           provider: 'linkedin',
                           linkedin: profile._json
                       });
                       user.save(function(err) {
                           if (err) return done(err);
                           done(err, user);
                       });
                   } else {
                       return done(err, user);
                   }
               })
       }
  ));
};
