var mysql = require('../config/database');
var async = require('async');

module.exports = function (req, res) {
    var projects = [];

    async.parallel([function(callback){
        mysql.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
                return;
            }
            connection.query("SELECT * FROM pms.projects WHERE user_id = " + connection.escape(req.user.id), function (err, rows) {
                if (err) {
                    console.log(err);
                    return;
                }

                if (rows) {
                    rows.forEach(function (row) {
                        var project = {
                            id: row.id,
                            name: row.name,
                            description: row.description,
                            create_time: row.create_time
                        }
                        projects.push(project);
                    });
                }
                console.log(projects);

                callback();

            });

            connection.release();
        });
    }], function(err){
        if(err)
        {
            console.error(err);
            return;
        }

        res.send(projects);
    });
}