if (process.env.NODE_ENV === 'production') {
	require ('newrelic');
}

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const { connectDB } = require('./src/connection');
const routes = require('./src/routes');

const { verifyToken } = require('./src/controllers/auth.controller');

const { consoleFGGreen, consoleFGReset } = require('./src/helpers/constants');

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
	origin: '*.herokuapp.com',
}));
app.use(cookieParser());

app.use((req, _res, next) => {
	console.log(`${new Date().toString()} => ${consoleFGGreen}${req.method}${consoleFGReset} ${req.originalUrl}`, req.body);
	next();
});

app.use(verifyToken);

app.use(routes());

// Handler for Error 404 - Resource Not Found
app.use((_req, res, _next) => {
	res.status(404).send('Resource Not Found!');
});

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.info(`Server Has Started on ${consoleFGGreen}${PORT}${consoleFGReset}`));