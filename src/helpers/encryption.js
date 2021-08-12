const crypto = require('crypto');

const { encryption: { iterations, pepper } } = require('./constants');

/**
 * Given the plaintext password and the salt, creates and returns a hash.
 * @param {string} password - the plaintext password
 * @param {string} salt - the hexadecimal salt string
 * @returns {string} - the generated hash as hexadecimal string
 */
const getHash = (password, salt) => {

	const hmac = crypto.pbkdf2Sync(password.normalize(), pepper, iterations, 64, 'sha512').toString('hex')
		, hash = crypto.pbkdf2Sync(hmac, salt, iterations, 64, 'sha512').toString('hex');

	return hash;

};

/**
 * Return a random hexadecimal string of the given length
 * @param {number} length - the length of the returned string
 * @returns {string} the generated hexadecimal random string
 */
const getRandomString = (length) => crypto.randomBytes(length / 2).toString('hex');

/**
 * Creates a hash = require( the given string password and returns the hash and the salt
 * @param {string} password - the plain string password
 * @returns {{ hash: string, salt: string }} the generated hash and salt
 */
const getHashAndSalt = (password) => {

	const salt = getRandomString(64)
		, hash = getHash(password, salt);

	return { salt, hash };

};

/**
 * Matches the given plain string password with the given hash and salt to see if the password match
 * @param {string} password - the plain string password
 * @param {string} hash - the hash password
 * @param {string} salt - the salt for the hash
 * @returns {boolean} does the match fit?
 */
const isPasswordCorrect = (password, hash, salt) => hash === getHash(password, salt);

module.exports = {
	getHashAndSalt,
	isPasswordCorrect,
	getRandomString,
};