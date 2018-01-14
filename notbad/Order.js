const mongoose = require('./dbHelper').mongoose;

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	name: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'Order',
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
});


module.exports = mongoose.model('Order', orderSchema);
