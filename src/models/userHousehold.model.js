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

UserHousehold.pre('findOneAndUpdate', async function (next) {

	if (this.getUpdate().role && this.getUpdate().role !== 'admin') {

		const existing = await (
			mongoose
				.model('userHousehold')
				.findOne({ id: this.getQuery()._id })
		);

		if (existing.role !== 'admin') {

			const hasAnotherAdmin = await (
				mongoose
					.model('userHousehold')
					.findOne({
						id: { $ne: this.getQuery()._id },
						household: existing.household,
						role: 'admin'
					})
			);

			if (!hasAnotherAdmin) {
				throw new Error('Household must have at least one admin user');
			}

		}

	}

	if (this.getUpdate().isDefault) {
		await mongoose.model('userHousehold').updateMany({ id: { $ne: this.getQuery()._id }}, { isDefault: false });
	}

	next();

});

UserHousehold.pre('findOneAndUpdate', async function (next) {

	if (this.getUpdate().isDefault) {
		await mongoose.model('userHousehold').updateMany({ id: { $ne: this.getQuery()._id }}, { isDefault: false });
	}

	next();

});


module.exports = UserHousehold;