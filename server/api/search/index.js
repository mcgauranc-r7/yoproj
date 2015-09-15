'use strict';

var express = require('express');
var controller = require('./search.controller');
var router = express.Router();

var settings = {
    consumerKey: "77hgbjkqz3u0xi",
    consumerSecret: "MONdRYy5Truq1DLf"
}
var Linkedin  = require('node-linkedin')(settings.consumerKey, settings.consumerSecret, "http://localhost:9000/search/oauth/linkedin/callback");


// Using a library like `expressjs` the module will
// redirect for you simply by passing `res`.
router.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url.
    Linkedin.auth.authorize(res, ['r_basicprofile']);
});

// Again, `res` is optional, you could pass `code` as the first parameter
// Be sure to pass the `state` parameter to verify no CSRF intrusion, see [step 2 here](https://developer.linkedin.com/docs/oauth2)
router.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
        if ( err )
            return console.error(err);
        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */

        console.log(results);
        return res.redirect('/');
    });
});

module.exports = router;
