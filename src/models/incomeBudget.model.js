const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const IncomeBudget = new mongoose.Schema(
	{
		incomeCategoryID: {
			type: Schema.Types.ObjectId,
			ref: 'incomeCategory',
			required: true,
		},
		year: {
			type: Number,
			required: true,
			min: 0,
		},
		month: {
			type: Number,
			required: true,
			min: 1,
			max: 12,
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

IncomeBudget.index(
	{
		incomeCategoryID: 1,
		year: 1,
		month: 1,
	},
	{
		unique: true,
	},
)

module.exports = IncomeBudget;