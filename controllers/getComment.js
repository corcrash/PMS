/**
 * Created by aleksandar on 12.6.14..
 */
var mysql = require('../config/database');

//TODO: doraditi - sacekaj Mitu
module.exports = function (req,res){

    var id = req.body.task_id;
    if (id = undefined) {
        console.error("task_id_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }
        connection.query("SELECT * FROM pms.comment WHERE task_id = ?", [id],function(err,result){
            if(err){
                console.error(err);
                return;
            }

            var create_time = result[0].create_time;
            var text = result[0].text;
            var user_disp_name;
            var user_avatar;
            connection.query("SELECT user.display_name, use.avatar FROM user,comment WHERE ? = ??",
                ["comment.user_id", "user.id"], function (err, result) {
                    if (err) {
                        console.error("user_disp_name_query");
                        return;
                    }
                    user_disp_name = result[0].display_name;
                    user_avatar = result[0].avatar;
                });
        })
    })

    }
}