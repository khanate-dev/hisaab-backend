/**
 * Given the foreign key's model and new id, checks if the id exists in the referenced model
 * @param {*} model - the foreign key model
 * @param {string} id - the id to be checked
 * @param {string} [modelName] - the name of the model
 * @returns {Promise<boolean|Error>} resolves with true if id exists, throws and Error otherwise
 */
module.exports = (model, id, modelName) => new Promise((resolve, reject) => {
	model.findById(id, (_error, result) => {
		if (result) {
			resolve(true);
		} else
			reject(
				new Error(
					`Given ID'${id.toString()}' Does Not Exist In ${modelName ?? model.collection.collectionName}`
				)
			);
	});
});