function UnauthorizedError (message) {
    this.message = message || 'Unauthorized';
    this.statusCode = 401;
    this.stack = (new Error()).stack;
}

exports.UnauthorizedError = createError(UnauthorizedError);

function BadRequestError(message) {
    this.message = message || 'Bad request';
    this.statusCode = 400;
    this.stack = (new Error()).stack;
}

exports.BadRequestError = createError(BadRequestError);

function createError(constructorFn) {
    constructorFn.prototype = Object.create(Error.prototype);
    constructorFn.prototype.constructor = constructorFn;
    return constructorFn;
}
