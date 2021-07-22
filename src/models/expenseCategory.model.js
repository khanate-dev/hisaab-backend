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

IncomeCategory.pre('findOneAndDelete', function (next) {

	const children = ['incomeBudget', 'income'];

	fkDeleteValidator('incomeCategory', children, this.getQuery()._id, next);

});

module.exports = ExpenseCategorySchema;