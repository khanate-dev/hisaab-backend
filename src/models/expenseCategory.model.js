const mongoose = require( 'mongoose');

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

module.exports = ExpenseCategorySchema;