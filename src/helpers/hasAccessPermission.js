//@ts-check

/** @typedef {('auth'|'user'|'household'|'userHousehold'|'income'|'incomeCategory'|'incomeBudget'|'expense'|'expenseCategory'|'expenseBudget')} route */

/** @type {route[]} */
const routes = ['auth', 'user', 'household', 'userHousehold', 'income', 'incomeCategory', 'incomeBudget', 'expense', 'expenseCategory', 'expenseBudget'];

/**
 * @typedef {object} accessType
 * @property {(route | 'HOUSEHOLD_ROUTES')[]} [accessType.allTypes] - allowed routes for all request types
 * @property {(route | 'HOUSEHOLD_ROUTES')[]} [accessType.get] - allowed routes for get request
 * @property {(route | 'HOUSEHOLD_ROUTES')[]} [accessType.put] - allowed routes for put request
 * @property {(route | 'HOUSEHOLD_ROUTES')[]} [accessType.patch] - allowed routes for request request
 * @property {(route | 'HOUSEHOLD_ROUTES')[]} [accessType.post] - allowed routes for post request
 * @property {(route | 'HOUSEHOLD_ROUTES')[]} [accessType.delete] - allowed routes for delete request
 *
 * @typedef {object} role
 * @property {('get'|'put'|'patch'|'post'|'delete')[]} [role.globallyAllowedMethods] - requests to globally allow for this role
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
		all: {
			allTypes: ['auth'],
		},
		self: {
			allTypes: ['user'],
		},
	},
	sysadmin: {
		globallyAllowedMethods: ['get'],
		all: {
			post: ['user', 'household'],
			delete: ['user', 'household'],
		},
		self: {
			allTypes: ['user'],
		},
	},
	admin: {
		all: {
			allTypes: ['HOUSEHOLD_ROUTES'],
		},
	},
	user: {
		all: {
			get: ['HOUSEHOLD_ROUTES'],
		},
		self: {
			put: ['income', 'expense'],
			patch: ['income', 'expense'],
			post: ['income', 'expense'],
			delete: ['income', 'expense'],
		},
	},
	guest: {
		all: {
			get: ['HOUSEHOLD_ROUTES'],
		},
	},
}

const checkAdminPermissions = (request) => {

	const permissions = {
		GET: 'ALL',
		POST: ['/user', '/household',],
		DELETE: ['/user', '/household',]
	};

	const currentPermissions = permissions[request.method];

	if (currentPermissions === 'ALL' || currentPermissions?.includes?.(request.originalUrl)) {
		return true;
	}

	return false;

};

module.exports = (request, user) => {

	if (user.role === 'admin') {
		return checkAdminPermissions(request);
	}

	return true;

};