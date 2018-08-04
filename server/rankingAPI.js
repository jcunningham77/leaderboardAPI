var bodyParser = require('body-parser');
var Player = require('../model/playerModel');

module.exports = function upload(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.get('/api/rankings',function(req,res){

        Player.find(function (err, players) {
            if (err) {
                return console.error(err);
            } else {
                // console.log(picks);
                res.status('200').send(players);
            }

        })


    });

}