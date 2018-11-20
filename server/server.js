import DATABASE_CREDENTIALS from 'database.config';

const express = require('express');

const app = express();

app.route('/api/cats').get((req, res) => {
	res.send({
		cats: [{ name: 'lilly'  }, { name: 'lucy' }]
	});
});

app.listen(8000, () => {
	console.log('Server started...');
	console.log(DATABASE_CREDENTIALS);
});

