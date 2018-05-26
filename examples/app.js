const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const accessRoles = require('..')(app);

const onFailed = (req, res, next) => {
	res.status(401).json({
		message: 'Not Authorized'
	});
};

const onSuccess = (req, res, next) => {
	console.log('Success');
};

const beforeEnter = (req, res, next) => {
	req.userData = {
		username: 'ayoubamine',
		role: 'User'
	};
}

var options = {
	roles: '../config/roles.json',
	dataSource: 'userData',
	onSuccess: onSuccess,
	onFailed: onFailed,
	beforeEnter: beforeEnter
};

accessRoles(options, (err) => {
	if (err) throw err;
});

app.get('/', (req, res, next) => {
	res.status(200).json({
		message: '/'
	});
});

app.get('/admin', (req, res, next) => {
	res.status(200).json({
		message: '/admin'
	});
});

app.listen(port, () => {
	console.log('Listening on ' + port);
});
