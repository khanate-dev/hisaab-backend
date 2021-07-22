const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const fkAddValidator = require('../helpers/fkAddValidator');

const IncomeBudget = new mongoose.Schema(
	{
		incomeCategory: {
			type: Schema.Types.ObjectId,
			ref: 'incomeCategory',
			required: true,
			immutable: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model("incomeCategory"), id, 'incomeCategory')
				),
            },
		},
		year: {
			type: Number,
			required: true,
			immutable: true,
			min: 0,
		},
		month: {
			type: Number,
			required: true,
			immutable: true,
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
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
			immutable: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model("user"), id, 'user')
				),
            },
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
);

module.exports = IncomeBudget;