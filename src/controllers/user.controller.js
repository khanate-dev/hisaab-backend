

const { getHashAndSalt } = require( '../helpers/encryption');
const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => getAll(req, res, 'user');

const getOne = (req, res) => getByID(req, res, 'user');

const put = (req, res) => {

	if (req.body.password) {

		const password = getHashAndSalt(req.body.password);

		req.body.password = `${password.hash} ${password.salt}`;

	}

	updateByID(req, res, 'user');

};

const remove = (req, res) => deleteByID(req, res, 'user');

const post = (req, res) => {

	if (req.body.password) {

		const password = getHashAndSalt(req.body.password);

		req.body.password = `${password.hash} ${password.salt}`;

	}

	create(req, res, 'user');

};

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
};