const dayjs = require('dayjs');

const getAll = require( '../helpers/db/getAll');
const getByDate = require('../helpers/db/getByDate');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => {

	const request = {
		...req,
		sort: { date: 'desc'},
	};

	getAll(request, res, 'expense');

};

const getByDateRoute = (req, res) => getByDate(req, res, 'expense');

const getOne = (req, res) => getByID(req, res, 'expense');

const put = (req, res) => updateByID(req, res, 'expense');

const remove = (req, res) => deleteByID(req, res, 'expense');

const post = (req, res) => create(req, res, 'expense');

module.exports = {
	get,
	getByDate: getByDateRoute,
	getOne,
	put,
	remove,
	post,
};