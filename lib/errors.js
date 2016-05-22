function UnauthorizedError (message) {
    this.message = message || 'Unauthorized';
    this.statusCode = 401
    this.stack = (new Error()).stack;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

exports.UnauthorizedError = UnauthorizedError;
