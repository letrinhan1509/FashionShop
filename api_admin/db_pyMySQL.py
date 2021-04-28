import pymysql.cursors

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='',
    database='fashion_shop',
    cursorclass=pymysql.cursors.DictCursor #con trỏ trả về dưới dạng từ điển
)


def get_all_user():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `khachhang`"
        cur.execute(sql)
        user = cur.fetchall()
        return user

# Thêm tài khoản "user":
def add_user():
    with connection.cursor() as cur:
        sql = '''
        INSERT INTO khachhang(tenkh, email, matkhau, sodienthoai, diachi)
        VALUES (?, ?, ?, ?, ?)
        '''
        #cur.execute(sql, )
        connection.commit()


def get_all_admin():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `admin`"
        cur.execute(sql)
        ad = cur.fetchall()
        return ad

# Thêm tài khoản "admin":


# Danh sách "nhà sản xuất":
def get_all_producer():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `nhasx`"
        cur.execute(sql)
        producer = cur.fetchall()
        return producer

# Thêm "nhà sản xuất":


# Danh sách "danh mục" sản phẩm:
def get_all_category():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `danhmuc`"
        cur.execute(sql)
        category = cur.fetchall()
        return category

# Thêm "danh mục" sản phẩm:


# Danh sách "loại" sản phẩm:
def get_all_type():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `loaisp`"
        cur.execute(sql)
        type = cur.fetchall()
        return type

# Thêm "loại" sản phẩm:


# Danh sách sản phẩm:
def get_all_product():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `sanpham`"
        cur.execute(sql)
        products = cur.fetchall()
        return products

# Thêm "sản phẩm":


# Danh sách "đơn hàng":
def get_all_order():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `donhang`"
        cur.execute(sql)
        order = cur.fetchall()
        return order

# Danh sách "chi tiết đơn hàng":
def get_all_detailOrder():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `chitietdh`"
        cur.execute(sql)
        detail_order = cur.fetchall()
        return detail_order