class FKConflictError extends Error {
	constructor(code, message) {
		super('CustomError');
		this.body = {
			error: {
				type: 'FKConflict',
				message: message,
			},
		};
		this.code = code;
	}
}

module.exports = FKConflictError;