const mongoose = require('mongoose');
const fs = require('fs');

const server = 'cluster0.nyg26.mongodb.net'
	, database = 'hisaab'
	, user = 'admin'
	, password = 'sTUotTMB41P9JWcc';

const connectDB = () => {

	mongoose
		.connect(`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			writeConcern: {
				j: true,
			},
		})
		.then(() => {

			console.log(`Connected To MongoDB.`);
			mapModels();

		})
		.catch(error => {

			console.error(`Error Connecting To MongoDB.`);
			console.error(error);

		});

}

const mapModels = () => {

	const modelList = fs.readdirSync('./src/models', 'utf-8');

	console.log();

	modelList.forEach(model => {

		const modelName = model.split('.')[0];

		console.log(`Model ${modelName} Mapped To /model/${model}.js`);

		mongoose.model(modelName, require(`./models/${model}`));

	});

	console.log();

};

module.exports = {
	mongoose,
	connectDB,
};