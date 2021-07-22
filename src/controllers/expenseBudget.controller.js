const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => getAll(req, res, 'expenseBudget');

const getOne = (req, res) => getByID(req, res, 'expenseBudget');

const put = (req, res) => updateByID(req, res, 'expenseBudget');

const remove = (req, res) => deleteByID(req, res, 'incomexpenseBudgeteBudget');

const post = (req, res) => create(req, res, 'expenseBudget');

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
};