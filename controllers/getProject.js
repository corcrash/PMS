var mysql = require('../config/database');

module.exports = function (req, res) {
    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connection.query("SELECT * FROM pms.projects WHERE user_id=? AND id=?", [req.user.id, req.body.projectId], function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }

            if (rows) {
                var project = {
                    id: rows[0].id,
                    name: rows[0].name,
                    description: rows[0].description,
                    create_time: rows[0].create_time
                }
            }

            res.send(project);

        });;

        connection.release();
    });
}