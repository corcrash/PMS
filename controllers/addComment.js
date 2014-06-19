/**
 * Created by aleksandar on 18.6.14..
 */

var mysql = require('../config/database');

module.exports = function(res,req){

    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }
    if (!(req.body.commentText && req.body.task_id && req.body.project_id)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }

        connection.query("INSERT INTO pms.comments (comments.text,comments.user_id, " +
            "comments.task_id, comments.task_project_id VALUES",[req.body.commentText,
            req.body.user_id, req.body.task_id, req.body.project_id],function(err, result){
                if(err){
                    console.error(err);
                    return;
                }
                if(result.affectedRows > 0){
                    var paket_s = {
                        status : true,
                        message: result[0]
                    };
                    res.send(paket_s);
                }
                else{
                    var paket_n = {
                        status : true,
                        message : "insert_unsuccessful"
                    };
                    res.send(paket_n);
                }

            })
    })

};