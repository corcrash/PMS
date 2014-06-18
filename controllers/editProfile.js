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
        });
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        if (!(req.body.profileInfo == undefined)) {
            var user_disp = req.body.profileInfo.displayName;
            var user_desc = req.body.profileInfo.description;

            connection.query("UPDATE pms.users SET display_name=?, description=? WHERE id=?", [user_disp, user_desc, id], function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log();
                    //check update - successful
                    if (result.affectedRows > 0){
                        var s_status= {
                            status: true,
                            message: "insert_into_db_successful"
                        };

                        res.send(s_status);
                    }
                    else{
                        var n_status = {
                            status: false,
                            message: "profile_update_unsuccessful"
                        };
                        res.send(n_status);
                    }
                });

            connection.release();
        }
    });
};
