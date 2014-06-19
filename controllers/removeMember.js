/**
 * Created by aleksandar on 19.6.14..
 */

var mysql = require ('../config/database');

module.exports = function (req,res){

    if (!(req.user.id && req.body.user_id && req.body.project_id)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if (err){
            console.error(err);
            return;
        }
        connection.query("DELETE * FROM pms.user_works_on_project" +
            "WERE user_works_on_project.user_id = ? AND" +
            "WHERE user_works_on_project.project_id = ?",[req.body.user_id,
            req.body.project_id], function (err,result){
            if (err)
            {
                console.error("query_failure_comment_delete");
                return;
            }
            if (result.affectedRows > 0)
            {
                var paket_s = {
                    status: true,
                    messege: "update_tas_successful"
                };
                res.send(paket_s);
            }
            else{
                var paket_n = {
                    status : false,
                    message: "update_task_failed"
                };
                res.send(paket_n);
            }

        });

        connection.release();
    })
};