var mysql = require("../config/database");

module.exports = function (req,res){

    var id = req.user.id;
    if (id = undefined) {
        console.error("user_id_not_valid");
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(id);
        if (!(req.body.projectData == undefined)) {
            var projectId = req.body.projectData.id;
            var name = req.body.projectData.name;
            var description = req.body.projectData.description;

            connection.query("UPDATE pms.project SET name=?, description=? WHERE id=?", [connection.escape(name), connection.escape(description), connection.escape(projectId)], function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }

                var status = {
                    status: true,
                    message: "project_update_successful"
                };

                res.send(status);
            })
        }
        else {
            var status = {
                status: false,
                message: "project_update_unsuccessful"
            }
        }

        connection.release();
    });
}
