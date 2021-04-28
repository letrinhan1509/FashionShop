const db = require('./database');

var dataList = [];
var dataName = [];

            // KHÁCH HÀNG:
    // Danh sách tất cả admin:
exports.listAdmins = () => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = 'SELECT * FROM admin';
        db.query(sql, (err, result) => {
            dataList = result;
            hamOk(dataList);
        });
    });
};
    // Tìm kiếm admin theo tên:
exports.searchByName = (nameAd) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM admin WHERE tennv LIKE '%${nameAd}%'`;
        db.query(sql, (err, result) => {
            dataName = result;
            hamOk(dataName);
        });
    });
};
    // Tìm kiếm admin bằng số điện thoại:
exports.searchByPhone = (sdt) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM admin WHERE sodienthoai=${sdt}`;
        db.query(sql, (err, result) => {
            hamOk(result[0]);
        });
    });
};

            // KHÁCH HÀNG:
    // Danh sách tất cả tài khoản khách hàng:
exports.listUsers = () => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = 'SELECT * FROM khachhang';
        db.query(sql, (err, result) => {
            dataList = result;
            hamOk(dataList);
        });
    });
};
    // Tìm kiếm khách hàng theo tên:
exports.searchUserName = (name) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM khachhang WHERE tenkh LIKE '%${name}%'`;
        db.query(sql, (err, result) => {
            dataName = result;
            hamOk(dataName);
        });
    });
};
    // Tìm kiếm khách hàng bằng số điện thoại:
exports.searchUserPhone = (sdt) => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = `SELECT * FROM khachhang WHERE sodienthoai = '${sdt}'`;
        db.query(sql, (err, result) => {
            dataList = result;
            hamOk(dataList);
        });
    });
};

            // SẢN PHẨM:
    // Danh sách tất cả sản phẩm:
exports.listSanPham = () => {
    return new Promise( (hamOk, hamLoi) => {
        let sql = 'SELECT * FROM sanpham';
        db.query(sql, (err, result) => {
            dataList = result;
            hamOk(dataList);
        });
    });
};
    // Thêm sản phẩm:
exports.createProduct = (code, tensp, gia, hinh, mansx, maloai) => {
    let data = {
        code: code,
        tensp: tensp,
        gia: gia,
        hinh: hinh,
        mansx: mansx,
        maloai: maloai,
    };
    let sql = "INSERT INTO sanpham SET ?";
    let query = db.query(sql, data, (err, result) => {
        console.log('Create product success');
    });
}
    // Sửa sản phẩm:
exports.updateProduct = (idProduct, code, tensp, gia, hinh, mansx, maloai) => {
    let sql = `UPDATE products SET 
                code='${code}', 
                tensp='${tensp}', 
                gia='${gia}',
                hinh='${hinh}',
                mansx='${mansx}',
                maloai='${maloai}',
                WHERE masp=${idProduct}`;
    let query = db.query(sql, (err, result) => {
        console.log('Update product success');
    });
}
    // Xoá sản phẩm:
exports.deleteProduct = (idProduct) => {
    let sql = `DELETE FROM sanpham WHERE masp=${idProduct}`;
    let query = db.query(sql, (err, result) => {
        console.log('Delete product success');
    });
}