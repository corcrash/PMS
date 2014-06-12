/**
 * Created by aleksandar on 12.6.14..
 */
var mysql = require ('../config/database.js');

module.exports = function (req,res){

    var id = req.user.id;
    if(id = undefined)
        console.error("ID is undefined!");

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return
        }
        connection.query("SELECT * FROM USERS WHERE ID = ?", [id], function (err, result) {
            var prom;
            if (err) {
                console.error(err);
                return
            }

            var displayName = result.row['display_name'];
            var email = result.row['email'];
            var description = result.row['description'];
            var avatar = result.row['avatar'];

            prom = {
                displayName: displayName,
                email: email,
                description: description,
                avatar: avatar
            };
            res.send(prom);
            connection.release();
        })

    });

}