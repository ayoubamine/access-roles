var accessRolesError = require('./accessRolesError');
var fs = require('fs');

module.exports = function accessRoles(app) {
	if (typeof app !== 'function') {
		return cb(new accessRolesError('Express instance not valid'));
	}

	return function (options, callback) {
		callback = callback || cb;

		if (typeof options !== 'object') {
			return callback(new accessRolesError('Roles must be an object'));
		}

		options.dataSource = options.dataSource || 'user';
		options.onFailed = options.onFailed || onFailed;

		if (!isJSONFile(options.roles)) {
			return callback(new accessRolesError('File not valid'));
		}

		// Read json file content
		options.roles = require(options.roles).roles;

		if (!Array.isArray(options.roles)) {
			return callback(new accessRolesError('Roles must be an array'));
		}

		for (var i = 0; i < options.roles.length; i++) {
			var role = options.roles[i];

			if (typeof role.path !== 'string') {
				return callback(new accessRolesError('Path must be a string'));
			}

			if (!Array.isArray(role.permissions)) {
				return callback(new accessRolesError('Permissions must be an array'));
			}

			if (!Array.isArray(role.methods)) {
				return callback(new accessRolesError('Methods must be an array'));
			}
		}

		if (options.beforeEnter) {
			options.beforeEnter();
		}

		setMiddlewares(app, options, callback);

		if (options.afterEnter) {
			options.afterEnter();
		}
	}
}

function setMiddlewares(app, options, callback) {
	for (var i = 0; i < options.roles.length; i++) {
		var role = options.roles[i];

		for (var j = 0; j < role.methods.length; j++) {
			var method = role.methods[j].toString().toLowerCase();

			try {
				app[method](role.path, start(options, i));
			} catch (err) {
				return callback(new accessRolesError('Method: <' + method + '> is not valid'));
			}
		}
	}
}

function start(options, roleIndex) {
	return function (req, res, next) {
		var role = options.roles[roleIndex];
		var user = req[options.dataSource];
		
		if (!user) {
			throw new accessRolesError('Data source not found');
		}

		if (isAllowed(role.permissions, user.role)) {
			if (options.onSuccess) {
				options.onSuccess();
			}
			return next();
		}

		if (role.redirect) {
			return res.redirect(role.redirect);
		}
		
		options.onFailed(req, res, next);
	}
}

function isAllowed(permissions, role) {
	for (let i = 0; i < permissions.length; i++) {
		var permission = permissions[i];
		if (permission.indexOf(role) != -1) {
			return role[0] !== '>';
		}
	}
	return false;
}

function onFailed(req, res, next) {
	res.status(401).json({
		message: 'Not Authorized'
	});
};

function isJSONFile(filename) {
	var extname = filename.split('.').pop();
	return fs.existsSync(filename) && extname === 'json';
}

function cb(err) {
	if (err) throw err;
}
