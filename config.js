module.exports = {
    whoami: '/account/who_am_i',
    expenses: id => `/people/${id}/expenses`,
    categories: '/expense_categories',
    getUri (endpoint) {
        return `${this.baseUri}${this[endpoint]}`
    }
};
