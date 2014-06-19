/**
 * Created by aleksandar on 19.6.14..
 */

var mysql = require('../config/database');

module.exports = function (res, req){

    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }
    if (!(req.body.user_id && req.body.project_id)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
       if (err){
           console.error(err);
           return;
       }
       connection.query("INSERT pms.user_works_on_project (user_works_on_project.user_id," +
               "user_works_on_project.project_id) VALUES ?",[req.body.user_id, req.body.project_id],
                function(err,result){
                    if (err){
                        console.error(err);
                        return;
                    }
                    if (result.affectedRows > 0){
                        var ret = {
                            status : true,
                            message : result[0]
                        };
                        res.send(ret);
                    }
                    else{
                        var pom = {
                            status : false,
                            message : "insert_failed"
                        };
                        res.send(pom);
                    }
                });
        connection.release();
    });
}