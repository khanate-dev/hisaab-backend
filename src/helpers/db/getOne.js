const { mongoose } = require( '../../connection');

/**
 * gets the row given by id from the table
 * @param {*} req - the route's request paramter
 * @param {*} res - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const getOne = (req, res, tableName) => {

	const Model = mongoose.model(tableName);

	const fkFields = Object.keys(Model.schema.obj).filter(key => Model.schema.obj[key].ref);

	Model
		.findOne(req.query)
		select('-__v -createdAt -updatedAt')
		.populate(fkFields.join(' '), '-password -salt -__v -createdAt -updatedAt -email')
		.then(doc => res.status(200).json(doc))
		.catch(err => res.status(500).json(err));

};

module.exports = getOne;