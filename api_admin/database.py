import pymysql.cursors
# from cryptography.fernet import Fernet  # Câu lệnh istall: pip install cryptography

connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='fashion_shop',
        cursorclass=pymysql.cursors.DictCursor  # Con trỏ trả về dưới dạng từ điển
)


mysecret_key = "@^!^@"

# cipher_key = Fernet.generate_key()
# cipher = Fernet(cipher_key)