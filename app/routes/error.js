'use strict';

const tmpl = 'views/error/error.html';

module.exports = function (app) {

    // all errors
    app.use((err, req, res, next) => {
        var status = err.statusCode;
        res.status(status).render(tmpl, {
            error: err
        });
    });
    // 404 handler
    app.use((req, res) => {
        res.status(404).render(tmpl, {
            error: {
                statusCode: 404,
                message: 'not found'
            }
        });
    })
}
