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
		deprecated: {
			type: Boolean,
			default: false,
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

module.exports = IncomeCategory;