    var unirest = require('unirest');
    var express = require('express');
    var events = require('events');

    var app = express();
    app.use(express.static('public'));

    var getFromApi = function(endpoint, args) {
        var emitter = new events.EventEmitter();
        unirest.get('https://api.spotify.com/v1/' + endpoint)
            .qs(args)
            .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                } else {
                    console.log('I am an error');
                    emitter.emit('error', response.code);
                }
            });
        return emitter;
    };

    //retrieves top tracks for an artist
    var getTracks = function(artist, callback) {
      var topTracksReq = getFromApi('artists/'+artist.id+'/top-tracks', {country: 'US'});
      topTracksReq.on('end', function(topTracks) {
        artist.tracks = topTracks.tracks; //sets artist.tracks specific artist's popular tracks
        callback(null);
      });
      topTracksReq.on('error', function(error) {
        callback(error);
      });
    };

    app.get('/search/:name', function(req, res) {
        var searchReq = getFromApi('search', {
            q: req.params.name,
            limit: 1,
            type: 'artist'
        });

        searchReq.on('end', function(item) {
            var artist = item.artists.items[0];
            searchReq.emit('getRelatedArtists', artist);
        });

        searchReq.on('error', function(code) {
            res.sendStatus(code);
        });

        searchReq.on('getRelatedArtists', function (artist) {
          var relatedRequest = getFromApi('artists/'+artist.id+'/related-artists');
          relatedRequest.on('end', function(relatedArtists) {
            artist.related = relatedArtists.artists; //gets the array of artists objects

            var completed = 0;

            var checkComplete = function() {
                if (completed === relatedArtists.artists.length) {
                    res.json(artist);
                }
            };

            for(var i = 0; i < relatedArtists.artists.length; i++) {
              getTracks(relatedArtists.artists[i], function(error) {
                if (error) {
                  res.sendStatus(error);
                }
                completed += 1;
                checkComplete();
              });
            }
          });
        });
    });
    app.listen(8080);
