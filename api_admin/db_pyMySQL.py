import database

connection = database.connection


# Danh sách tất cả tài khoản "user":
def get_all_user():
    with connection.cursor() as cur:
        sql = "SELECT `tenkh`, `makh`, `email`, `sodienthoai`, `diachi` FROM `khachhang`"
        cur.execute(sql)
        users = cur.fetchall()
        return users


# Tài khoản "user" theo tên:
def get_name_user(user_name):
    with connection.cursor() as cur:
        sql = '''
        SELECT `tenkh`, `email`, `sodienthoai`, `diachi` 
        FROM `khachhang`
        WHERE `tenkh` = %s
        '''
        cur.execute(sql, (user_name,))
        user = cur.fetchmany()
        return user


def get_all_admin():
    with connection.cursor() as cur:
        sql = '''
        SELECT A.admin, A.tennv, A.diachi, A.trangthai, A.sodienthoai, Q.Ten 
        FROM `admin` A JOIN `quyen` Q 
        ON A.maquyen = Q.maquyen
        '''
        cur.execute(sql)
        ad = cur.fetchall()
        return ad


# Tài khoản "Admin" theo số điện thoại:
def get_phone_admin(admin_phone):
    with connection.cursor() as cur:
        sql = '''
        SELECT A.admin, A.tennv, A.diachi, A.sodienthoai, Q.Ten 
        FROM `admin` A JOIN `quyen` Q 
        ON A.maquyen = Q.maquyen
        WHERE A.sodienthoai = %s
        '''
        cur.execute(sql, (admin_phone,))
        ad = cur.fetchone()
        return ad


# Danh sách "nhà sản xuất":
def get_all_producer():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `nhasx`"
        cur.execute(sql)
        producer = cur.fetchall()
        return producer


# Tìm "nhà sản xuất" theo id:
def get_producer_id(producer_id):
    with connection.cursor() as cur:
        sql = '''
        SELECT * 
        FROM `nhasx` 
        WHERE mansx = '%s'
        '''
        cur.execute(sql, (producer_id,))
        producer = cur.fetchall()
        return producer


# Danh sách "danh mục" sản phẩm:
def get_all_category():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `danhmuc`"
        cur.execute(sql)
        category = cur.fetchall()
        return category


# Danh sách "loại" sản phẩm:
def get_all_type():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `loaisp`"
        cur.execute(sql)
        type = cur.fetchall()
        return type


# Danh sách sản phẩm:
def get_all_product():
    with connection.cursor() as cur:
        #sql = "SELECT * FROM `sanpham`"
        sql = '''
        SELECT sanpham.masp, sanpham.code, sanpham.tensp, sanpham.gia, sanpham.giamgia, sanpham.soluong, sanpham.hinh, nhasx.tennsx as TenNSX, loaisp.tenloai as TenLoai
        FROM ((sanpham
        JOIN nhasx ON sanpham.mansx = nhasx.mansx)
        JOIN loaisp ON sanpham.maloai = loaisp.maloai)
        '''
        cur.execute(sql)
        products = cur.fetchall()
        return products


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


# Danh sách "Quyền hạn - chức vụ":
def get_permission():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `quyen`"
        cur.execute(sql)
        permission = cur.fetchall()
        return permission


# Danh sách "Trạng thái":
def get_status():
    with connection.cursor() as cur:
        sql = "SELECT * FROM `trangthai`"
        cur.execute(sql)
        status = cur.fetchall()
        return status
# Danh sách hình ảnh:


def get_img():
    with connection.cursor() as cur:
        sql = "SELECT hinh FROM `sanpham`"
        cur.execute(sql)
        status = cur.fetchall()
        return status