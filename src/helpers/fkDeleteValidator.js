/**
 * Given the model, id, and the child model's, allows deletion only if the id is not referenced in child collections
 * @param {string} modelName - the name of the model
 * @param {string[]} children - the name of the child models
 * @param {string} [id] - the id to be removed
 */
module.exports = async (modelName, children, id) => {

	await new Promise(() => children.map(async childModelName => {

		const existsInBudget = await mongoose.model(childModelName).find({ [modelName]: id });

		if (existsInBudget) {
			throw new Error(`ID ${id} Is Referenced In \`${childModelName}\` And Can Not Be Removed`);
		}

		return;

	}));

	next();

};