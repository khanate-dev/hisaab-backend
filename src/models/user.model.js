const mongoose = require( 'mongoose');

const fkDeleteCascade = require('../helpers/fkDeleteCascade');

const User = new mongoose.Schema( {
	username: {
		type: String,
		required: true,
		unique: true,
		immutable: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		immutable: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		required: true,
		immutable: true,
	},
});

User.pre('findOneAndDelete', function (next) {

	const children = ['incomeBudget', 'income', 'expenseBudget', 'expense', 'userHousehold'];

	fkDeleteCascade('user', children, this.getQuery()._id, next);

});

module.exports = User;