/**
 * Created by aleksandar on 13.6.14..
 */

//prima comment_id,text; vraca JSON{status, message}
    //TODO: videti kako cemo da saljemo text za updatovanje
var mysql = require('../cofig/database');

module.exports = function(req,res){

    var comment_id = req.body.comment_id;
    var text =  req.body.text;

    if (comment_id === undefined){
        console.error(err);
        return;
    }

    mysql.getConnection(function(err, connection){
        if(err){
            console.log(err);
            return;
        }

        connection.query("UPDATE pms.comment SET comment.text = ?" +
            "WHERE id = ??", [text,comment_id],function(err){
            if (err){
                console.error(err);
                return;
            }
            var pom = {
                status: true,
                message: "update_comment_successful"
            };
            res.send(pom);
        });
        connection.release();
    })

};