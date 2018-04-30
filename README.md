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
    - **path** (Required): string, handled by express.
    - **methods** (Optional, Default: ['GET']): array,  HTTP methods array.
    - **permissions** (Required): array, permissions allowed.
    - **redirect** (Optional): string, Redirect a request, handled by express.

- **dataSource (Required)**
Object in req contains user info.

- **onSuccess (Optional)**
Response on success.

- **onFailed (Optional)**
Response on failed (Default: { status: 401, message: 'Not Authorized' }).

- **beforeEnter (Optional)**
Called before enter.

- **afterEnter (Optional)**
Called after enter.

- **callback (Optional)**
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
var options = {
    roles: './config/roles.json',
    dataSource: 'user',
    onSuccess: onSuccess,
    onFailed: onFailed,
    beforeEnter: beforeEnter,
    afterEnter: afterEnter
};
```

```javascript
accessRoles(options, (err) => {
    if(!err) {
        console.log('Done');
    } else {
        console.log(err);
    }
});
```

# TODO

- test

# LICENSE

GPL-3.0