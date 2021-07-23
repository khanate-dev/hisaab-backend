const mongoose = require('mongoose');
const fs = require('fs');

const { consoleFGGreen, consoleFGReset, consoleFGMagenta } = require('./helpers/constants');

const server = 'cluster0.nyg26.mongodb.net'
	, database = 'hisaab'
	, user = 'admin'
	, password = 'sTUotTMB41P9JWcc';

const connectionString = (
	process.env.MONGO_CONNECTION ?? (
		`mongodb+srv://${user}:${password}@${server}/${database}?retryWrites=true&w=majority`
	)
);

const connectDB = () => {

	mongoose
		.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
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

		console.log(`Model ${consoleFGGreen}${modelName}${consoleFGReset} Mapped To ${consoleFGMagenta}/model/${model}.js${consoleFGReset}`);

		mongoose.model(modelName, require(`./models/${model}`));

	});

	console.log();

};

module.exports = {
	mongoose,
	connectDB,
};