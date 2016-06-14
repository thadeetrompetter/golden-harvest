'use strict';
const query = require('../../lib/harvest').query;
const BadRequestError = require('../../lib/errors').BadRequestError;
const url = require('url');
const ensureAuth = require('../../lib/ensure-authenticated');

module.exports = function (app, passport, config) {
    const users = config.users;
    app.get('/expenses/:from?/:to?',
    ensureAuth,
    (req, res, next) => {
        const id = req.user.data.user.id;
        const fromDate = req.params.from || req.query.from;
        const toDate = req.params.to || req.query.to;

        if(!fromDate || !toDate){
            return next(new BadRequestError('missing start and/or end date'));
        }

        //TODO: extract into helper module
        const uri = url.parse(config.baseUri);
        uri.query = {
            from: removeDashes(fromDate),
            to: removeDashes(toDate)
        }
        uri.pathname = config.expenses(id)

        users.getUser(id).then(user => {
            return query(user.credentials, url.format(uri))
                .then(/* TODO: do something with expenses */)
                .catch(/* TODO: handle expenses error */)
        });
    });
}
function removeDashes(str) {
    return str.split('-').join('');
}
