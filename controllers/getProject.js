var mysql = require('../config/database');

module.exports = function (req, res) {
    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        connection.query("SELECT * FROM pms.projects WHERE user_id=? AND id=?", [connection.escape(req.user.id), connection.escape(req.body.projectId)], function (err, rows) {
            if (err) {
                console.log(err);
                return;
            }

            if (rows) {
                var project = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    create_time: row.create_time
                }
            }

            res.send(project);

        });

        connection.release();
    });
}