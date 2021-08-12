const jwtSecret = '57731062324a678ae936796f625cb6fd'
	, consoleFGGreen = '\x1b[32m'
	, consoleFGReset = '\x1b[0m'
	, consoleFGMagenta = '\x1b[35m'
	, encryption = {
		iterations: 1000000,
		pepper: '4c62017971d2a8f68f86bc96b4b95e70556592c4',
	};

module.exports = {
	jwtSecret,
	consoleFGGreen,
	consoleFGReset,
	consoleFGMagenta,
	encryption,
}