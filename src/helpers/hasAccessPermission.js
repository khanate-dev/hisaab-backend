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