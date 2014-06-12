var mysql = require('../config/database');

module.exports = function(req, res){
    mysql.getConnection(function(err, connection){
        if(err)
        {
            console.error(err);
            return;
        }
        connection.query("SELECT * FROM projects WHERE user_id = " + connection.escape(req.session.user.id), function(err, rows){
            if(err){
                console.log(err);
                return;
            }

            var projects = [];

            if(rows){
                rows.forEach(function(row){
                    var project = {
                        name: row.name,
                        description: row.description,
                        create_time: row.create_time
                    }

                    projects.push(project);
                });

                res.send(projects);
            }
        });
    });
}