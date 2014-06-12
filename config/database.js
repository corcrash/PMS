var mysql = require("mysql");

module.exports = function(){
    mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'netmage'
    });

    mysql.query('USE pms');
}

