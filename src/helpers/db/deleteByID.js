const { mongoose } = require( '../../connection');

/**
 * deletes the row given by id from the table
 * @param {*} req - the route's request paramter
 * @param {*} res - the route's response paramter
 * @param {*} tableName - name of the current table
 */
const deleteByID = (req, res, tableName) => {

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Given ID Is Not Valid');
	}

	const Model = mongoose.model(tableName)

	Model
		.findByIdAndDelete(req.params.id)
		.then(doc => res.status(200).json(doc))
		.catch(err => res.status(500).json(err));

};

module.exports = deleteByID;