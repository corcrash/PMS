var path = require('path');
var fs = require('fs');
var mysql = require("../config/database");
var formidable = require("formidable");

module.exports = function (req, res) {
    var form = formidable.IncomingForm({uploadDir: './public/tmp/images'});

    console.log(req.body);
    form.parse(req, function(err, fields, files) {
        console.log(files);
        var tempPath = files.avatar.path;
        var targetPath = path.resolve('./public/user_data/' + req.user.id + '/avatar.png');

        if (path.extname(files.avatar.name).toLowerCase() === '.png') {
            if(!fs.existsSync('./public/user_data/' + req.user.id))
                fs.mkdirSync('./public/user_data/' + req.user.id);

            fs.rename(tempPath, targetPath, function (err) {
                if (err) throw err;
                editProfile(req, res);
            });
        } else {
            fs.unlink(tempPath, function () {
                if (err) throw err;

                res.send({
                    status: true,
                    message: 'image_upload_unsuccessful'
                });
            });
        }
    });

//
}

function editProfile(req, res) {
    var id = req.user.id;
    if (id === undefined) {
        console.error("user_id_not_valid");
        return;
    }

    mysql.getConnection(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var user_avatar = './user_data/' + req.user.id + '/avatar.png';

        connection.query("UPDATE pms.users SET avatar=? WHERE id=?", [user_avatar, id], function (err) {
            if (err) {
                console.error(err);
                return;
            }
            res.send({
                status: true,
                message: 'image_upload_successful',
                url: user_avatar
            });
        });

        connection.release();
    })
}