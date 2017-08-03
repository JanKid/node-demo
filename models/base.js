var mongoose = require('mongoose');
var sqlServer = require('../server.config').sqlServer
var Schema = mongoose.Schema;
var models = require("./index");
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${sqlServer.host}:${sqlServer.port}/${sqlServer.database}`,{ useMongoClient:true })
const db = mongoose.connection;
for(var m in models){ 
    mongoose.model(m,new Schema(models[m]));
}

var _getModel = function(type){ 
    return mongoose.model(type);
};



db.once('open' ,() => {
	console.log('连接数据成功')
})

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(`mongodb://${sqlServer.host}:${sqlServer.port}/${sqlServer.database}`,{ useMongoClient:true });
});

module.exports = { 
    getModel: function(type){ 
       return _getModel(type);
    }
};


