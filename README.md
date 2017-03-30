

**

LIRI Node App
-------------

**

LIRI: Language Interpretation and Recognition Interface

LIRI is a command line node app that takes in parameters and gives you back data. 

The first two arguments are node liri.js (process.argv[0] and process.argv[1]). It takes the 3rd command line argument as the action to be taken.  Any argument beginning at or after the 4th command line argument will be considered the title for which to search, if required.

**LIRI has four functions or actions:**

1: my-tweets
LIRI will display my last 20 tweets through the Twitter API.
Example: node liri.js my-tweets

2: spotify-this-song
LIRI will search for the song in the Spotify API and display track information about the results including links.
Example: node liri.js spotify-this-song somewhere over the rainbow

3: movie-this
LIRI will search for the movie on the OMDb API and display information about the movie including links to Rotten Tomatoes
Example: node liri.js movie-this fight club

4: do-what-it-says
LIRI will read the file random.txt and take in the action and title contained within to perform a Twitter API,  Spotify API, or OMDb API search.
Example: node liri.js do-what-it-says

   