const { mongoose } = require('../../connection');

/**
 * gets the row given by id from the table
 * @param {*} req - the route's request paramter
 * @param {*} res - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const updateByID = (req, res, tableName) => {

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).send('Given ID Is Not Valid');
	}

	const Model = mongoose.model(tableName);
	console.log(tableName);
	console.log(req.body);
	console.log(req.params.id);
	Model
		.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(doc => res.status(200).json(doc))
		.catch(err => {

			if (err.name === 'MongoError' && err.code === 11000) {
				const key = Object.keys(err.keyValue)[0];
				return res.status(409).send(`Field ${key} Must Be Unique. Value \`${err.keyValue[key]}\` Already Exists`);
			}

			res.status(500).json(err);

		});

};

module.exports = updateByID;