const { mongoose } = require('../../connection');

/**
 * gets the row given by id from the table
 * @param {*} request - the route's request paramter
 * @param {*} response - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const updateByID = (request, response, tableName) => {

	if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
		return response.status(400).send('Given ID Is Not Valid');
	}

	const Model = mongoose.model(tableName);

	Model
		.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, })
		.then(doc => response.status(200).json(doc))
		.catch(err => {

			if (err.name === 'MongoError' && err.code === 11000) {
				const key = Object.keys(err.keyValue)[0];
				return response.status(409).send(`Field ${key} Must Be Unique. Value \`${err.keyValue[key]}\` Already Exists`);
			}

			response.status(500).json(err);

		});

};

module.exports = updateByID;