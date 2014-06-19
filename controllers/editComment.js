/**
 * Created by aleksandar on 13.6.14..
 */

//prima comment_id,text; vraca JSON{status, message}
    //TODO: videti kako cemo da saljemo text za updatovanje
var mysql = require("../config/database");

module.exports = function(req,res){

    if (!(req.user.id && req.body.commnetId && req.body.text)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err, connection){
        if(err){
            console.log(err);
            return;
        }

        connection.query("UPDATE pms.comment SET comment.text = ?" +
            "WHERE id = ??", [text,comment_id],function(err,result){
            if (err){
                console.error(err);
                return;
            }
            if (result.affectedRows > 0){
                var paket_s = {
                    status: true,
                    message: "update_comment_successful"
                };
                res.send(paket_s);
            }
            else {
                var paket_n = {
                    status: true,
                    message: "update_comment_unsuccessful"
                };
                res.send(paket_n);
            }
        });

        connection.release();
    })
};