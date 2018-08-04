var bodyParser = require('body-parser');
var Match = require('../model/matchModel');
var Player = require('../model/playerModel');
// import Rx from 'rxjs/Rx';
// var Rx = require('rxjs/Rx');
const Rx = require('rxjs/Rx');



Rx.Observable.of(1, 2, 3);

module.exports = function upload(app) {

    app.use(bodyParser.json());
    // app.use(bodyParser.urlencoded({extended:true}));


    app.get('/api/matches',function(req,res){



        var result = Rx.Observable.fromPromise(Match.find(null));
        result.subscribe(x => {
            console.log(x);res.status('200').send(x)}
            , e => {console.error(e);res.status('500').send(e)}
        );

        


    });




    app.post('/api/match',function(req,res){

                // var result = Rx.Observable.fromPromise(Match.find(null))
        //             .flatMap(function(x){
        //                 if(x.player1Score>x.player2Score){
        //                     console.log("player 1 won");
        //                 }
        //             })
        // ;

        
        var match = new Match({
            player1Name: req.body.player1Name,
            player2Name: req.body.player2Name,
            player1Score: req.body.player1Score,
            player2Score: req.body.player2Score,
        });

        var result = Rx.Observable.fromPromise(match.save(null)).flatMap(match=>{
            var matchOutcome = determineMatchOutcome(match);
            console.log("in flatmap");
            var winningPlayer = new Player({
                name: matchOutcome[0],
                matchesWon: 9,
                matchesPlayed:1
            })
            var losingPlayer = new Player({
                name: matchOutcome[1],
                matchesWon: 0,
                matchesPlayed:1
            })
            winningPlayer._id = null;
            
            var query = {name:winningPlayer.name};
            var fieldsToUpdate = {name:winningPlayer.name,matchesWon:winningPlayer.matchesWon,matchesPlayed:winningPlayer.matchesPlayed};
            var options = { upsert: true ,new:true};
            var winnerSaveObservable = Rx.Observable.fromPromise(Player.findOneAndUpdate(query,fieldsToUpdate,options,null).exec());
            // var winnerSaveObservable = Rx.Observable.fromPromise(winningPlayer.update({name:winningPlayer.name},{ upsert: true }).exec());

            // var winnerSaveObservable = Rx.Observable.fromPromise(winningPlayer.save(null));
            var loserSaveObservable = Rx.Observable.fromPromise(losingPlayer.save());
            return Rx.Observable.forkJoin(winnerSaveObservable,loserSaveObservable);
        });



        result.subscribe(x=>{
            
            var winner = x[0];
            var loser = x[1];
            var message = " observable returned winner = " + winner + ", \\n loser = " + loser;
            console.log(message);
            res.status('200').send(message);
        }, e => {
            console.log(e);
            res.status('500').send(e);
        });








     


    });


    /*
        //method returns array of 2 strings, first one the winner, second the loser
    */
    function determineMatchOutcome (match){

        if (match.player1Score>match.player2Score){
            return [match.player1Name,match.player2Name];
        } else {
            return [match.player2Name,match.player1Name];
        }

    }

}