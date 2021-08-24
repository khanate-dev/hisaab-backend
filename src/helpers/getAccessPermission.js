//@ts-check

const { mongoose } = require('../connection');

/** @typedef {('user'|'household'|'userHousehold'|'income'|'incomeCategory'|'incomeBudget'|'expense'|'expenseCategory'|'expenseBudget')} route */

/** @type {route[]} */
const routes = ['user', 'household', 'userHousehold', 'income', 'incomeCategory', 'incomeBudget', 'expense', 'expenseCategory', 'expenseBudget'];

/**
 * @typedef {(route[] | 'HOUSEHOLD_ROUTES' | 'ALL')} accessTypeOption

* @typedef {object} accessType
 * @property {accessTypeOption} [accessType.get] - allowed routes for get request
 * @property {accessTypeOption} [accessType.put] - allowed routes for put request
 * @property {accessTypeOption} [accessType.patch] - allowed routes for request request
 * @property {accessTypeOption} [accessType.post] - allowed routes for post request
 * @property {accessTypeOption} [accessType.delete] - allowed routes for delete request
 *
 * @typedef {object} role
 * @property {accessType} [role.all] - the permissions for all resources
 * @property {accessType} [role.self] - the permissions for user's own resources
 * @typedef {object} permissions
 * @property {role} [permissions.common] - the common permissions available to all the users
 * @property {role} [permissions.sysadmin] - the permissions for admin users
 * @property {role} [permissions.admin] - the permissions for household admins
 * @property {role} [permissions.user] - the permissions for household users
 * @property {role} [permissions.guest] - the permissions for household guests
*/

/** @type {permissions} */
const permissions = {
	common: {
		self: {
			get: ['user'],
			put: ['user'],
			patch: ['user'],
			delete: ['user'],
		},
	},
	sysadmin: {
		all: {
			get: 'ALL',
			post: ['user', 'household'],
			delete: ['user', 'household'],
		},
	},
	admin: {
		all: {
			get: 'HOUSEHOLD_ROUTES',
			put: 'HOUSEHOLD_ROUTES',
			patch: 'HOUSEHOLD_ROUTES',
			post: 'HOUSEHOLD_ROUTES',
			delete: 'HOUSEHOLD_ROUTES',
		},
	},
	user: {
		all: {
			get: 'HOUSEHOLD_ROUTES',
			post: ['income', 'expense'],
		},
		self: {
			post: ['userHousehold'],
			put: ['income', 'expense', 'userHousehold'],
			patch: ['income', 'expense', 'userHousehold'],
			delete: ['income', 'expense', 'userHousehold'],
		},
	},
	guest: {
		all: {
			get: 'HOUSEHOLD_ROUTES',
		},
	},
};

module.exports = (request, user) => new Promise(async (resolve, reject) => {

	const route = request.baseUrl
		, method = request.method.toLowerCase()
		, householdRoutes = routes.filter(current => !['user', 'household'].includes(current));

	if (route === 'user') {

		const currentPermissions = {
			all: {
				...permissions.common.all,
				...(user.admin && permissions.sysadmin.all),
			},
			self: {
				...permissions.common.self,
				...(user.admin && permissions.sysadmin.self),
			},
		};

		const hasAllAccess = (
			currentPermissions.all?.[method] === 'ALL'
			|| currentPermissions.all?.[method]?.includes?.(route)
		);

		const hasSelfAccess = (
			(
				currentPermissions.self?.[method] === 'ALL'
				|| currentPermissions.self?.[method]?.includes?.(route)
			)
			&& request.path === user._id
		);

		if (hasAllAccess || hasSelfAccess) {
			resolve();
		}

	}
	else if (user.role === 'admin') {

		const currentPermissions = {
			all: {
				...permissions.common.all,
				...permissions.sysadmin.all,
			},
		};

		const hasAllAccess = (
			currentPermissions.all?.[method] === 'ALL'
			|| currentPermissions.all?.[method]?.includes?.(route)
		);

		if (hasAllAccess) {
			resolve();
		}

	}
	else if (householdRoutes.includes(route)) {

		let currentObject,
			currentHousehold;

		if (method === 'get' && !request.path) {
			currentHousehold = request.params?.household;
		}
		else if (method === 'post') {
			currentHousehold = request.body?.household;
		}
		else if (request.path) {
			currentObject = await mongoose.model(route).findById(request.path);
			currentHousehold = currentObject.household;
		}

		if (!currentHousehold) {
			reject('You need to specify a household to access!');
		}

		const householdUser = await mongoose.model('userHousehold').findOne({ household: currentHousehold, user: user._id });

		if (!householdUser) {
			reject('You are not a member of this household!');
		}
		else if (!householdUser.isActive) {
			reject('Your account is not activated for this household!');
		}

		const currentPermissions = {
			all: {
				...permissions.common.all,
				...permissions[householdUser.role].all,
			},
			self: {
				...permissions.common.self,
				...permissions[householdUser.role].self,
			},
		};

		const hasAllAccess = currentPermissions.all?.[method].includes?.(route)
			, hasSelfAccess = currentPermissions.self?.[method].includes?.(route) && [currentObject.addedBy, currentObject.user].includes(user._id);

		if (hasAllAccess || hasSelfAccess) {
			resolve();
		}

	}

	reject('You do not have access to this route!');

});