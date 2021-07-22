const { mongoose } = require( '../../connection');

/**
 * gets multiple fields from the table, optionally filtered by the given filter
 * @param {*} response - the route's response paramter
 * @param {string} tableName - name of the current table
 * @param {object} [filter] - the filter object
 */
const getAll = (response, tableName, filter) => {

	const Model = mongoose.model(tableName);

	Model
		.find(filter)
		.then(doc => response.json(doc))
		.catch(err => response.status(500).json(err));

};

module.exports = getAll;