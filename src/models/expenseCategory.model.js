const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const fkDeleteValidator = require('../helpers/fkDeleteValidator');

const ExpenseCategory = new mongoose.Schema(
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
		household: {
			type: Schema.Types.ObjectId,
			ref: 'household',
			required: true,
			immutable: true,
			validate: {
                validator: (id) => (
					fkAddValidator(mongoose.model("household"), id, 'household')
				),
            },
		},
	},
	{
		timestamps: true,
	}
);

ExpenseCategory.pre('findOneAndDelete', function (next) {

	const children = ['expenseBudget', 'expense'];

	fkDeleteValidator('expenseCategory', children, this.getQuery()._id, next);

});

module.exports = ExpenseCategory;