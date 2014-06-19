var mysql = require('../config/database');

module.exports = function(res,req){

    if (req.user.id === undefined){
        console.error("user_id_not_valid");
        return;
    }
    if (!req.body.taskData){
        console.error("data_not_valid");
        return;
    }

    mysql.getConnection(function(err,connection){
        if(err){
            console.error(err);
            return;
        }

        var taskId = req.body.taskData.id;
        var name = req.body.taskData.name;
        var description = req.body.taskData.description;
        var isFinished = req.body.taskData.isFinished;
        var deadline = req.body.taskData.deadline;

        connection.query("UPDATE pms.tasks SET name=?, description=?, is_finished=?, deadline=? WHERE id=?",
            [name, description, isFinished, deadline, taskId] ,function(err, result){
                if(err){
                    console.error(err);
                    return;
                }
                if(result.rowsAffected > 0){
                    var paket_s = {
                        status : true,
                        message: "update_successful"
                    };
                    res.send(paket_s);
                }
                else{
                    var paket_n = {
                        status : false,
                        message : "update_unsuccessful"
                    };
                    res.send(paket_n);
                }

                connection.release();

            })
    })

};