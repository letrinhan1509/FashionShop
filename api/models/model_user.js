var db = require('./database'); //nhúng model database vào đế kết nối db

exports.checkEmail = (email) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM user WHERE email = '${email}'`;
        db.query(sql, (err, d) => {
            console.log('List success');
            data = d[0];
            hamOK(data);
        })
        }
    )
}
exports.checkUsername = (username) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM user WHERE username = '${username}'`;
        db.query(sql, (err, d) => {
            console.log('List success');
            data = d[0];
            hamOK(data);
        })
        }
    )
}
exports.list = () => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = 'SELECT * FROM khachhang'
        db.query(sql, (err, result) => {
            console.log('List All Users Success!');
            hamOK(result);
        });
    });
};
exports.detailByName = (nameUser) => {
    return new Promise( (hamOK, hamLoi) => {
        let sql = `SELECT * FROM khachhang WHERE tenkh='${nameUser}'`;
        db.query(sql, (err, result) => {
            console.log('User Success!');
            hamOK(result[0]);
        })
    });
}
