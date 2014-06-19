var mysql = require("../config/database");


module.exports = function (req, res) {

    if (req.user.id === undefined) {
        console.error("user_id_not_valid");
        return;
    }
    if (!req.body.projectId) {
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connection.query("SELECT * FROM pms.tasks WHERE project_id=?", [req.body.projectId], function (err, result1) {
            if (err) {
                console.error(err);
                return;
            }

            connection.query("SELECT pms.users.display_name, pms.users.avatar, pms.users.id, pms.user_has_task.task_id FROM pms.users, pms.user_has_task WHERE pms.users.id = pms.user_has_task.user_id AND id IN (SELECT user_id FROM pms.user_has_task WHERE task_id IN (SELECT task_id FROM pms.tasks WHERE project_id = ?)) ", [req.body.projectId], function (err, result2) {
                if (err) {
                    console.error(err);
                    return;
                }

                var responseData = [];

                result1.forEach(function (item) {
                    responseData.push({
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        createTime: item.create_time,
                        deadline: item.deadline,
                        isFinished: item.isFinished,
                        delegatedTo: []
                    });
                });

                responseData.forEach(function (item1) {
                    result2.forEach(function (item2){
                        if(item1.id === item2.task_id){
                            item1.delegatedTo.push({
                                displayName: item2.display_name,
                                avatar: item2.avatar
                            })
                        }
                    });
                });

                res.send(responseData);
                connection.release();
            });
        });

    });

}