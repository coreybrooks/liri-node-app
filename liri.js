var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var keysINeed = require("./keys.js");
var keys = keysINeed.twitterKeys;

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var action = process.argv[2];

switch(action) {
 
   case 'my-tweets': 
   client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=coreybrooks212&count=20', function(error, tweets, response) {
   if(error) throw error;

      for(i=0; i<tweets.length; i++) {
       console.log(JSON.stringify(tweets[i].created_at));
       console.log(JSON.stringify(tweets[i].text));
       console.log('--------------------------');
      }
   });
   break;

   case 'test':
   console.log('test is working');
   break;

}

