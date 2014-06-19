/**
 * Created by aleksandar on 13.6.14..
 */

//prima id projekta, vraca listu clanova ( naziv i avatar )

var mysql = require("../config/database");


module.exports = function (req,res){

    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }
    if (res.body.id === undefined){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if (err){
            console.error(err);
            return;
        }
        connection.query("SELECT users.display_name, users.avatar " +
                "FROM pms.users " +
                "JOIN pms.projects " +
                "WHERE user.id = ? " +
                "ORDER BY users.display_name",[res.body.id],function(err,result) {
                if (err){
                    console.error(err);
                    return;
                }

                var paket = [];

                result.forEach (function(item){
                    resPaket.push({
                        name : item.display_name,
                        avatar : item.avatar
                    });
                });
            res.send(paket);
        });

        connection.release();

    });

};