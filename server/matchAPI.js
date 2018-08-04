var bodyParser = require('body-parser');
var Match = require('../model/matchModel');

module.exports = function upload(app) {

    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended:true}));


    app.get('/api/matches',function(req,res){

        Match.find(function (err, players) {
            if (err) {
                return console.error(err);
            } else {
                // console.log(picks);
                res.status('200').send(players);
            }

        })


    });
    app.post('/api/match',function(req,res){

        console.log(JSON.stringify(req.body.data));
        console.log('here');
        var match = new Match({
            player1Name: req.body.player1Name,
            player2Name: req.body.player2Name,
            player1Score: req.body.player1Score,
            player2Score: req.body.player2Score,
        });



        match.save(function (err, bet, numAffected) {
            if (err) {
                console.log(err);
                res.status('500').send(err);

            } else if (bet) {
                console.log('successfully persisted ' + numAffected + ' bet = ' + bet);
                res.status('200').send(bet);
            }
        });


    });

}