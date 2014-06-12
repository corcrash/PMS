var mysql = require("mysql");

module.exports = function(){
    module.exports = mysql.createPool({
        connectionLimit : 10,
        host: 'localhost',
        user: 'root',
        password: 'qwerty'
    });
}

