/**
 * Created by aleksandar on 12.6.14..
 */

var mysql = require('../config/database');

module.exports = function (req,res){

    if (req.user.id == undefined){
        console.log("user_id_not_valid");
        return;
    }
    var id = req.body.task_id;

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }
        //get user_id koji se kasnije koristi
        connection.query("SELECT comments.user_id FROM pms.comment WHERE task_id = ?",
            [connection.escape.id],function(err,result){
            var pom;
            if(err){
                console.error(err);
                return;
            }
            if (result[0]){
                pom = result[0];
            }
            //vraca zadnjih 20 komentara
            //TODO utvrditi na koji tacno nacin oce Dicko da ih primi :)
            for (var i = pom; i > pom-20; i--) {
                if (i == 0)
                    return;

                //get avatar, name, create_time_comment, comment_text
                connection.query("SELECT users.avatar, users.display_name " +
                        "FROM pms.users" +
                        "JOIN pms.comments" +
                        "WHERE ? = ?" +
                        "AND" +
                        "SELECT comments.create_time, comments.text" +
                        "FROM pms.comments" +
                        "WHERE comments.id = ?",
                    [connection.escape(pom), connection.escape("user.id"),
                        connection.escape(id)], function (err, result) {
                        if (err) {
                            console.error("user_disp_name_query");
                            return;
                        }

                        var paket = {
                            avatar: result[0].avatar,
                            name: result[0].display_name,
                            time: result[0].create_time,
                            text: result[0].text
                        };

                        res.send(paket);
                    });
            }
            connection.release();
        })
    })

};
