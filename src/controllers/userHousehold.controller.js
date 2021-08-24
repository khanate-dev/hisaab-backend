const { mongoose } = require('../connection');
const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => getAll(req, res, 'userHousehold');

const getOne = (req, res) => getByID(req, res, 'userHousehold');

const put = (req, res) => updateByID(req, res, 'userHousehold');

const remove = (req, res) => deleteByID(req, res, 'userHousehold');

const post = async (req, res) => {

	const household = await mongoose.model('household').findById(req.body.household).select('inviteCode');

	if (req.body.inviteCode !== household.inviteCode) {
		return response.status(403).send('Missing or incorrect Invite Code');
	}

	create(req, res, 'userHousehold');
};

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
};