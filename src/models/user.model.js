const mongoose = require( 'mongoose');

const User = new mongoose.Schema( {
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}
});

module.exports = User;