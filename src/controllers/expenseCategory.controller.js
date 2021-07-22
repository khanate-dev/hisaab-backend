const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => getAll(req, res, 'expenseCategory');

const getOne = (req, res) => getByID(req, res, 'expenseCategory');

const put = (req, res) => updateByID(req, res, 'expenseCategory');

const remove = (req, res) => deleteByID(req, res, 'expenseCategory');

const post = (req, res) => create(req, res, 'expenseCategory');

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
};