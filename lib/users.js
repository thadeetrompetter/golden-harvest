'use strict';

module.exports = class Users {
    constructor() {
        this.users = new Map();
    }
    static getAuthString(username, password){
        return new Buffer(`${username}:${password}`).toString('base64');
    }
    getUser(id){
        if(!this.users.has(id)){
            return Promise.reject(new Error('user not found'));
        }
        return Promise.resolve(this.users.get(id));
    }
    setUser(id, data){
        if(!this.users.has(id)){
            this.users.set(id, Object.assign({}, data));
        }
        return Promise.resolve(this.users.get(id));
    }
};
