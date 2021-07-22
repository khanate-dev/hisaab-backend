const { mongoose } = require( '../../connection');

/**
 * gets the row given by id from the table
 * @param {*} req - the route's request paramter
 * @param {*} res - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const create = (req, res, tableName) => {

	const Model = mongoose.model(tableName);

	Model
		.create(req.body)
		.then(doc => res.json(doc))
		.catch(err => res.status(500).json(err));

};

module.exports = create;