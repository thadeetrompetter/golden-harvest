'use strict';

const tmpl = 'views/account/account.html';
const UnauthorizedError = require('../../lib/errors').UnauthorizedError;

module.exports = function (app) {
    app.get('/account',
    (req, res) => {
        if(!req.user){
            throw new UnauthorizedError('you cannot be here')
        }
        res.render(tmpl, req.user.data);
    });
};
