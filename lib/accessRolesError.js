var accessRolesError = function (message, error) {
    Error.call(this, message);
    
    if(Error.captureStackTrace)
        Error.captureStackTrace(this, this.constructor);
    
    this.name = 'accessRolesError';
    this.message = message;
    if(error) this.inner = error;
};

accessRolesError.prototype = Object.create(Error.prototype);
accessRolesError.prototype.constructor = accessRolesError;

module.exports = accessRolesError;