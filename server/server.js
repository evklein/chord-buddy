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

var connection = mysql.createPool(DB_CONFIG);

/* App routes */

app.route('/api/login/:email').get((request, response) => {
	let email = request.params['email'];
	let queryString = 'SELECT * FROM users WHERE email = \'' + email + '\'';

	connection.query(queryString, (error, results, fields) => {
		response.send(results);
	});
});

app.route('/api/register').post((request, response) => {
	let queryString = 'INSERT INTO users (email, name) VALUES (\'' + request.body.email + '\', \''
		 + request.body.name + '\')';
	
	connection.query(queryString, (error, results, fields) => {
		if (error) console.log(error);
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

app.route('/api/progressions').post((request, res) => {
	let queryString = 'INSERT INTO progressions (name, owner_id, progression_string, num_chords, num_likes, shareable)';
	queryString += 'VALUES (\'' + request.body.name + '\', ' + 
		request.body.ownerID + ', \'' + request.body.progressionString + '\', ' + 
		request.body.numChords + ', 1, ' + request.body.shareable + ')';

	console.log(queryString);

	connection.query(queryString, (error, results, fields) => {
		res.send(results);
	});
});

app.route('/api/users/:id').get((request, response) => {
	let queryString = 'SELECT name FROM users WHERE id = ' + request.params['id'];

	connection.query(queryString, (error, results, fields) => {
		response.send(results);
	});
});

app.route('/api/like').post((request, response) => {
	console.log(request.body.progressionID);
	let queryString = 'UPDATE progressions SET num_likes = num_likes + 1 WHERE id = ' + request.body.progressionID;

	console.log(queryString);
	connection.query(queryString, (error, results, fields) => {
		response.send(results);
	});
});

/* Progression Query Functions */

// Start server
app.listen(SERVER_CONFIG.port, () => {
	console.log('Server listening on ' + SERVER_CONFIG.port + '...');
});


