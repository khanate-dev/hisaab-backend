const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const fkAddValidator = require('../helpers/fkAddValidator');

const Income = new mongoose.Schema(
	{
		incomeCategory: {
			type: Schema.Types.ObjectId,
			ref: 'incomeCategory',
			required: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model('incomeCategory'), id, 'incomeCategory')
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
		addedBy: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model('user'), id, 'user')
				),
            },
		},
		lastEditBy: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model('user'), id, 'user')
				),
            },
		},
		household: {
			type: Schema.Types.ObjectId,
			ref: 'household',
			required: true,
			immutable: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model('household'), id, 'household')
				),
            },
		},
	},
	{
		timestamps: true,
	},
);

module.exports = Income;