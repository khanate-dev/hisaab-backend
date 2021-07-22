const mongoose = require( 'mongoose');

const fkDeleteValidator = require('../helpers/fkDeleteValidator');

const ExpenseCategory = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			immutable: true,
		},
		description: {
			type: String,
		},
		deprecated: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

ExpenseCategory.pre('findOneAndDelete', function (next) {

	const children = ['expenseBudget', 'expense'];

	fkDeleteValidator('expenseCategory', children, this.getQuery()._id, next);

});

module.exports = ExpenseCategory;