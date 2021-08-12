const mongoose = require('mongoose');

/**
 * Given the model, id, and the child models, either deletes all matched child fields if required, or sets all matched child fields to null if nullable
 * @param {string} modelName - the name of the model
 * @param {string[]} children - the name of the child models
 * @param {string} id - the id to be removed
 * @param {Function} next - the next function
 */
module.exports = async (modelName, children, id, next) => {

	await Promise.all(children.map(async childModelName => {

		const fields = mongoose.model(childModelName).schema.paths
			, referringFields = fields.filter(field => field.options?.ref === modelName).map(field => ({ name: field.path, required: field.options.required }))
			, isDelete = referringFields.some(field => field.required)
			, orClause = referringFields.map(field => ({ [field.name]: id }));

		if (isDelete) {

			await mongoose.model(childModelName).findOneAndDelete({ $or: orClause });

		}
		else {

			const updateBody = referringFields.reduce((object, field) => ({ ...object, [field.name]: null }), {});
			await mongoose.model(childModelName).findOneAndUpdate({ $or: orClause }, updateBody);

		}

		return;

	}));

	next();

};