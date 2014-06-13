/**
 * Created by aleksandar on 13.6.14..
 */

//prima id projekta, vraca listu clanova ( naziv i avatar )

var mysql = require("../config/database");


module.exports = function (req,res){

    var id = req.body.id;
    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }
    if (id === undefined){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if (err){
            console.error(err);
            return;
        }
        connection.query("SELECT ?, ? FROM ? JOIN ? WHERE ? = ? ORDER BY ?",
            ["users.display_name","users.avatar","pms.users",
                "pms.project","users.id",id,"users.display_name"],
                    function(err,result) {
                if (err){
                    console.error(err);
                    return;
                }
               console.log(JSON.stringify(result));
               res.send(null,JSON.stringify(result));
            });

        connection.release();

    });

}