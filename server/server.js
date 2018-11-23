// Gitignored in repo. To add your own credentials, simply add a 'db-config.js' file
// in the server directory with the format:
// module.exports = { host: '***', user: '***', password: '***', database: '***' };
const DB_CONFIG = require('./db-config.js');
const SERVER_CONFIG = require('./server-config.js'); // Same as above.

const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
	origin: SERVER_CONFIG.corsOrigin,
	optionsSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var connection;

/* SQL Handler Function, starts loop again if it disconnects. */
function connectToSQLAndHandle() {
	connection = mysql.createConnection(DB_CONFIG);
	connection.connect((error) => {
		if (error) {
			console.log('SQL connection error.');
			setTimeout(connectToSQLAndHandle, 2000);
		}
	});

	connection.on('error', (error) => {
		if (error === 'PROTOCOL_CONNECTION_LOST') connectToSQLAndHandle();
	});
}
connectToSQLAndHandle();

/* App routes */

app.route('/api/login/:email').get((request, response) => {
	let email = request.params['email'];
	let queryString = 'SELECT * FROM users WHERE email = \'' + email + '\'';

	connection.query(queryString, (error, results, fields) => {
		response.send(results);
	});
});

app.route('/api/register').post((request, response) => {
	let queryString = 'INSERT INTO users (email, num_progressions) VALUES (\'' + request.body.email + '\', 0)';
	
	connection.query(queryString, (error, results, fields) => {
		response.send(results);
	});
});

app.route('/api/progressions/:userID/:showOnlyUserProgressions/:progressionName').get((req, res) => {
	let userID = +req.params['userID'];
	let showOnlyUserProgressions = req.params['showOnlyUserProgressions'];
	let progressionName = req.params['progressionName'];

	let progressionQueryString = 'SELECT * FROM progressions';

	if (showOnlyUserProgressions === 'true' && progressionName !== 'none') {
		progressionQueryString += ' WHERE owner_id = ' + userID + ' AND name like \'' + progressionName + '%\''
	} else {
		if (showOnlyUserProgressions === 'true') progressionQueryString += ' WHERE owner_id = ' + userID;
		if (progressionName !== 'none') progressionQueryString += ' WHERE name like \'' + progressionName + '%\'';
	}

	connection.query(progressionQueryString, (error, results, fields) => {
		res.send(results);
	});
});

/* Progression Query Functions */

// Start server
app.listen(SERVER_CONFIG.port, () => {
	console.log('Server listening on ' + SERVER_CONFIG.port + '...');
});


