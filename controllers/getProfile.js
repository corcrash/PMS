/**
 * Created by aleksandar on 12.6.14..
 */
var mysql = require ('../config/database.js')

module.exports = function (req,res){

    var id = req.user.id;
    console.log("connected");
    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(id);
        connection.query("SELECT * FROM pms.users WHERE id = ?", [id], function (err, result) {
            var prom;
            if (err) {
                console.error(err);
                return
            }

            console.log(result);

            var displayName = result[0].display_name;
            var email = result[0].email;
            var description = result[0].description;
            var avatar = result[0].avatar;

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