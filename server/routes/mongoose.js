var mongoose    = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/mydb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error!:'+ err.message+'3000');
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;


var Data = new Schema({
	dataStr:{type: String},
    modified: { type: Date, default: Date.now }
});


var DataModel = mongoose.model('Data', Data);



module.exports.DataModel = DataModel;
