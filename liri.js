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

var nodeArgs = process.argv;
var action = nodeArgs[2];
var title = '';
var rotTitle = '';

//below builds the title for spotify and IMBD
for (i=3; i<nodeArgs.length; i++) {
    if(i>3 && i<nodeArgs.length) {
    title = title + '+' + nodeArgs[i].toLowerCase();
    }
    else {
        title += nodeArgs[i].toLowerCase();
    }
}

//below builds the title for the Rotten Tomatoes URL
for (i=3; i<nodeArgs.length; i++) {
    if(i>3 && i<nodeArgs.length) {
    rotTitle = rotTitle + '_' + nodeArgs[i].toLowerCase();
    }
    //below creates the first word of the Rotten tomatoes URL, but does not include 'the'
    else if (nodeArgs[3].toLocaleLowerCase() !== 'the') {
        rotTitle += nodeArgs[i].toLowerCase();
    }
  }
//below removes the first character of the Rotten Tomatoes URL if it is '_'
if (rotTitle.charAt(0) === '_') {
    rotTitle = rotTitle.substring(1);
}

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

   case 'spotify-this-song':
      spotify.search({ type: 'track', query: title }, function(err, data) {
        if ( err ) {
          console.log('Error occurred: ' + err);
          return;
        }
        //below makes the default song 'The Sign' by Ace of Base when no song is entered
        //or no results are found
        if (title === '' || data.tracks.items.length === 0) {
            console.log('Sorry, no results.  Here is your default song:');
            console.log('Artist: Ace of Base');
            console.log('Song Title: The Sign');
            console.log("{ spotify: 'https://open.spotify.com/track/3DYVWvPh3kGwPasp7yjahc' }");
            console.log('Album: The Sign (US Album) [Remastered]');
        }
        else {
            for (i=0; i<data.tracks.items.length; i++) {         
            console.log('Artist: ' + data.tracks.items[i].album.artists[0].name);
            console.log('Song Title: ' + data.tracks.items[i].name);
            console.log(data.tracks.items[i].external_urls);
            console.log('Album: ' + data.tracks.items[i].album.name);
            console.log('------------------------');          
           }
        }
      });
   break;

   case 'movie-this':
       var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";
       console.log(queryUrl);
       request(queryUrl, function(error, response, body) {
          if (!error && response.statusCode === 200) {
           console.log('Movie Title: ' + JSON.parse(body).Title);
           console.log("Release Year: " + JSON.parse(body).Year);
           console.log('Rated: ' + JSON.parse(body).Rated);
           console.log('Country where the movie was produced: ' + JSON.parse(body).Country);
           console.log('Language of the movie: ' + JSON.parse(body).Language);
           console.log('Plot of the movie: ' + JSON.parse(body).Plot);
           console.log('Actors in the movie: ' + JSON.parse(body).Actors);
           console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
           console.log('Rotten Tomatoes URL: ' + 'https://www.rottentomatoes.com/m/' + rotTitle);
          }
       });
   break;

   case 'do-what-it-says':
   break;
}

