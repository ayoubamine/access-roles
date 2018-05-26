const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const accessRoles = require('..')(app);

app.use((req, res, next) => {
	req.user = {
		username: 'ayoubamine',
		role: 'Admin'
	};
	next();
})

// Options
const onFailed = (req, res, next) => {
	res.status(401).json({
		message: 'Not Authorized'
	});
};

const onSuccess = (req, res, next) => {
	console.log('Success');
};

const beforeEnter = (req, res, next) => {
	console.log('Before enter');
}

const afterEnter = (req, res, next) => {
	console.log('After enter');
}

var options = {
	roles: '../config/roles.json',
	dataSource: 'user',
	onSuccess: onSuccess,
	onFailed: onFailed,
	beforeEnter: beforeEnter,
	afterEnter: afterEnter
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
