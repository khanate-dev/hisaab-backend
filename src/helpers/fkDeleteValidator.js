const mongoose = require('mongoose');
const ResponseError = require( './errors/ResponseError');

/**
 * Given the model, id, and the child models, allows deletion only if the id is not referenced in child collections
 * @param {string} modelName - the name of the model
 * @param {string[]} children - the name of the child models
 * @param {string} id - the id to be removed
 * @param {Function} next - the next function
 */
module.exports = async (modelName, children, id, next) => {

	const childResponse = await Promise.all(children.map(async childModelName => {

		const fields = mongoose.model(childModelName).schema.paths
			, referringFields = fields.filter(field => field.options?.ref === modelName).map(field => field.path)
			, orClause = referringFields.map(name => ({ [name]: id }));

		const existsInBudget = await mongoose.model(childModelName).findOne({ $or: orClause });

		if (existsInBudget) {
			return childModelName
		}

		return null;

	}));

	const referenced = childResponse.filter(row => row);

	if (referenced.length > 0) {
		const error = new ResponseError(409, `ID ${id} Is Referenced In \`${referenced.join(', ')}\` And Can Not Be Removed`);
		return next(error);
	}

	next();

};