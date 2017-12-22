const mongoose = require('./dbHelper').mongoose;

const Schema = mongoose.Schema;

const orderSum = new Schema({
	sum: {
		type: Number,
		default: 0
	},
	id: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'OrderSum',
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});


module.exports = mongoose.model('OrderSum', orderSum);
