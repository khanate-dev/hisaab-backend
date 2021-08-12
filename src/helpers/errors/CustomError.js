class CustomError extends Error {
	constructor(code, body) {
		super('CustomError');
		this.code = code;
		this.body = body;
	}
}

module.exports = CustomError;