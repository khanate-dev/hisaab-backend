const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const Expense = new mongoose.Schema(
	{
		expenseCategoryID: {
			type: Schema.Types.ObjectId,
			ref: 'expenseCategory',
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		description: {
			type: String,
		},
		userID: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Expense;