const { mongoose } = require( '../../connection');

/**
 * gets multiple fields from the table, optionally filtered by the given filter
 * @param {*} req - the route's request paramter
 * @param {*} response - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const getAll = (req, response, tableName) => {

	const Model = mongoose.model(tableName);

	const fkFields = Object.keys(Model.schema.obj).filter(key => Model.schema.obj[key].ref);

	Model
		.find(req.query)
		.select('-__v -createdAt -updatedAt')
		.populate(fkFields.join(' '), '-password -salt -__v -createdAt -updatedAt -email')
		.then(doc => response.status(200).json(doc))
		.catch(err => response.status(500).json(err));

};

module.exports = getAll;