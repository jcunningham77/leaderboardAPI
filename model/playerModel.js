var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema(
    {
        name: {
            type: String
        },
        matchesWon: {
            type: Number
        },
        matchesPlayed: {
            type: Number
        }
    }
);


var player = mongoose.model('player', playerSchema);

module.exports = player;
