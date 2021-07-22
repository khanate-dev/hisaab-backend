const mongoose = require( 'mongoose');

const IncomeCategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = IncomeCategorySchema;