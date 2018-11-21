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
});

app.route('/api/progressions/:userID/:showOnlyUserProgressions/:progressionName').get((req, res) => {
	let userID = +req.params['userID'];
	let showOnlyUserProgressions = req.params['showOnlyUserProgressions'];
	let progressionName = req.params['progressionName'];

	let progressionQueryString = 'SELECT * FROM progressions';

	console.log('User ID: ' + userID + ', Show only user progressions: ' + showOnlyUserProgressions + ' Progression Name: ' + progressionName);
	if (showOnlyUserProgressions === 'true' && progressionName !== 'none') {
		progressionQueryString += ' WHERE owner_id = ' + userID + ' AND name like \'' + progressionName + '%\''
	} else {
		if (showOnlyUserProgressions === 'true') progressionQueryString += ' WHERE owner_id = ' + userID;
		if (progressionName !== 'none') progressionQueryString += ' WHERE name like \'' + progressionName + '%\'';
	}

	console.log(progressionQueryString);

	connection.query(progressionQueryString, (error, results, fields) => {
		res.send(results);
	});
});

/* Progression Query Functions */



// Start server
app.listen(SERVER_CONFIG.port, () => {
	
});


