var express = require('express');
var app = express();
 app.use(express.static('public'))
 app.get('/', function(req, res){
 res.send("Hello world! by express");
});


var express = require('express')
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
app.use(express.static('public'));

var spotifyApi = new SpotifyWebApi({
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
    async function getTracks(searchterm, res) { 
    spotifyApi.searchTracks(searchterm)
        .then(function (data) {
        var tracks = data.body.tracks.items 
        //lets set up a empty string to act as the response
        var HTMLResponse = "";
        //now lets run through all the items
        //this is a for loop 
        for(var i=0; i<tracks.length;i++){
        
        var track = tracks[i];
        console.log(track.name);
        HTMLResponse = HTMLResponse +
        "<div>" +
            "<h2>"+track.name+"</h2>"+
            "<h4>"+track.artists[0].name+"</h4>"+
            "<img src='"+track.album.images[0].url +">"+
            "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+
        "</div>";
            console.log(HTMLResponse);
            }
            res.send(HTMLResponse)
        }, function (err) {
            console.error(err);
        })};

    
    //route for searching in tracks, artists and albums
    
    app.get('/postform', function (req, res) {
        var searchterm = req.query.searchterm;
        getTracks(searchterm, res);
   });
   
   async function getTopTracks(artist, res) {
        spotifyApi.getArtistTopTracks(artist,'GB')
        .then(function (data) {
            console.log(data.body);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
   }

   async function getRelated(artist, res) {
        spotifyApi.getArtistRelatedArtists(artist)
            .then(function (data) {
                console.log(data.body);
        }, function (err) {
                dconsole.log('Something went wrong!', err);
        });
   }
   
   
    app.listen(8080);