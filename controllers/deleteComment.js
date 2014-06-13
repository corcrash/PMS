/**
 * Created by aleksandar on 13.6.14..
 */

//prima comment_id
//vraca JSON{status,message}

var mysql = require ('../config/database');

module.extends = function(req,res){

    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }

    var comment_id = req.body.comment_id;
    if (comment_id === undefined){
        console.error("comment_id_not_recieved");
        return;
    }

    mysql.getConnection( function (err,connection) {
        if (err){
            console.error(err);
            return;
        }
        connection.query("DELETE FROM pms.comment" +
            "WERE id = ?",[comment_id],function (err,result){
            if (err)
            {
                console.error("query_failure_comment_delete");
                return;
            }
            var re = {
                status: true,
                messege: "comment_deleted"
            };

            res.send(re);
        });

        connection.release();
    })
}