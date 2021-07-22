const mongoose = require('mongoose');

const fkDeleteValidator = require('../helpers/fkDeleteValidator');

const IncomeCategory = new mongoose.Schema(
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


IncomeCategory.pre('remove', async next => {

	const children = ['incomeBudget', 'income'];

	await fkDeleteValidator('incomeCategory', children, this._id);

});

module.exports = IncomeCategory;