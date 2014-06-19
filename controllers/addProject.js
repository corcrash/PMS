/**
 * Created by aleksandar on 19.6.14..
 */

var mysql = require('../config/database');

module.exports = function (req, res){

    if(!req.user.id){
        console.error("data_not_valid");
        return;
    }

    console.log("Add project!");
    //console.log(req);

    mysql.getConnection(function(err,connection){
        if (err){
            console.error(err);
            return;
        }

        console.log("Connection!");

        connection.query("INSERT INTO pms.projects (name, description, user_id) VALUES (?, ?, ?)", [req.body.name, req.body.description, req.user.id], function (err, result){
            if (err){
                console.error(err);
                return;
            }

            console.log("Prvi insert " + result);
            connection.query("INSERT INTO pms.user_is_admin_of_project (user_id, project_id) " +
                "VALUES (?, ?)",[req.user.id, result.insertId], function (err,result1){
                if (err){
                    console.error(err);
                    return;
                }
                console.log("Drugi insert " + result);
                if (result.affectedRows > 0 && result1.affectedRows > 0){
                    var s_status= {
                        status: true,
                        message: "project_insert_successful"
                    };

                    res.send(s_status);
                }
                else{
                    var n_status = {
                        status: false,
                        message: "project_insert_unsuccessful"
                    };
                    res.send(n_status);
                }

                connection.release();
            })


        });
      })
};