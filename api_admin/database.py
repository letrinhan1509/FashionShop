import pymysql.cursors
# from cryptography.fernet import Fernet  # Câu lệnh istall: pip install cryptography
from flask import jsonify

try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='fashion_shop',
        cursorclass=pymysql.cursors.DictCursor  # Con trỏ trả về dưới dạng từ điển
    )
except Exception as ex:
    jsonify({"message": "Can't connect to MySQL server on 'localhost'!!!", "error": ex})

# Chuỗi cộng thêm vào password:
mysecret_key = "@^!^@"

# cipher_key = Fernet.generate_key()
# cipher = Fernet(cipher_key)
