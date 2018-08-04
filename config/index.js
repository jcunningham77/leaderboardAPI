var configValues = require('./config');

module.exports = {
    getDBConnectionString:function(){
        return 'mongodb://'+ configValues.uname+':'+configValues.password+'@ds261460.mlab.com:61460/leaderboard';
    
    }


    
};