/**
 * Created by aleksandar on 18.6.14..
 */

var mysql = require('../config/database');

module.exports = function(res,req){

    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }
    if (!(req.body.commentText && req.body.user_id &&
        req.body.task_id && req.body.task_project_id)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }
    var queryPaket = {
        text: req.body.commentText,
        user_id : req.body.user_id,
        task_id : req.body.task_id,
        task_project_id : req.body.task_project_id
    };
        connection.query("INSERT INTO pms.comments SET",
        connection.escape(queryPaket),function(err, result){
                if(err){
                    console.error(err);
                    return;
                }
                if(result){
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