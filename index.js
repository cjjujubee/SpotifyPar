    var unirest = require('unirest');
    var express = require('express');
    var events = require('events');

    var getFromApi = function(endpoint, args) {
        var emitter = new events.EventEmitter();
        unirest.get('https://api.spotify.com/v1/' + endpoint)
            .qs(args)
            .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                } else {
                    emitter.emit('error', response.code);
                }
            });
        return emitter;
    };

    var app = express();
    app.use(express.static('public'));

    app.get('/search/:name', function(req, res) {
        var searchReq = getFromApi('search', {
            q: req.params.name,
            limit: 1,
            type: 'artist'
        });

        searchReq.on('end', function(item) {
            var artist = item.artists.items[0];
            var artistid = item.artists.items[0].id;
            var searchReqid = getFromApi('artists', {
                id: artistid,
                limit: 3,
                type: 'artist'
            });
            searchReqid.on('end', function(iditem) {
                res.json(iditem);
            });


            // searchReq.on('end', function(item) {
            // var artistid = item.artists.items[0].id;
            //     res.json(artistid);
            // });

            searchReq.on('error', function(code) {
                res.sendStatus(code);
            });
        });
    });
    app.listen(8080);


    // var events = require('events');
    //
    // var progressBar = new events.EventEmitter();
    //
    // progressBar.on('onStart', function(count) {
    //   console.log('Started at: ' + count);
    // });
    //
    // progressBar.on('onProgress', function(count) {
    //   console.log('You are currently at: ' + count + '%');
    // });
    //
    // progressBar.on('onEnd', function(count) {
    //   console.log('All done at ' + count + '!');
    // });
    //
    // for (var i = 0; i <= 100; i++) {
    //     if (i === 0) {
    //       progressBar.emit('onStart', i);
    //     }
    //     else if (i === 100) {
    //       progressBar.emit('onEnd', i);
    //     }
    //     else if (i % 10 === 0) {
    //       progressBar.emit('onProgress', i);
    //     }
    // }
