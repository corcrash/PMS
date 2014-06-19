var mysql = require('../config/database');

module.exports = function(res,req){

    if (!(req.user.id && req.body.projectId)){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }


        connection.query("INSERT INTO pms.tasks (id, name, create_time, deadline, is_finished, " +
                "description, project_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [null, '', 'CURRENT_TIME', null, false, '', req.body.projectId],
                function(err, result){
                if(err){
                    console.error(err);
                    return;
                }
                if(result.rowsAffected > 0){
                    var paket_s = {
                        status : true,
                        message: "insert_successful"
                    };
                    res.send(paket_s);
                }
                else{
                    var paket_n = {
                        status : false,
                        message : "insert_unsuccessful"
                    };
                    res.send(paket_n);
                }

                connection.release();

            })
    })

};