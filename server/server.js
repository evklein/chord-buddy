// Gitignored in repo. To add your own credentials, simply add a 'db-config.js' file
// in the server directory with the format:
// module.exports = { host: '***', user: '***', password: '***', database: '***' };
const DB_CONFIG = require('./db-config.js');
const SERVER_CONFIG = require('./server-config.js'); // Same as above.

const express = require('express');

const app = express();

app.listen(SERVER_CONFIG.port, () => {
	console.log('Server started...');
	console.log(DB_CONFIG);
});


