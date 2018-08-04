var bodyParser = require('body-parser');
var Match = require('../model/matchModel');

module.exports = function upload(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


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

        var match = new Match({
            player1Name: req.body.data.player1Name,
            player2Name: req.body.data.player2Name,
            player1Score: req.body.data.player1Score,
            player2Score: req.body.data.player2Score,
        });


    });

}