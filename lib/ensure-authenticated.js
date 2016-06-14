'use strict';

const UnauthorizedError = require('./errors').UnauthorizedError;

module.exports = function (req, res, next) {
    if(!req.user){
        // IDEA: maybe redirect somewhere sensible instead
        return next(new UnauthorizedError('you cannot be here'));
    }
    next();
};
