/**
 * Created by aleksandar on 19.6.14..
 */

var mysql = require('../config/database');

module.exports = function (req, res){

    if (!(req.user.id && req.body.project_id)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
       if (err){
           console.error(err);
           return;
       }
       connection.query("INSERT INTO pms.user_works_on_project (user_works_on_project.user_id," +
               "user_works_on_project.project_id) VALUES ?",[req.user.id, req.body.project_id],
                function(err,result){
                    if (err){
                        console.error(err);
                        return;
                    }
                    if (result.affectedRows > 0){
                        var ret = {
                            status : true,
                            message : "member_insert_sucessful"
                        };
                        res.send(ret);
                    }
                    else{
                        var pom = {
                            status : false,
                            message : "member_insert_failed"
                        };
                        res.send(pom);
                    }
                });
        connection.release();
    });
}