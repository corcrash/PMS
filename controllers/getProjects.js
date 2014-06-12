var mysql = require('../config/database');

module.exports = function(req, res){
    mysql.getConnection(function(err, connection){
        if(err)
        {
            console.error(err);
            return;
        }

        console.log(connected);

        connection.release();
        //connection.query("SELECT * FROM projects WHERE user_id = " + connection.escape(req.session.user.id));


    });
}