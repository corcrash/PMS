/**
 * Created by aleksandar on 19.6.14..
 */

var mysql = require('../config/database');

module.exports = function (req,res){

    if(!(req.user.id && req.body.name && req.body.description)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if (err){
            console.error(err);
            return;
        }

        connection.query("INSERT INTO pms.projects (project.name, project.description) " +
            "VALUES ?, ?"),[req.body.name, req.body.description], function (err,result){
            if (err){
                console.error(err);
                return;
            }
            connection.query("INSERT INTO pms.user_is_admin_of_project (user_id, project_id) " +
                "VALUES ?, ?",[req.user.id, result.insertId], function (err,result1){
                if (err){
                    console.error(err);
                    return;
                }
                if (result.affectedRows > 0 && result1.affectedRows > 0){
                    var s_status= {
                        status: true,
                        message: "project_insert_successful"
                    };

                    res.send(s_status);
                }
                else{
                    var n_status = {
                        status: false,
                        message: "project_insert_unsuccessful"
                    };
                    res.send(n_status);
                }
            })

            connection.release();
        };
      })
};