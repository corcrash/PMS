/**
 * Created by aleksandar on 12.6.14..
 */

var mysql = require('../config/database');

module.exports = function (req,res) {

    if (req.user.id == undefined) {
        console.log("user_id_not_valid");
        return;
    }
    var id = req.body.task_id;
    var num = req.body.num;

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }

        //vraca zadnjih num komentara
        connection.query("SELECT * FROM pms.comments" +
                "WHERE task_id = ?" +
                "ORDER BY comments.create_time DESC" +
                "LIMIT ? ", [id, num],
            function (err, result1) {
                if (err) {
                    console.error(err);
                    return;
                }

                connection.query("SELECT users.avatar, users.display_name " +
                    "FROM pms.users " +
                    "WHERE users.id IN " +
                    "(SELECT comment.user_id" +
                    "FROM pms.comments" +
                    "WHERE task_id = ?" +
                    "ORDER BY comments.create_time DESC" +
                    "LIMIT ?)", [id, num], function (err, result2) {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    var responseData = [];

                    result1.forEach(function (item, index) {
                        responseData.push({
                            displayName: result2[index].displayName,
                            avatar: result2[index].avatar,
                            text: item.text,
                            create_time: item.create_time
                        });
                    });

                    console.log(responseData);

                    res.send(responseData);
                    connection.release();

                });

            });



    })
};
