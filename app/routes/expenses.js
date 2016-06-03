'use strict';
const query = require('../../lib/harvest').query;
const errors = require('../../lib/errors');
const UnauthorizedError = errors.UnauthorizedError;
const BadRequestError = errors.BadRequestError;
const url = require('url');

module.exports = function (app, passport, config) {
    const users = config.users;
    app.get('/expenses/:from?/:to?', (req, res) => {
        // TODO: create ensure authenticated middleware.
        if(!req.user){
            throw new UnauthorizedError('you cannot be here');
        }
        const id = req.user.data.user.id;
        const fromDate = req.params.from || req.query.from;
        const toDate = req.params.to || req.query.to;

        if(!fromDate || !toDate){
            throw new BadRequestError('missing start and/or end date');
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
