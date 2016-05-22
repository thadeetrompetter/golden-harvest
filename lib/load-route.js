const path = require('path');
/**
 * execute a route curried with `args`
 * @param  {variadic} args... [description]
 * @return {[type]}         [description]
 */
module.exports = function (...args) {
    return function (routeFilePath) {
        let route = path.join(path.dirname(require.main.filename), routeFilePath);
        require(route)(...args);
    }
}
