var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema(
    {
        player1Name: {
            type: String
        },
        player2Name: {
            type: String
        },
        player1Score:{
            type:Number
        },
        player2Score:{
            type:Number
        }
    }
);


var match = mongoose.model('match', matchSchema);

module.exports = match;
