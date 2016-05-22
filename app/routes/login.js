'use strict';

const tmpl = 'views/login/login.html';

module.exports = function (app, passport) {
    app.post('/login', passport.authenticate('local', {
        session: true,
        failureRedirect:'/',
        successRedirect:'/account'
    }));
};
