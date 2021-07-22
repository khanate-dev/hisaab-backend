const { mongoose } = require( '../../connection');

/**
 * gets the row given by id from the table
 * @param {*} req - the route's request paramter
 * @param {*} res - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const getByID = (req, res, tableName) => {

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Given ID Is Not Valid');
	}

	const Model = mongoose.model(tableName);

	const fkFields = Object.keys(Model.schema.obj).filter(key => Model.schema.obj[key].ref);

	Model
		.findById(req.params.id)
		.select('-__v -createdAt -updatedAt')
		.populate(fkFields.join(' '), '-password -salt -__v -createdAt -updatedAt -email')
		.then(doc => res.status(200).json(doc))
		.catch(err => res.status(500).json(err));

};

module.exports = getByID;