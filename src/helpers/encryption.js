const crypto = require( 'crypto');

/**
 * Creates a hash = require( the given string password and returns the hash and the salt
 * @param {string} password - the plain string password
 * @returns {{ hash: string, salt: string }} the generated hash and salt
 */
const hashPassword = (password) => {

	const salt = crypto.randomBytes(128).toString('base64')
		, iterations = 100000
		, hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString("hex");

	return {
		hash: hash,
		salt: salt
	};

};

/**
 * Matches the given plain string password with the given hash and salt to see if the password match
 * @param {string} password - the plain string password
 * @param {string} hash - the hash password
 * @param {string} salt - the salt for the hash
 * @returns {boolean} does the match fit?
 */
const matchPassword = (password, hash, salt) => {

	const iterations = 100000;
	return hash === crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString("hex");

};

/**
 * Return a random alphanumeric string of the given length
 * @param {number} length - the length of the returned string
 * @returns {string} the generated random string
 */
const randomString = function(length) {

	return crypto
		.randomBytes(Math.ceil(((length || 50) * 3) / 4))
		.toString('base64') // convert to base64 format
		.slice(0, (length || 50)) // return required number of characters
		.replace(/\+/g, '0') // replace '+' with '0'
		.replace(/\//g, '0'); // replace '/' with '0'

};

module.exports = {
	hashPassword,
	matchPassword,
	randomString,
}