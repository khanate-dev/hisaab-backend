const { mongoose } = require( '../../connection');

/**
 * gets the row given by id from the table
 * @param {*} request - the route's request paramter
 * @param {*} response - the route's response paramter
 * @param {string} tableName - name of the current table
 */
const create = (request, response, tableName) => {

	const Model = mongoose.model(tableName);

	Model
		.create(request.body)
		.then(doc => response.status(201).json(doc))
		.catch(err => {

			if (err.name === 'MongoError' && err.code === 11000) {

				const unique = Object.keys(err.keyValue).map(
					key => ({ key: key, value: err.keyValue[key] })
				);

				const message = `\
					${unique.length > 1 ? 'Combination Of [' : 'Field '}\
					${unique.map(row => row.key).join(', ')}\
					${unique.length > 1 ? ']' : ''}\
					Must Be Unique.\
					${unique.length > 1 ? '[' : ''}\
					${unique.map(row => `\`${row.value}\``).join(', ')}\
					${unique.length > 1 ? ']' : ''}\
					Already Exists.\
				`;

				return response.status(409).send(message);
			}

			response.status(500).json(err);

		});

};

module.exports = create;