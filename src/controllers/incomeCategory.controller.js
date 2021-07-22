const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => getAll(req, res, 'incomeCategory');

const getOne = (req, res) => getByID(req, res, 'incomeCategory');

const put = (req, res) => updateByID(req, res, 'incomeCategory');

const remove = (req, res) => deleteByID(req, res, 'incomeCategory');

const post = (req, res) => create(req, res, 'incomeCategory');

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
};