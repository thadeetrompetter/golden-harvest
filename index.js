'use strict';

const publicConfig = require('./config');
const secretConfig = require('./secret');
const Users = require('./lib/users');
const harvest = require('./lib/harvest');
const app = require('express')();
const nunjucks = require('nunjucks');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// combine secret and non secret configuration
const config = Object.assign(publicConfig, secretConfig);

// get uri for initial auth call
const whoami = `${config.baseUri}${config.whoami}`;

// user store
// TODO: replace with proper database
const users = new Users();

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));

passport.use(new LocalStrategy({
    session: true
}, (username, password, done) => {
    var auth = Users.getAuthString(username, password);
    harvest.query(auth, whoami).then(function (response) {
        let userData = JSON.parse(response);
        return users.setUser(userData.user.id, {
            credentials: auth
        }).then(() => {
            done(null, userData.user.id);
        });
    }).catch(err => {
        done(err)
    });
}));

passport.serializeUser((id, done) => {
    done(null, id)
});
passport.deserializeUser((id, done) => {
    users.getUser(id).then(function (user) {
        done(null, user)
    }).catch(done);
});

app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure('source', {
    express: app
});

// load routes
const route = require('./lib/load-route')(app, passport);

route('./app/routes/index');
route('./app/routes/login');
route('./app/routes/account');
route('./app/routes/error');

app.listen(3000);
