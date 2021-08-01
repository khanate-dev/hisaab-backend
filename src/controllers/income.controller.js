const getAll = require( '../helpers/db/getAll');
const getByID = require( '../helpers/db/getByID');
const deleteByID = require( '../helpers/db/deleteByID');
const updateByID = require( '../helpers/db/updateByID');
const create = require( '../helpers/db/create');

const get = (req, res) => {

	const request = {
		...req,
		sort: { date: 'desc'},
	};

	getAll(request, res, 'income');

};

const getOne = (req, res) => getByID(req, res, 'income');

const put = (req, res) => updateByID(req, res, 'income');

const remove = (req, res) => deleteByID(req, res, 'income');

const post = (req, res) => create(req, res, 'income');

module.exports = {
	get,
	getOne,
	put,
	remove,
	post,
};