const { mongoose } = require( '../../connection');

/**
 * gets the row given by id from the table
 * @param {*} req - the route's request paramter
 * @param {*} res - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const updateByID = (req, res, tableName) => {

	if (!req.params.id) {
		res.status(400).send('no id provided');
	}
	else if (typeof req.params.id !== 'number') {
		res.status(400).send('id must be a number');
	}

	const Model = mongoose.model(tableName);

	Model
		.findByIdAndUpdate(req.params.id, req.body)
		.then(doc => res.json(doc))
		.catch(err => res.status(500).json(err));

};

module.exports =  updateByID;