/**
 * Created by aleksandar on 12.6.14..
 */
var mysql = require ("../config/database");

module.exports = function (req,res){

    var id = req.user.id;
    if(id = undefined) {
        console.error("user_id_not_valid");
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(id);
        if (!(req.body.userInfo = undefined)) {
            var user_disp = req.body.userInfo.displayName;
            var user_avatar = req.body.userInfo.avatar;
            var user_desc = req.body.userInfo.description;

            connection.query("INSERT INTO pms ( pms.avatar, pms.description, pms.display_name )" +
                " VALUES (?,?,?)", [user_avatar, user_desc, user_disc], function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }

                var status = {
                    status: true,
                    message: "insert_into_db_successful"
                };

                res.send(status);
            })
        }
        else {
            var status = {
                status: false,
                message: "package_not_recieved"
            }
        }
    })

};