/**
 * Created by aleksandar on 12.6.14..
 */
var mysql = require ('../config/database');

module.exports = function (req,res){

    var id = req.user.id;
    if(id === undefined){
        console.error("user_id_not_valid");
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(id);
        connection.query("SELECT * FROM pms.users WHERE id = ?", [id], function (err, result) {
            //var prom;
            if (err) {
                console.error(err);
                return;
            }

            console.log(result[0]);

            var displayName = result[0].display_name;
            var email = result[0].email;
            var description = result[0].description;
            var avatar = result[0].avatar;

            if(description == null)
                description = "";

//            prom = {
//                displayName: displayName,
//                email: email,
//                description: description,
//                avatar: avatar
//            };
//            res.send(prom);

            res.render('profile', {
                displayName: displayName,
                email: email,
                description: description,
                avatar: avatar});

            connection.release();
        })

    });
}