const mongoose = require('mongoose');
const bluebird = require('bluebird');

const db = mongoose.connection;
const options = {
	useMongoClient: true,
	promiseLibrary: bluebird,
	autoReconnect: true,
	poolSize: 100
};

const mongodbURL = 'mongodb://localhost:27017/loser';
mongoose.Promise = bluebird;
mongoose.connect(mongodbURL, options);

db.on('error', (err) => {
	console.log('mongodb connect error, url: ' + mongodbURL, err);
});
db.once('open', () => {
	console.log('mongodb connection open, url: ' + mongodbURL);
});
db.on('connected', () => {
	console.log('mongodb connected , url: ' + mongodbURL);
});
db.on('reconnected', () => {
	console.log('mongodb reconnected , url: ' + mongodbURL);
});


exports.mongoose = mongoose;
