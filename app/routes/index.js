'use strict';

const tmpl = 'views/index/index.html';

module.exports = function (app) {
    app.get('/', (req, res) => {
        if(req.user){
            return res.redirect('/account');
        }
        res.render(tmpl);
    });
};
