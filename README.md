# Node ACCESS ROLES

# HOW TO INSTALL ?

```javascript
npm install --save access-roles
```

# HOW TO USE ?

```javascript
var accessRoles = require('access-roles')(app);
```

## accessRoles(options, callback)

Create a new accessRoles middleware function using the given **options** object and **callback** function.

**options**

- **roles (Required)**
Filename contains roles array:
    - **path** (Required): Handled by express.
    - **methods** (Default: ['GET']): HTTP methods array.
    - **permissions** (Required): Permissions allowed.
    - **redirect** Redirect a request, handled by express.

- **dataSource (Required)**
Object in req contains user info.

- **onSuccess**
Response on success.

- **onFailed**
Response on failed (Default: { status: 401, message: 'Not Authorized' }).

- **beforeEnter**
Called before enter.

- **callback**
The callback(err[name, message]).

Example

```json
{
    "roles": [
        {
            "path": "/",
            "methods": ["GET"],
            "permissions": ["Admin"],
            "redirect": "/home"
        }
    ]
}
```

```javascript
function onSuccess(req, res, next) {
	// ...
}

function onFailed(req, res, next) {
	// ...
}

function beforeEnter(req, res, next) {
	// req.userData = ...;
}

var options = {
    roles: './config/roles.json',
    dataSource: 'userData',
    onSuccess: onSuccess,
    onFailed: onFailed,
    beforeEnter: beforeEnter
};
```

```javascript
accessRoles(options, (err) => {
	if (err) throw err;
});
```

# TODO

- Tests
- Give me suggestions ??

# LICENSE

GPL-3.0