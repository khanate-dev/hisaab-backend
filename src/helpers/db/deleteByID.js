const { mongoose } = require( '../../connection');

/**
 * deletes the row given by id from the table
 * @param {*} request - the route's request paramter
 * @param {*} response - the route's response paramter
 * @param {*} tableName - name of the current table
 */
const deleteByID = (request, response, tableName) => {

	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return response.status(400).send('Given ID Is Not Valid');
	}

	const Model = mongoose.model(tableName)

	Model
		.findByIdAndDelete(request.params.id)
		.then(doc => response.status(200).json(doc))
		.catch(err => response.status(err.code ?? 500).json(err.body ?? err));

};

module.exports = deleteByID;