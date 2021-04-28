# -*- coding: utf-8 -*-
from codecs import decode

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

import database
import db_pyMySQL, model_delete, model_insert

app = Flask(__name__)
CORS(app)


# LOGIN:
# trạng thái:   0 -> "khoá", 1 -> "Ko khoá"
@app.route("/api/v1/login-admin", methods=["POST"])
def check_login():
    if request.form.get("pass"):
        email = request.form["email"]
        mk = request.form["pass"]
        pas_check = mk + database.mysecret_key
        with database.connection.cursor() as cur:
            sql = '''
            SELECT * FROM admin
            WHERE admin = %s
            '''
            cur.execute(sql, (email,))
            admin = cur.fetchone()
            pas_fromDB = admin['matkhau']
            email = admin['admin']
            name = admin['tennv']
            address = admin['diachi']
            phone = admin['sodienthoai']
            permission = admin['maquyen']
            stt = admin['trangthai']
            # pas_decrypt = database.cipher.decrypt(pas_fromDB)

            if pas_check == pas_fromDB:     # mk == pas_decrypt:
                if stt == 1:
                    return jsonify({
                        "status": "Login Success",
                        "message": "Đăng nhập thành công!!!",
                        "admin": admin
                    })
                else:
                    return jsonify({"status": "Login Fail",
                                    "message": "Đăng nhập không thành công do tài khoản của bạn đã bị khoá!!!"})
            else:
                return jsonify({"status": "Login Fail", "message": "Đăng nhập không thành công!!!"})
    return jsonify({"status": "Login Fail", "message": "Lỗi!!! Server không nhận được dữ liệu."})

    # API GET


# Trang index:
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/test")
def test():
    try:
        return jsonify({"status": "OK"})
    except Exception as ex:
        return jsonify({"status": "fail", "message": ex})


@app.route("/api/v1/user", methods=["GET"])
def get_user():
    dataUs = db_pyMySQL.get_all_user()
    return jsonify({"status": "success", "data": dataUs})


@app.route("/api/v1/admin", methods=["GET"])
def get_admin():
    try:
        dataAd = db_pyMySQL.get_all_admin()
        return jsonify({"status": "success", "data": dataAd})
    except Exception as ex:
        return jsonify({"status": "fail", "message": ex})


@app.route("/api/v1/producer", methods=["GET"])
def get_producer():
    dataAd = db_pyMySQL.get_all_producer()
    return jsonify({"status": "success", "data": dataAd})


@app.route("/api/v1/category", methods=["GET"])
def get_category():
    dataAd = db_pyMySQL.get_all_category()
    return jsonify({"status": "success", "data": dataAd})


@app.route("/api/v1/type", methods=["GET"])
def get_type():
    dataAd = db_pyMySQL.get_all_type()
    return jsonify({"status": "success", "data": dataAd})


@app.route("/api/v1/product", methods=["GET"])
def get_product():
    data = db_pyMySQL.get_all_product()
    return jsonify({"status": "success", "data": data})


@app.route("/api/v1/order", methods=["GET"])
def get_order():
    data = db_pyMySQL.get_all_order()
    return jsonify({"status": "success", "data": data})


@app.route("/api/v1/detailOrder", methods=["GET"])
def get_detailOr():
    data = db_pyMySQL.get_all_order()
    return jsonify({"status": "success", "data": data})


@app.route("/api/v1/permission", methods=["GET"])
def get_permission():
    dataPer = db_pyMySQL.get_permission()
    return jsonify({"status": "success", "data": dataPer})


@app.route("/api/v1/status", methods=["GET"])
def get_status():
    dataStt = db_pyMySQL.get_status()
    return jsonify({"status": "success", "data": dataStt})


# API tìm ADMIN theo số điện thoại:
@app.route("/api/v1/admin/<int:admin_phone>", methods=["GET"])
def get_phone_admin(admin_phone):
    try:
        data = db_pyMySQL.get_phone_admin(admin_phone)
        if not data:
            return jsonify({"status": "fail", "message": "Không tìm thấy admin có sdt này!!!"})
        return jsonify({"status": "success", "data": data})
    except Exception as ex:
        return jsonify({"status": "fail", "message": ex})


    # API ADD:
# API Thêm Admin:
@app.route("/api/v1/add-admin", methods=["POST"])
def insert_admin():
    if request.form.get("admin"):
        admin = request.form["admin"]
        name = request.form["name"]
        pas = request.form["pass"]
        phone = request.form["phone"]
        address = request.form["address"]
        permission = request.form["permission"]
        model_insert.insert_admin(admin, name, pas, phone, address, permission)
        return jsonify({"status": "success", "message": "Thêm Admin thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm khách hàng:
@app.route("/api/v1/add-user", methods=["POST"])
def insert_user():
    if request.form.get("tenkh"):
        name = request.form["ten"]
        email = request.form["email"]
        pas = request.form["pass"]
        phone = request.form["sdt"]
        add = request.form["diachi"]
        model_insert.insert_user(name, email, pas, phone, add)
        return jsonify({"status": "success", "message": "Thêm khách hàng thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm sản phẩm:
@app.route("/api/v1/add-product", methods=["POST"])
def insert_product():
    if request.form.get("code"):
        code = request.form["code"]
        name = request.form["ten"]
        price = request.form["gia"]
        redPrice = request.form["giagiam"]
        img = request.form["img"]
        nsx = request.form["msx"]
        type = request.form["loai"]
        model_insert.insert_product(code, name, price, redPrice, img, nsx, type)
        return jsonify({"status": "success", "message": "Thêm sản phẩm thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm danh mục:
@app.route("/api/v1/add-category", methods=["POST"])
def insert_category():
    if request.form.get("ma"):
        ma = request.form["ma"]
        ten = request.form["ten"]
        model_insert.insert_category(ma, ten)
        return jsonify({"status": "success", "message": "Thêm danh mục thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm loại:
@app.route("/api/v1/add-type", methods=["POST"])
def insert_type():
    if request.form.get("ma"):
        ma = request.form["ma"]
        ten = request.form["ten"]
        model_insert.insert_type(ma, ten)
        return jsonify({"status": "success", "message": "Thêm loại thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm nhà sản xuất:
@app.route("/api/v1/add-producer", methods=["POST"])
def insert_producer():
    if request.form.get("code"):
        code = request.form["code"]
        name = request.form["name"]
        xx = request.form["xuatxu"]
        model_insert.insert_producer(code, name, xx)
        return jsonify({"status": "success", "message": "Thêm nhà sản xuất thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm Quyền:
@app.route("/api/v1/add-permission", methods=["POST"])
def insert_permission():
    # import pdb  # debug
    # pdb.set_trace()
    if request.form.get("code"):
        code = request.form["code"]
        name = request.form["name"]
        model_insert.insert_permission(code, name)
        return jsonify({"status": "success", "message": "Thêm quyền thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})


# API Thêm trạng thái:
@app.route("/api/v1/add-status", methods=["POST"])
def insert_status():
    if request.form.get("name"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        name = request.form["name"]
        stt = request.form["stt"]
        model_insert.insert_status(name, stt)
        return jsonify({"status": "success", "message": "Thêm trạng thái thành công!!!"})
    return jsonify({"status": "fail", "message": "Form rỗng không có dữ liệu!!!"})

    # API UPDATE:


    # API DELETE:
# API Khoá tài khoản admin:
@app.route("/api/v1/set-admin", methods=["POST"])
def set_admin():
    if request.form.get("adminId"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        ad = request.form["adminId"]
        if request.form["set"] == '0':  # Khoá tài khoản
            model_delete.lock_admin(ad)
            return jsonify({"status": "success", "message": "Khoá tài khoản admin thành công!!!"})
        else:   # Mở khoá tài khoản
            model_delete.unlock_admin(ad)
            return jsonify({"status": "success", "message": "Mở khoá tài khoản admin thành công!!!"})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Server không nhận được dữ liệu!!!"})


# API Khoá tài khoản khách hàng:
@app.route("/api/v1/lock-user", methods=["POST"])
def lock_user():
    if request.form.get("userId"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        user = request.form["userId"]
        model_delete.lock_user(user)
        return jsonify({"status": "success", "message": "Khoá tài khoản user thành công!!!"})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Khoá tài khoản không thành công!!!"})


# API Mở khoá tài khoản khách hàng:
@app.route("/api/v1/unlock-user", methods=["POST"])
def unlock_user():
    if request.form.get("userId"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        user = request.form["userId"]
        model_delete.unlock_user(user)
        return jsonify({"status": "success", "message": "Mở khoá tài khoản user thành công!!!"})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Mở khoá tài khoản không thành công!!!"})


# API Xoá quyền hạn:
@app.route("/api/v1/del-permission", methods=["POST"])
def delete_permission():
    # import pdb
    # pdb.set_trace()
    if request.form.get("code"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        code = request.form["code"]
        if model_delete.delete_permission(code) == 1:
            return jsonify({"status": "success", "message": "Xoá quyền thành công!!!"})
        return jsonify({"status": "fail", "message": "Ràng buộc khoá ngoại. Xoá không thành công!!!"})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Xoá không thành công!!!"})


# API Xoá trạng thái:
@app.route("/api/v1/del-status", methods=["POST"])
def delete_status():
    if request.form.get("stt"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        stt = request.form["stt"]
        if model_delete.delete_status(stt) == 1:
            return jsonify({"status": "success", "message": "Xoá trạng thái thành công!!!"})
        return jsonify({"status": "fail", "message": "Lỗi!!! Ràng buộc khoá ngoại. Xoá không thành công!!!"
                        , "data": model_delete.delete_status(stt)})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Xoá không thành công!!!"})


# API Xoá nhà sản xuất:
@app.route("/api/v1/del-producer", methods=["POST"])
def delete_producer():
    if request.form.get("mansx"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        mansx = request.form["mansx"]
        if model_delete.delete_producer(mansx) == 1:
            return jsonify({"status": "success", "message": "Xoá nhà sản xuất thành công!!!"})
        return jsonify({"status": "fail", "message": "Lỗi!!! Ràng buộc khoá ngoại. Xoá không thành công!!!"
                        , "data": model_delete.delete_producer(mansx)})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Xoá không thành công!!!"})


# API Xoá loại:
@app.route("/api/v1/del-type", methods=["POST"])
def delete_type():
    if request.form.get("maloai"):  # kiểm tra xem client có gửi dữ liệu lên hay không?
        code = request.form["maloai"]
        if model_delete.delete_type(code) == 1:
            return jsonify({"status": "success", "message": "Xoá loại thành công!!!"})
        return jsonify({"status": "fail", "message": "Lỗi!!! Ràng buộc khoá ngoại. Xoá không thành công!!!"
                        , "data": model_delete.delete_type(code)})
    return jsonify({"status": "fail", "message": "Lỗi form rỗng!!! Xoá không thành công!!!"})


if __name__ == "__main__":
    app.run()
