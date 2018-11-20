// Gitignored in repo. To add your own credentials, simply add a 'db-config.js' file
// in the server directory with the format:
// module.exports = { host: '***', user: '***', password: '***', database: '***' };
const DB_CONFIG = require('./db-config.js');
const SERVER_CONFIG = require('./server-config.js'); // Same as above.

const express = require('express');
var mysql = require('mysql');

const app = express();
var connection = mysql.createConnection(DB_CONFIG);

connection.connect((error) => {
	if (error) console.log(error);
	else {
		connection.query('SELECT * from users', (error, results, fields) => { // Just testing SQL queries right now.
			if (error) console.log(error);
			else console.log(results);
		});
	}
}) 

app.listen(SERVER_CONFIG.port, () => {
	console.log('Server started...');
});


