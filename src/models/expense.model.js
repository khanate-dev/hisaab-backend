const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const fkAddValidator = require('../helpers/fkAddValidator');

const Expense = new mongoose.Schema(
	{
		expenseCategory: {
			type: Schema.Types.ObjectId,
			ref: 'expenseCategory',
			required: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model("expenseCategory"), id, 'expenseCategory')
				),
            },
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
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model("user"), id, 'user')
				),
            },
		},
	},
	{
		timestamps: true,
		runValidators: true,
	}
);

module.exports = Expense;