var mysql = require('../config/database');

module.exports = function(res,req){

    if (!(req.user.id && req.body.taskId)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }

        connection.query("DELETE * FROM pms.tasks WHERE id=?", [req.body.taskId],
            function(err, result){
                if(err){
                    console.error(err);
                    return;
                }
                if(result.rowsAffected > 0){
                    var paket_s = {
                        status : true,
                        message: "delete_successful"
                    };
                    res.send(paket_s);
                }
                else{
                    var paket_n = {
                        status : false,
                        message : "delete_unsuccessful"
                    };
                    res.send(paket_n);
                }

                connection.release();

            })
    })

};