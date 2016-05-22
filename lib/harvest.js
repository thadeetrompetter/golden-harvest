'use strict';

const request = require('request');

const headers = {
    "Content-Type":"application/json",
    "Accept":"application/json"
};

module.exports = {
    query (auth, uri) {
        let opts = getOptions(headers, auth)
        opts.uri = uri;
        return new Promise(function (resolve, reject) {
            request.get(opts, function (err, response, body) {
                if(err){
                    return reject(err)
                }
                return resolve(body);
            });
        });
    }
}

function getOptions(headers, auth) {
    return Object.assign({}, {
        headers: Object.assign({}, headers, {
            'Authorization': `Basic ${auth}`
        })
    });
}
