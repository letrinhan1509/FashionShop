var express = require('express');
var router = express.Router();
var db = require('../models/database')
const modelUser = require('../models/model_user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get('/tai-khoan', function (req, res, next) {
    if (req.session.User) {
        res.render("site/my-account.ejs", { user: req.session.User });
    } else {
        req.session.back = "/users/tai-khoan";
        res.redirect("/users/dang-nhap");
    }
});

const signToken = (id) => {
	return jwt.sign({ id }, 'nhan', {
		expiresIn: '90d',
	});
};
router.get('/thanh-cong', function (req, res, next) {
    let message = "Đăng ký thành công";
    res.render('site/thanh-cong', { message: message })
})
router.get('/dang-xuat', function (req, res, next) {
    req.session.destroy();
    res.redirect("/users/dang-nhap");
});
router.post('/doi-mat-khau', function (req, res, next) {
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let confirmPassword = req.body.confirmPassword;
    let u = req.session.User.username;
    console.log(u)
    let sql = 'SELECT * FROM user WHERE username = ?';
    db.query(sql, [u], (err, rows) => {
        if (rows.length <= 0) { res.redirect("/users/error"); return; }
        let user = rows[0];
        let pass_fromdb = user.password;
        var kq = bcrypt.compareSync(password, pass_fromdb);
        if (kq) {
            if (newPassword === confirmPassword) {
                var salt = bcrypt.genSaltSync(10);
                var pass_mahoa = bcrypt.hashSync(newPassword, salt);
                let sql2 = `UPDATE user SET password='${pass_mahoa}' WHERE username LIKE '%${u}%'`;
                db.query(sql2, (err, result) => {
                    console.log('Update success');
                    let mess = "Đổi mật khẩu thành công";
                    res.render('site/thanh-cong', { message: mess })
                });
            }
        }
    });
})

router.get('/quen-mat-khau', (req, res) => {
    res.render('site/quen-mat-khau', { message: '' });
})
router.post('/quen-mat-khau', async (req, res) => {
    let email = req.body.email;
    let checkEmail = await modelUser.checkEmail(email); // Kiểm tra email có trong database hay không

    if (email == '') {
        let mess = "Mời bạn nhập email";
        res.render('site/quen-mat-khau', { message: mess });
    }
    if (checkEmail) { // Nếu email có trong database
        let mess = `Mật khẩu đã được gửi qua email ${email} của bạn!`;
        let newPassword = Math.random().toString(36).substring(7);

        var salt = bcrypt.genSaltSync(10);
        var pass_mahoa = bcrypt.hashSync(newPassword, salt);
        let sql = `UPDATE user SET password='${pass_mahoa}' WHERE email='${email}' `;
        db.query(sql, (err, result) => { console.log('Update success'); });

        var nodemailer = require('nodemailer'); // Nhúng module nodemailer để gửi password vào email của khách hàng

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: '', pass: '' }, // Email của người gửi
            tls: { rejectUnauthorized: false }
        });

        var mailOptions = {
            from: 'kenbi.njr@gmail.com', //Email người gửi
            to: `${email}`, // Email người nhận
            subject: 'Lấy lại mật khẩu',
            //text: 'Nội dung thư, không có code html'
            html: `Cửa hàng Fullfacestore xin gửi lại mật khẩu của bạn. <br>
      Your password: <b style="padding: 5px 7px; background: #eee; color: red"> ${newPassword} </b>`, // Nội dung thư, có thể có code html
        };

        transporter.sendMail(mailOptions, function (error, info) {

            if (error) console.log(error);
            else console.log('Đã gửi mail: ' + info.response);
            res.render('site/thanh-cong', { message: mess });
        });
    } else {
        let mess = "Email không tồn tại!";
        res.render('site/quen-mat-khau', { message: mess });
    }
})


// API
// Danh sách tất cả khách hàng:
router.get('/api/khach-hang', async function (req, res) {
    let listUsers = await modelUser.list();
    res.json(listUsers);
});
router.get('/api/dang-ky', async function (req, res) {
    res.json('success');
});
// Đăng ký tài khoản:
router.post('/api/dang-ky', function (req, res, next) {
    let ten = req.body.tenkh;
    let em = req.body.email;
    let mk = req.body.matkhau;
    let rmk = req.body.nhaplaimk;
    let sdt = req.body.sodienthoai;
    let dc = req.body.diachi;

    if (mk === rmk && mk != "") {
        // Mã hoá mật khẩu:
        //var salt = bcrypt.genSaltSync(10);
        //var pass_mahoa = bcrypt.hashSync(mk, salt);

        let kh_info = { tenkh: ten, email: em, matkhau: mk, sodienthoai: sdt, diachi: dc };

        let sql = 'INSERT INTO khachhang SET ?';
        db.query(sql, kh_info, (err, d) => {
            console.log('Insert User success');
        });
    } else {
        res.json('fail');
    }
    res.json('success');
})
// Đăng nhập tài khoản:
router.post('/api/dang-nhap', function (req, res, next) {
    let em = req.body.email;
    let mk = req.body.matkhau;

    let sql = `SELECT tenkh, email, sodienthoai, diachi FROM khachhang WHERE email = '${em}'`;
    db.query(sql, (err, rows) => {
        if (rows.length <= 0) {
            //res.redirect("/users/dang-nhap");
            //return;
            res.json('fail');
        }
        let user = rows[0];
        let pass_fromdb = user.matkhau;
        let username = user.tenkh; // Lấy mật khẩu từ DB lên.
        console.log(user);
        console.log("Mật khẩu DB:", pass_fromdb);
        console.log(username);
        var kq = bcrypt.compareSync(mk, pass_fromdb); //
        console.log(kq);
        ////
         const token = signToken(user._id);
        const cookieOptions = {
            expires: new Date(
                Date.now() + 90 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        }; 

        res.cookie("jwt", token, cookieOptions);

         //Remove password from output
        //user.password = undefined;

        if (mk === pass_fromdb) {
            console.log("OK!!! Đăng nhập thành công");
            //res.json(user);
            res.json({
                status: "success",
                data: {
                    user
                },
                token
            });

        }
        /* if (kq) {
            console.log("OK");
            res.json(user);
            res.json('success');
        } */ else {
            console.log("Not OK");
            res.json('fail');
        }
    });
});
// Tìm khách hàng bằng tên:
router.get('/api/chi-tiet-khach-hang/:name', async function (req, res) {
    let nameUser = req.params.name;
    let User = await modelUser.detailByName(nameUser);
    console.log(User);
    res.json(User);
});
//Admin
//Danh sách tai khoảng Admin
router.get('/api/admin', async function (req, res) {
    let listAdmin = await modelUser.listAdmin();
    res.json(listAdmin);
});
///Đăng kí tk admin
router.post('/api/dang-ky-admin', function (req, res, next) {
    let ten = req.body.tennv;//
    let em = req.body.email;//
    let mk = req.body.matkhau;//
    let rmk = req.body.nhaplaimk;//
    let sdt = req.body.sodienthoai;//
    let dc = req.body.diachi;//
    let pq = req.body.maquyen

    if (mk === rmk && mk != "") {
        // Mã hoá mật khẩu:
        //var salt = bcrypt.genSaltSync(10);
        //var pass_mahoa = bcrypt.hashSync(mk, salt);

        let kh_info = { admin: em, matkhau: mk, tennv: ten, diachi: dc ,sodienthoai: sdt,
            maquyen: pq };

        let sql = 'INSERT INTO admin SET ?';
        db.query(sql, kh_info, (err, d) => {
            console.log('Insert User success');
        });
    } else {
        res.json('fail');
    }
    res.json('success');
})
module.exports = router;