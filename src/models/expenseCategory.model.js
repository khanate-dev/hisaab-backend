const mongoose = require( 'mongoose');

const fkDeleteValidator = require('../helpers/fkDeleteValidator');

const ExpenseCategorySchema = new mongoose.Schema(
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