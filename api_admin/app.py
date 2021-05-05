   # -*- coding: utf-8 -*-

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import database
import db_pyMySQL
import model_delete
import model_insert

import os
from werkzeug.utils import secure_filename, redirect

UPLOAD_FOLDER = '../client/public/images/test'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)


# Trang index:
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/test")
def test():
    try:
        return jsonify({"status": "Success"})
    except Exception as ex:
        return jsonify({"status": "Fail", "message": ex})


    # LOGIN:
# API Login admin, trạng thái:   0 -> "khoá", 1 -> "Ko khoá"
@app.route("/api/v1/login-admin", methods=["POST"])
def check_login():  # request.json[""]
    email = request.json["email"]
    mk = request.json["Password"]
    pas_check = mk #+database.mysecret_key
    with database.connection.cursor() as cur:
        sql = '''
            SELECT admin, matkhau, tennv, diachi, sodienthoai, maquyen, trangthai
            FROM admin
            WHERE admin = %s
        '''
        cur.execute(sql, (email,))
        admin = cur.fetchone()
        pas_fromDB = admin['matkhau']
        stt = admin['trangthai']
        # pas_decrypt = database.cipher.decrypt(pas_fromDB)
        if pas_check == pas_fromDB:  # mk == pas_decrypt:
            if stt == 1:
                return jsonify({
                    "status": "Success",
                    "message": "Đăng nhập thành công!!!",
                    "admin": admin
                })
            else:
                return jsonify({"status": "lockUser",
                                "message": "Đăng nhập không thành công do tài khoản của bạn đã bị khoá!!!"})
        else:
            return jsonify({"status": "error", "message": "Đăng nhập không thành công!!!"})


# API Login user, trạng thái:   0 -> "khoá", 1 -> "Ko khoá".
@app.route("/api/v1/login-user", methods=["POST"])
def check_login_user():  # request.json[""]
    email = request.json["email"]
    mk = request.json["pass"]
    pas_check = mk #+ database.mysecret_key
    with database.connection.cursor() as cur:
        sql = '''
            SELECT tenkh, email, matkhau, sodienthoai, diachi, trangthai
            FROM khachhang
            WHERE email = %s
        '''
        cur.execute(sql, (email,))
        user = cur.fetchone()
        pas_fromDB = user['matkhau']
        if pas_check == pas_fromDB:  # Kiểm tra mật khẩu.
            if user['trangthai'] == 1:    # Tài khoản ko bị khoá có thể đăng nhập.
                return jsonify({
                    "status": "Success",
                    "message": "Đăng nhập thành công!!!",
                    "admin": user
                })
            else:   # Tài khoản bị khoá ko thể đăng nhập.
                return jsonify({"status": "loginUser",
                                "message": "Đăng nhập không thành công do tài khoản của bạn đã bị khoá!!!"})
        else:
            return jsonify({"status": "error", "message": "Sai mật khẩu. Đăng nhập không thành công!!!"})


    # API GET
# API Lấy tất cả danh sách khách hàng:
@app.route("/api/v1/user", methods=["GET"])
def get_user():
    dataUs = db_pyMySQL.get_all_user()
    return jsonify({"status": "Success", "data": dataUs})


# API Lấy tất cả danh sách admin:
@app.route("/api/v1/admin", methods=["GET"])
def get_admin():
    try:
        dataAd = db_pyMySQL.get_all_admin()
        return jsonify({"status": "Success", "data": dataAd})
    except Exception as ex:
        return jsonify({"status": "Fail", "message": ex})


# API Lấy tất cả danh sách nhà sản xuất:
@app.route("/api/v1/producer", methods=["GET"])
def get_producer():
    dataAd = db_pyMySQL.get_all_producer()
    return jsonify({"status": "Success", "data": dataAd})


# API Lấy tất cả danh mục:
@app.route("/api/v1/category", methods=["GET"])
def get_category():
    dataAd = db_pyMySQL.get_all_category()
    return jsonify({"status": "Success", "data": dataAd})


# API Lấy tất cả danh sách loại:
@app.route("/api/v1/type", methods=["GET"])
def get_type():
    dataAd = db_pyMySQL.get_all_type()
    return jsonify({"status": "Success", "data": dataAd})


# API Lấy tất cả danh sách sản phẩm:
@app.route("/api/v1/product", methods=["GET"])
def get_product():
    data = db_pyMySQL.get_all_product()
    return jsonify({"status": "Success", "data": data})


@app.route("/api/v1/order", methods=["GET"])
def get_order():
    data = db_pyMySQL.get_all_order()
    return jsonify({"status": "Success", "data": data})


# API Lấy danh sách chi tiết đơn hàng theo mã đơn hàng:
@app.route("/api/v1/detail-order/<int:order_id>", methods=["GET"])
def get_detailOrder(order_id):
    try:
        data = db_pyMySQL.get_all_detailOrder(order_id)
        if not data:  # data = null => ko có chi tiết đơn hàng theo mã đơn hàng.
            return jsonify({"status": "Fail", "message": "Không tìm thấy chi tiết đơn hàng có mã đơn hàng này!!!"})
        else:  # data != null => Có chi tiết đơn hàng theo mã đơn hàng.
            return jsonify({"status": "Success", "data": data})
    except Exception as ex:
        return jsonify({"status": "Fail", "message": ex})


@app.route("/api/v1/permission", methods=["GET"])
def get_permission():
    dataPer = db_pyMySQL.get_permission()
    return jsonify({"status": "Success", "data": dataPer})


@app.route("/api/v1/status", methods=["GET"])
def get_status():
    dataStt = db_pyMySQL.get_status()
    return jsonify({"status": "Success", "data": dataStt})


# API tìm ADMIN theo số điện thoại:
@app.route("/api/v1/admin/<int:admin_phone>", methods=["GET"])
def get_phone_admin(admin_phone):
    try:
        data = db_pyMySQL.get_phone_admin(admin_phone)
        if not data:
            return jsonify({"status": "Fail", "message": "Không tìm thấy admin có sdt này!!!"})
        return jsonify({"status": "Success", "data": data})
    except Exception as ex:
        return jsonify({"status": "Fail", "message": ex})

@app.route("/api/v1/admin-id/<int:admin_id>", methods=["GET"])
def get_admin_id(admin_id):
        try:
            data = db_pyMySQL.get_code_admin(admin_id)
            if not data:
                return jsonify({"status": "fail", "message": "Không tìm thấy admin có mã số  này!!!"})
            return jsonify({"status": "success", "data": data})
        except Exception as ex:
            return jsonify({"status": "fail", "message": ex})


@app.route("/api/v1/producer-id/<string:producer_id>", methods=["GET"])
def get_producer_id(producer_id):
        try:
            data = db_pyMySQL.get_producer_id(producer_id)
            if not data:
                return jsonify({"status": "fail", "message": "Không tìm thấy admin có mã số  này!!!"})
            return jsonify({"status": "success", "data": data})
        except Exception as ex:
            return jsonify({"status": "fail", "message": ex})


@app.route("/api/v1/type-id/<string:type_id>", methods=["GET"])
def get_type_id(type_id):
        try:
            data = db_pyMySQL.get_code_type(type_id)
            if not data:
                return jsonify({"status": "fail", "message": "Không tìm thấy mã loại !!!"})
            return jsonify({"status": "success", "data": data})
        except Exception as ex:
            return jsonify({"status": "fail", "message": ex})


# API Tìm product theo id:
@app.route("/api/v1/product-id/<int:product_id>", methods=["GET"])
def get_product_id(product_id):
    try:
        data = db_pyMySQL.check_product_id(product_id)
        if not data:
            return jsonify({"status": "Fail", "message": "Không tìm thấy sản phẩm có id này!!!"})
        return jsonify({"status": "Success", "message": "Tìm thấy sản phẩm", "data": data})
    except Exception as ex:
        return jsonify({"status": "Fail", "message": ex})


# API Tìm product theo tên:
@app.route("/api/v1/product/<string:product_name>", methods=["GET"])
def get_product_name(product_name):
    try:
        data = db_pyMySQL.get_product_name(product_name)
        if not data:
            return jsonify({"status": "Fail", "message": "Không tìm thấy sản phẩm có tên này!!!"})
        return jsonify({"status": "Success", "data": data})
    except Exception as ex:
        return jsonify({"status": "Fail", "message": ex})


# API ADD:
# API Thêm Admin:

@app.route("/api/v1/add-admin", methods=["POST"])
def insert_admin():
    admin = request.json["admin"]
    name = request.json["name"]
    pas = request.json["pass"]
    phone = request.json["phone"]
    address = request.json["address"]
    permission = request.json["permission"]
    model_insert.insert_admin(admin, pas, name, address, phone, permission)
    return jsonify({"status": "Success", "message": "Thêm Admin thành công!!!"})



# API Thêm khách hàng:
@app.route("/api/v1/add-user", methods=["POST"])
def insert_user():
    name = request.json["name"]
    email = request.json["email"]
    pas = request.json["pass"]
    phone = request.json["phone"]
    add = request.json["address"]
    model_insert.insert_user(name, email, pas, phone, add)
    return jsonify({"status": "Success", "message": "Thêm khách hàng thành công!!!"})


# API Thêm sản phẩm:
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/api/v1/add-img", methods=["POST"])
def insert_img():
    try:
        if request.method == 'POST':
            if 'img' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['img']
            # if user does not select file, browser also
            # submit a empty part without filename
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    except Exception as ex :
        return jsonify(ex)


@app.route("/api/v1/add-product", methods=["POST"])
def insert_product():
    code = request.json["code"]
    name = request.json["name"]
    price = request.json["price"]
    redPrice = request.json["redPrice"]
    amount = request.json["amount"]
    img = request.json["img"]
    producer = request.json["producer"]
    types = request.json["type"]
    model_insert.insert_product(code, name, price, redPrice, amount, img, producer, types)
    return jsonify({"status": "Success", "message": "Thêm sản phẩm thành công!!!"})


# API Thêm danh mục:
@app.route("/api/v1/add-category", methods=["POST"])
def insert_category():
    ma = request.json["ma"]
    name = request.json["name"]
    model_insert.insert_category(ma, name)
    return jsonify({"status": "Success", "message": "Thêm danh mục thành công!!!"})


# API Thêm loại:
@app.route("/api/v1/add-type", methods=["POST"])
def insert_type():
    ma = request.json["ma"]
    name = request.json["name"]
    model_insert.insert_type(ma, name)
    return jsonify({"status": "Success", "message": "Thêm loại thành công!!!"})


# API Thêm nhà sản xuất:
@app.route("/api/v1/add-producer", methods=["POST"])
def insert_producer():
    code = request.json["code"]
    name = request.json["name"]
    origin = request.json["origin"]     # xuất xứ
    model_insert.insert_producer(code, name, origin)
    return jsonify({"status": "Success", "message": "Thêm nhà sản xuất thành công!!!"})


# API Thêm Quyền:
@app.route("/api/v1/add-permission", methods=["POST"])
def insert_permission():
    # import pdb  # debug
    # pdb.set_trace()
    code = request.json["code"]
    name = request.json["name"]
    model_insert.insert_permission(code, name)
    return jsonify({"status": "Success", "message": "Thêm quyền thành công!!!"})


# API Thêm trạng thái:
@app.route("/api/v1/add-status", methods=["POST"])
def insert_status():
    name = request.json["name"]
    stt = request.json["stt"]
    model_insert.insert_status(name, stt)
    return jsonify({"status": "Success", "message": "Thêm trạng thái thành công!!!"})


    # API UPDATE:
# API Sửa thông tin admin:
@app.route("/api/v1/update-profile-admin", methods=["POST"])
def update_profile_admin():
    admin_id = request.json["id"]
    email = request.json["email"]
    name = request.json["name"]
    address = request.json["address"]
    phone = request.json["phone"]
    permission = request.json["permission"]
    if db_pyMySQL.check_admin_id(admin_id) == 1:    # Kiểm tra admin trong DB.
        if model_insert.update_profile_admin(email, name, address, phone,
                                             permission, admin_id) == 1:  # Có admin trong DB và sửa thành công.
            return jsonify({"status": "Success", "message": "Sửa thông tin admin thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa thông tin admin không thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy tài khoản admin trong Database!!!"})


# API Cập nhật mật khẩu của tài khoản admin:
@app.route("/api/v1/update-password-admin", methods=["POST"])
def update_password_admin():
    admin_id = request.json["adminId"]
    password = request.json["password"]
    if db_pyMySQL.check_admin_id(admin_id) == 1:  # Kiểm tra admin trong DB.
        if model_insert.update_password_admin(password, admin_id) == 1:  # Có admin trong DB và sửa thành công.
            return jsonify({"status": "Success", "message": "Sửa mật khẩu admin thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa mật khẩu admin không thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy tài khoản admin trong Database!!!"})


# API Sửa thông tin khách hàng:
@app.route("/api/v1/update-profile-user", methods=["POST"])
def update_profile_user():
    user_id = request.json["id"]
    name = request.json["name"]
    email = request.json["email"]
    phone = request.json["phone"]
    address = request.json["address"]
    if db_pyMySQL.check_user_id(user_id) == 1:  # Kiểm tra user trong DB.
        if model_insert.update_profile_user(name, email, phone, address,
                                            user_id) == 1:  # Có user trong DB và sửa thành công.
            return jsonify({"status": "Success", "message": "Sửa thông tin khách hàng thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa thông tin khách hàng không thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy tài khoản khách hàng trong Database!!!"})


# API Cập nhật mật khẩu của tài khoản khách hàng:
@app.route("/api/v1/update-password-user", methods=["POST"])
def update_password_user():
    user_id = request.json["userId"]
    password = request.json["password"]
    if db_pyMySQL.check_user_id(user_id) == 1:  # Kiểm tra user trong DB.
        if model_insert.update_password_user(password, user_id) == 1:  # Có user trong DB và sửa thành công.
            return jsonify({"status": "Success", "message": "Sửa mật khẩu khách hàng thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa mật khẩu khách hàng không thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy tài khoản khách hàng trong Database!!!"})


# API Sửa danh mục:
@app.route("/api/v1/update-category", methods=["POST"])
def update_category():
    category_id = request.json['categoryId']
    name = request.json['name']
    if db_pyMySQL.check_category_id(category_id) == -1:
        return jsonify({"status": "Fail", "message": "Không tìm thấy danh mục trong Database!!!"})
    else:
        if model_insert.update_category(name, category_id) == 1:
            return jsonify({"status": "Success", "message": "Sửa danh mục thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa danh mục không thành công!!!"})


# API Sửa loại:
@app.route("/api/v1/update-type", methods=["POST"])
def update_type():
    type_id = request.json['typeId']
    name = request.json['name']
    if db_pyMySQL.check_type_id(type_id) == 1:
        if model_insert.update_type(name, type_id) == 1:
            return jsonify({"status": "Success", "message": "Sửa loại thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa loại không thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy loại trong Database!!!"})


# API Sửa nhà sản xuất:
@app.route("/api/v1/update-producer", methods=["POST"])
def update_producer():
    producer_id = request.json['producerId']
    name = request.json['name']
    origin = request.json['origin']
    if db_pyMySQL.check_producer_id(producer_id) == -1:  # Ko có NSX trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy nhà sản xuất trong Database!!!"})
    else:
        if model_insert.update_producer(name, origin, producer_id) == 1:
            return jsonify({"status": "Success", "message": "Sửa nhà sản xuất thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa nhà sản xuất không thành công!!!"})


# API Sửa quyền:
@app.route("/api/v1/update-permission", methods=["POST"])
def update_permission():
    permission_id = request.json['permissionId']
    name = request.json['name']
    if db_pyMySQL.check_permission_id(permission_id) == -1:     # Ko có quyền trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy quyền trong Database!!!"})
    else:
        if model_insert.update_permission(name, permission_id) == 1:
            return jsonify({"status": "Success", "message": "Sửa quyền thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa quyền không thành công!!!"})


# API Sửa trạng thái:
@app.route("/api/v1/update-status", methods=["POST"])
def update_status():
    status_id = request.json['statusId']
    name = request.json['name']
    if db_pyMySQL.check_status_id(status_id) == -1:  # Ko tìm thấy trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy trạng thái trong Database!!!"})
    else:
        if model_insert.update_status(name, status_id) == 1:
            return jsonify({"status": "Success", "message": "Sửa trạng thái thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa trạng thái không thành công!!!"})


# API Sửa sản phẩm:
@app.route("/api/v1/update-product", methods=["POST"])
def update_product():
    product_id = request.json['productId']
    code = request.json['code']
    name = request.json['name']
    price = request.json['price']
    redPrice = request.json["redPrice"]
    amount = request.json['amount']
    img = request.json['img']
    producer_id = request.json['producerId']
    type_id = request.json['typeIid']
    if db_pyMySQL.check_product_id(product_id) == -1:
        return jsonify({"status": "Fail", "message": "Không tìm thấy sản phẩm trong Database!!!"})
    else:   # Tìm thấy sản phẩm trong DB
        if model_insert.update_product(code, name, price, redPrice, amount, img, producer_id, type_id, product_id) == 1:
            return jsonify({"status": "Success", "message": "Sửa sản phẩm thành công!!!"})
        return jsonify({"status": "Fail", "message": "Sửa sản phẩm không thành công!!!"})


    # API DELETE:
# API Khoá tài khoản admin:
@app.route("/api/v1/lock-admin/<int:admin_id>", methods=["GET"])
def lock_admin(admin_id):
    if model_delete.lock_admin(admin_id) == 1:    # Có admin trong DB và khoá thành công.
        return jsonify({"status": "Success", "message": "Khoá tài khoản admin thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy tài khoản admin trong Database!!!"})


# API Mở khoá tài khoản admin:
@app.route("/api/v1/unlock-admin/<int:admin_id>", methods=["GET"])
def unlock_admin(admin_id):
    if model_delete.unlock_admin(admin_id) == 1:
        return jsonify({"status": "Success", "message": "Mở khoá tài khoản admin thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy tài khoản admin trong Database!!!"})


# API Khoá tài khoản khách hàng:
@app.route("/api/v1/lock-user/<int:user_id>", methods=["GET"])
def lock_user(user_id):
    if model_delete.lock_user(user_id) == 1:
        return jsonify({"status": "Success", "message": "Khoá tài khoản user thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy user trong Database!!!"})


# API Mở khoá tài khoản khách hàng:
@app.route("/api/v1/unlock-user/<int:user_id>", methods=["GET"])
def unlock_user(user_id):
    if model_delete.unlock_user(user_id) == 1:
        return jsonify({"status": "Success", "message": "Mở khoá tài khoản user thành công!!!"})
    return jsonify({"status": "Fail", "message": "Không tìm thấy user trong Database!!!"})


# API Xoá quyền hạn:
@app.route("/api/v1/del-permission/<int:code>", methods=["GET"])
def delete_permission(code):
    # code = request.json["code"]
    if db_pyMySQL.check_permission_id(code) == -1:   # Ko có quyền trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy quyền trong Database!!!"})
    else:   # Có quyền trong DB.
        if model_delete.delete_permission(code) == 1:   # Không bị ràng buộc khoá ngoại => Xoá thành công.
            return jsonify({"status": "Success", "message": "Xoá quyền thành công!!!"})
        return jsonify({"status": "Fail", "message": "Ràng buộc khoá ngoại. Không thể xoá!!!"})


# API Xoá trạng thái:
@app.route("/api/v1/del-status/<int:stt>", methods=["GET"])
def delete_status(stt):
    # stt = request.json["stt"]   # Lấy khoá chính của table trangthai trong DB.
    if db_pyMySQL.check_status_id(stt) == -1:    # Ko tìm thấy trạng thái trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy trạng thái trong Database!!!"})
    else:   # Tìm thấy trạng thái trong DB.
        if model_delete.delete_status(stt) == 1:    # Kô bị ràng buộc khoá ngoại nên có thể xoá.
            return jsonify({"status": "Success", "message": "Xoá trạng thái thành công!!!"})
        return jsonify({"status": "Fail", "message": "Lỗi ràng buộc khoá ngoại, không thể xoá!!!"})


# API Xoá nhà sản xuất:
@app.route("/api/v1/del-producer/<string:producer_id>", methods=["GET"])
def delete_producer(producer_id):
    # producer_id = request.json["producerId"]
    if db_pyMySQL.check_producer_id(producer_id) == -1:   # Ko có NSX trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy nhà sản xuất trong Database!!!"})
    else:
        if model_delete.delete_producer(producer_id) == 1:
            return jsonify({"status": "Success", "message": "Xoá nhà sản xuất thành công!!!"})
        return jsonify({"status": "Fail", "message": "Lỗi ràng buộc khoá ngoại, không thể xoá!!!"})


# API Xoá loại:
@app.route("/api/v1/del-type/<string:type_id>", methods=["GET"])
def delete_type(type_id):
    # type_id = request.json["typeId"]
    if db_pyMySQL.check_type_id(type_id) == -1:  # Ko tìm thấy loại trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy loại trong Database!!!"})
    else:   # Tìm thấy loại trong DB.
        if model_delete.delete_type(type_id) == 1:
            return jsonify({"status": "Success", "message": "Xoá loại thành công!!!"})
        return jsonify({"status": "Fail", "message": "Lỗi ràng buộc khoá ngoại, không thể xoá loại!!!"})


    # API Xoá danh mục:
@app.route("/api/v1/del-category/<int:category_id>", methods=["GET"])
def delete_category(category_id):
    # category_id = request.json["categoryId"]
    if db_pyMySQL.check_category_id(category_id) == -1:
        return jsonify({"status": "Fail", "message": "Không tìm thấy danh mục trong Database!!!"})
    else:
        return jsonify({"status": "Success", "message": "Chức năng đang bảo trì."})


# API Xoá sản phẩm:
@app.route("/api/v1/del-product/<int:pro_id>", methods=["GET"])
def delete_product(pro_id):
    # product_id = request.json["productId"]
    if db_pyMySQL.check_product_id(pro_id) == -1:
        return jsonify({"status": "Fail", "message": "Không tìm thấy sản phẩm này trong Database!!!"})
    else:
        if model_delete.delete_product(pro_id) == 1:
            return jsonify({"status": "Success", "message": "Xoá sản phẩm thành công!!!"})
        else:
            return jsonify({"status": "Fail", "message": "Lỗi ràng buộc khoá ngoại, không thể xoá sản phẩm này!!!"})


    # API USER:
# API Xoá đơn hàng:
@app.route("/api/v1/del-order/<int:order_id>", methods=["GET"])
def delete_order(order_id):
    # order_id = request.json["orderId"]
    if db_pyMySQL.check_type_id(order_id) == -1:  # Không có đơn hàng trong DB.
        return jsonify({"status": "Fail", "message": "Không tìm thấy đơn hàng này trong Database!!!"})
    else:   # Có đơn hàng trong DB.
        if model_delete.delete_order(order_id) == 1:
            return jsonify({"status": "Success", "message": "Xoá đơn hàng thành công!!!"})
        return jsonify({"status": "Fail", "message": "Đơn hàng đã được duyệt, không thể xoá đơn hàng này!!!"})


# API Thêm đơn hàng:
@app.route("/api/v1/add-order", methods=["POST"])
def insert_order():
    import pdb
    pdb.set_trace()
    user_id = request.json['sp']
    product_id = request.json['masp']
    product_name = request.json['tensp']
    price = request.json["gia"]
    amount = request.json["soluong"]
    total = 0
    model_insert.insert_order(user_id, total, product_id, product_name, price, amount)
    return jsonify({"status": "Success", "message": "Thêm đơn hàng thành công!!!"})


if __name__ == "__main__":
    app.run()
