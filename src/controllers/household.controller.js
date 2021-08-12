const { mongoose } = require( '../connection');

const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const { getRandomString } = require('../helpers/cryptography');

const getUniqueInviteCode = async () => {

	const current = getRandomString(64)
		, isNotUnique = mongoose.model('household').findOne({ inviteCode: current });

	if (isNotUnique) {
		return await getUniqueInviteCode();
	}
	else {
		return current;
	}

}

const get = (req, res) => getAll(req, res, 'household');

const getOne = (req, res) => getByID(req, res, 'household');

const put = (req, res) => updateByID(req, res, 'household');

const remove = (req, res) => deleteByID(req, res, 'household');

const post = async (req, res) => {

	req.body.inviteCode = await getUniqueInviteCode();

	create(req, res, 'household');

};

const regenerateInviteCode = async (req, res) => {

	req.body = {
		inviteCode: await getUniqueInviteCode(),
	};

	updateByID(req, res, 'household');

};

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
	regenerateInviteCode,
};