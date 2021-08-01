const { mongoose } = require( '../../connection');

/**
 * gets the row given by id from the table
 * @param {*} request - the route's request paramter
 * @param {*} response - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const getByID = (request, response, tableName) => {

	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return response.status(400).send('Given ID Is Not Valid');
	}

	const Model = mongoose.model(tableName);

	const fkFields = Object.keys(Model.schema.obj).filter(key => Model.schema.obj[key].ref);

	Model
		.findById(request.params.id)
		.select('-__v -createdAt -updatedAt')
		.populate(fkFields.join(' '), '-password -salt -__v -createdAt -updatedAt -email')
		.then(doc => response.status(200).json(doc))
		.catch(err => response.status(500).json(err));

};

module.exports = getByID;