# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import db_pyMySQL

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/test")
def test():
    return ("OK!!!")

@app.route("/api/v1/user", methods=["GET"])
def get_user():
    dataUs = db_pyMySQL.get_all_user()
    return jsonify({"status": "success", "data": dataUs})

@app.route("/api/v1/admin", methods=["GET"])
def get_admin():
    dataAd = db_pyMySQL.get_all_admin()
    return jsonify({"status": "success", "data": dataAd})

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
def get_detailOrder():
    data = db_pyMySQL.get_all_order()
    return jsonify({"status": "success", "data": data})

@app.route("/api/v1/permission", methods=["GET"])
def get_permission():
    dataPer = db_pyMySQL.get_permission()
    return jsonify({"status": "success", "data": dataPer})

@app.route("/api/v1/status", methods=["GET"])
def get_status():
    dataStt = db_pyMySQL.get_permission()
    return jsonify({"status": "success", "data": dataStt})



# API tìm ADMIN theo số điện thoại:
@app.route("/api/v1/admin/<int:admin_phone>", methods=["GET"])
def get_phone_admin(admin_phone):
    print("===" ,admin_phone)
    data = db_pyMySQL.get_phone_admin(admin_phone)
    return jsonify({"status": "success", "data": data})

# API Thêm Admin:
@app.route("/api/v1/admin/<int:permission_id>", methods=["POST"])
#def insert_type(permission_id):
    #pass



# API Thêm loại:
@app.route("/api/v1/type/<int:type_id>", methods=["POST"])
def insert_type():
    pass


if __name__ == "__main__":
    app.run()