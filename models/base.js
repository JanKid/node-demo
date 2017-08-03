var mongoose = require('mongoose');
var sqlServer = require('../server.config').sqlServer
var Schema = mongoose.Schema;
var models = require("./index");

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${sqlServer.host}:${sqlServer.port}/${sqlServer.database}`,{ useMongoClient:true })

for(var m in models){ 
    mongoose.model(m,new Schema(models[m]));
}

var _getModel = function(type){ 
    return mongoose.model(type);
};

module.exports = { 
    getModel: function(type){ 
       return _getModel(type);
    }
};


