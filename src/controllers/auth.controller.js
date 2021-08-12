const jwt = require( 'jsonwebtoken');

const { mongoose } = require('../connection');

const { post : postUser } = require('./user.controller.js');

const { isPasswordCorrect, getRandomString } =  require('../helpers/cryptography.js');
const CustomError = require( '../helpers/errors/CustomError');
const { jwtSecret } = require( '../helpers/constants');
const hasAccessPermission = require('../helpers/hasAccessPermission');

const signup = (req, res) => postUser(req, res, 'user');

const login = (req, res) => {

	if (!req.body.user) {
		return res.status(400).send('Missing URL Parameter User');
	}
	else if (!req.body.password) {
		return res.status(400).send('Missing URL Parameter Password');
	}
	else if (req.cookies.JWToken) {
		return res.status(400).send('Already Signed In');
	}

	const UserModel = mongoose.model('user');

	UserModel
		.findOne({
			$or: [
				{ username: req.body.user },
				{ email: req.body.user }
			],
		})
		.populate('userHousehold', '-__v -createdAt -updatedAt')
		.then((user) => {

			if (!user) {
				return res.status(401).send('User Does Not Exist');
			}

			const [userPassword, userSalt] = user.password.split(' ');

			const match = isPasswordCorrect(req.body.password, userPassword, userSalt);

			if (match) {

				const csrf = getRandomString(25);

				const jwtObject = {
					username: user.username,
					role: user.role,
					households: user.households,
					csrf: csrf,
				};

				jwt.sign(
					jwtObject,
					jwtSecret,
					{ expiresIn: '7d' },
					(error, token) => {


						if (error) {
							throw new CustomError(500, error);
						}
						else {

							const cookieOptions = {
								httpOnly: true,
								sameSite: 'Strict'
							};

							res.header('csrf', csrf);

							res.cookie('JWToken', token, cookieOptions).status(200).send(`Logged In As ${user.username}`);

						}

					}
				);

			}
			else {
				throw new CustomError(401, 'Username Password Combo Incorrect');
			}

		})
		.catch(error => {

			if (error instanceof CustomError) {

				if (error.code === 400 || error.code === 401) {
					res.status(error.code).send(error.body);
				}
				else {
					res.status(error.code).json(error.body);
				}

			}
			else {
				res.status(500).send('Problem With The Request');
			}

		});

};

const logout = (req, res) => {

	if (!req.cookies.JWToken) {
		return res.status(403).send('Not Signed In');
	}

	res.clearCookie('JWToken').status(200).send('Logged Out');

};

const verifyToken = (req, res, next) => {

	if (req.originalUrl.startsWith('/auth')) {
		return next();
	}
	else if (!req.cookies.JWToken) {
		return res.status(403).send('Not Signed In');
	}

	jwt.verify(
		req.cookies.JWToken,
		jwtSecret,
		(error, token) => {

			console.log(token);

			if (error) {

				if (error.name === 'TokenExpiredError') {
					res.status(500).clearCookie('JWToken').send('Login Expired! Login To Continue');
				}
				else {
					res.status(500).json(error);
				}

				return;

			}

			if (req.method !== 'GET' && token.csrf !== req.headers.csrf) {
				return res.status(403).json('Missing Or Incorrect CSRF Token');
			}

			if (!hasAccessPermission(req, token)) {
				return res.status(403).json('You Do Not Have Permission To Access This Route');
			}

			next();

		});

};

module.exports = {
	signup,
	login,
	logout,
	verifyToken,
};