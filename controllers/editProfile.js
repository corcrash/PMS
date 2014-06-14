/**
 * Created by aleksandar on 12.6.14..
 */
var mysql = require ("../config/database");

module.exports = function (req,res){

    var id = req.user.id;
    if(id === undefined) {
        console.error("user_id_not_valid");
        res.send({
            status: false,
            message: "user_id_not_valid"
        })
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        if (!(req.body.profileInfo == undefined)) {
            var user_disp = connection.escape(req.body.profileInfo.displayName);
            var user_desc = connection.escape(req.body.profileInfo.description);

            connection.query("UPDATE pms.users SET display_name=?, description=? WHERE id=?", [user_disp, user_desc, id], function (err, result) {
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

            connection.release();
        }
        else {
            var status = {
                status: false,
                message: "package_not_recieved"
            }

            res.send(status);
        }
    })

};