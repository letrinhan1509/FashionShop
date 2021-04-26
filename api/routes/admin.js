const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require('../models/database');
const modelAdmin = require('../models/model_admin');
const modelProduct = require('../models/model_product');
const modelCatalog = require('../models/model_catalog');

    // Đăng nhập tài khoản:
router.get('/', function(req, res, next) {
    res.status(200).render('admin/dang-nhap', {
        pageTitle: 'Admin-Login'
    });
});
router.post('/', function(req, res, next) {
    let userName = req.body.username;
    let password = req.body.password;
    let sql = `SELECT * FROM admin WHERE admin='${userName}'`;
    db.query(sql, (err, result) => {
        if(result.length <= 0){
            res.status(200).redirect('/admin/');
            return;
        }
        let user = result[0];
        let pass_fromdb = user.matkhau;

        if(pass_fromdb){

        }
    });
});
router.get('/dashboard', function(req, res, next) {
    res.status(200).render('admin/dashboard', {
        pageTitle: 'Dashboard-Admin',
        patch: '/dashboard'
    });
});
    // Đăng ký tài khoản:
router.get('/dang-ky', async(req, res, next) => {
    res.status(200).render('admin/dang-ky');
});
router.post('/luu', function(req, res, next) {
    let user = req.body.username;
    let ten = req.body.hoten;
    let diachi = req.body.diachi;
    let sdt = req.body.sodienthoai;
    let mk = req.body.matkhau;
    let rmk = req.body.retypeMatkhau;

    if(mk === rmk && mk != ""){

    }else{
        res.render('/admin/dang-ky.ejs');
    }
});
    // Đăng xuất tài khoản:
router.get('/dang-xuat', function(req, res, next) {
    req.session.destroy();
    res.status(200).redirect('/admin');
});
router.get('/tai-khoan-admin', async (req, res, next) => {
    let ListAdmins = await modelAdmin.listAdmins();
    res.status(200).render('admin/tai-khoan-admin', {
        listAdmins: ListAdmins,
        pageTitle: 'Tài Khoản Admin',
        patch: '/tai-khoan-admin'
    });
});
router.get('/tai-khoan-khach-hang', async (req, res, next) => {
    let ListUsers = await modelAdmin.listUsers();
    res.status(200).render('admin/tai-khoan-khach-hang', {
        listUsers: ListUsers,
        pageTitle: 'Tài Khoản Khách Hàng',
        patch: '/tai-khoan-khach-hang'
    });
});
router.get('/san-pham', async(req, res, next) => {
    let ListProducts = await modelProduct.list();
    res.status(200).render('', {
        //listproducts = ListProducts,
        pageTitle: 'Danh sách sản phẩm',
        patch: '/san-pham'
    })
})


module.exports = router;