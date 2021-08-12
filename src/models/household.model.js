const mongoose = require( 'mongoose');

const fkDeleteCascade = require('../helpers/fkDeleteCascade');

const Household = new mongoose.Schema( {
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	inviteCode: {
		type: String,
		required: true,
		unique: true,
	},
});

Household.pre('findOneAndDelete', function (next) {

	const children = ['incomeCategory', 'incomeBudget', 'income', 'expenseCategory', 'expenseBudget', 'expense', 'userHousehold'];

	fkDeleteCascade('household', children, this.getQuery()._id, next);

});

module.exports = Household;