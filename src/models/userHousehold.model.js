const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const fkAddValidator = require('../helpers/fkAddValidator');

const UserHousehold = new mongoose.Schema(
	{
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
		role: {
			type: String,
			enum: ['admin', 'user', 'guest'],
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: false,
		},
		isDefault: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

UserHousehold.index(
	{
		user: 1,
		household: 1,
	},
	{
		unique: true,
	},
);

UserHousehold.index(
	{
		user: 1,
		household: 1,
		isDefault: 1,
	},
	{
		unique: true,
		partialFilterExpression: {
			isDefault: true,
		},
	},
);

UserHousehold.pre('findOneAndUpdate', function (next) {

	const children = ['incomeBudget', 'income', 'expenseBudget', 'expense', 'userHousehold'];

	fkDeleteCascade('user', children, this.getQuery()._id, next);

});


module.exports = UserHousehold;