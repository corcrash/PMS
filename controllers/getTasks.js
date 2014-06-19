var mysql = require("../config/database");


module.exports = function (req, res) {

    var id = req.body.id;
    if (req.user.id === undefined) {
        console.error("user_id_not_valid");
        return;
    }
    if (id === undefined) {
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connection.query("SELECT * FROM pms.tasks " +
            "WHERE id IN " +
            "(SELECT task_id FROM pms.user_has_task " +
            "WHERE user_id = ?)", [id], function (err, result) {
            if (err) {
                console.error(err);
                return;
            }

            var responseData = [];

            result.forEach(function (item) {
                responseData.push({
                    name: item.name,
                    description: item.description,
                    createTime: item.create_time,
                    deadline: item.deadline,
                    isFinished: item.isFinished
                });

            });

            res.send(responseData);
        });

        connection.release();

    });

}