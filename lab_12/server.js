var express = require('express');
var app = express();
 app.use(express.static('public'))
 app.get('/', function(req, res){
 res.send("Hello world! by express");
});
app.listen(8080);

var express = require('express')
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
app.use(express.static('public'));

var spoifyApi = new SpotifyWebApi({
    clientId:'b6f6e86c386d4423805aa4c75e35d49a',
    clientSecret:'e57b9bc7d95f499ba493b0b161060077',
})

// Retrieve an access token
spotifyApi.clientCredentialsGrant().then( 
    function (data) {
    console.log('The access token expires in' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
            
    
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']); 
    },


    function (err) {
            console.log(
            'Something went wrong when retrieving an access token',
            err.message 
            );
        }
   );

   async function getTracks(searchterm, res) { 
        spotifyApi.searchTracks(searchterm)
            .then(function (data) {
                res.send(JSON.stringify(data.body));
        }, function (err) {
                console.error(err);
        }); 
   }

   //route for love in tracks, artists and albums
    app.get('/searchLove', function (req, res) {
        getTracks('love', res);
    });
   
   