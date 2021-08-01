const dayjs = require('dayjs');

dayjs.extend(require('dayjs/plugin/objectSupport'));

const getAll = require('./getAll');

/**
 * gets multiple fields from the table, optionally filtered by the given filter
 * @example
 * { year: 2021 } // records for 2021
 * { year: 2021, month: 1 } // records for 01-2020
 * { year: 2021, month: 1, day: 0 } // records 01-01-2020
 * { from: { year: 2020 }, to { year: 2021 }} // records between 01-01-2020 & 31-12-2021
 * { from: { year: 2020, month: 1, day: 15 }, to { year: 2021, month: 2, day: 20 }} // records between 15-01-2020 & 20-02-2021
 * { from: { year: 2020, month: 1, day: 15 } } // records between 15-01-2020 & now
 * { to: { year: 2022, month: 1, day: 15 } } // records between now && 15-01-2022
 * @param {*} request - the route's request paramter
 * @param {*} response - the route's response paramter
 * @param {('income'|'expense')} tableName - name of the current table
 */
const getByDate = (request, response, tableName) => {

	const paramsParsed = JSON.parse(request.params.date)
		, params = {
			...paramsParsed,
			month: paramsParsed.month && paramsParsed.month - 1,
			from: paramsParsed.from && {
				...paramsParsed.from,
				month: paramsParsed.from?.month && paramsParsed.from.month - 1,
			},
			to: paramsParsed.to && {
				...paramsParsed.to,
				month: paramsParsed.to?.month && paramsParsed.to.month - 1,
			},
		}
		, currentDate = dayjs()
		, from = {
			year: params.year ?? params.from?.year ?? currentDate.year(),
			month: params.month ??  params.from?.month ?? (
				(params.to && !params.from)
					? currentDate.month()
					: 0
			),
			day: params.day ?? params.from?.day ?? (
				(params.to && !params.from)
					? currentDate.date()
					: 1
			),
		}
		, to = {
			year: params.year ?? params.to?.year ?? currentDate.year(),
			month: params.month ?? params.to?.month ?? (
				(params.from && !params.to)
					? currentDate.month()
					: 11
			),
			day: params.day ?? params.to?.day ?? (
				(params.from && !params.to)
					? currentDate.date()
					: 31
			),
		}
		, startDate = dayjs(from)
		, endDate = dayjs(to);

	const requestObject = {
		...request,
		query: {
			...request.query,
			date: {
				'$gte': startDate.format('YYYY-MM-DD'),
				'$lte': endDate.format('YYYY-MM-DD'),
			},
		},
		sort: { date: 'desc'},
	};

	getAll(requestObject, response, tableName);

};

module.exports = getByDate;