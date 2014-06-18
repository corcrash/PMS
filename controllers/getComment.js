/**
 * Created by aleksandar on 12.6.14..
 */

var mysql = require('../config/database');
var merge = require('../utility/merge');

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
        var paket_kom = [];
        var paket_user = [];
        //vraca zadnjih num komentara
        connection.query("SELECT * FROM pms.comments" +
                "WHERE task_id = ?" +
                "ORDER BY comments.create_time DESC" +
                "LIMIT ? ", [connection.escape(id), connection.escape(num)],
            function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }
                var i = 0;
                result.forEach(function (item) {
                    paket_kom[i] = {
                        text: item.text,
                        create_time: item.create_time
                    };
                    i++;
                });
            });
        connection.query("SELECT users.avatar, users.display_name " +
            "FROM pms.users " +
            "WHERE users.id IN " +
            "(SELECT comment.user_id" +
            "FROM pms.comments" +
            "WHERE task_id = ?" +
            "ORDER BY comments.create_time DESC" +
            "LIMIT ?)", [], function (err, result) {
            if (err) {
                console.error(err);
                return;
            }
            var i = 0;
            result.forEach(function (item) {
                paket_user[i] = {
                    avatar: item.text,
                    display_name: item.display_name
                };
                i++;
            });
        });
        var paket = [];
        for (var i = 0; i < paket_kom.length; i++) {
            paket[i] = merge(paket_kom[i], paket_user[i]);

            res.send(paket);
            connection.release();
        }
    })
};

