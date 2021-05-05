import database

connection = database.connection


    # GET:
# Danh sách tất cả tài khoản "user":
def get_all_user():
    with connection.cursor() as cur:
        sql = "SELECT `tenkh`, `makh`, `email`, `sodienthoai`, `diachi` FROM `khachhang`"
        cur.execute(sql)
        users = cur.fetchall()
        return users


def get_all_admin():
    with connection.cursor() as cur:
        sql = '''
        SELECT A.manv, A.admin, A.tennv, A.diachi, A.trangthai, A.sodienthoai, Q.Ten 
        FROM `admin` A JOIN `quyen` Q 
        ON A.maquyen = Q.maquyen
        '''
        cur.execute(sql)
        ad = cur.fetchall()
        return ad
def get_code_admin(id):
    with connection.cursor() as cur:
        sql = '''
        SELECT A.manv, A.admin, A.tennv, A.diachi, A.matkhau, A.trangthai, A.sodienthoai, Q.Ten, Q.maquyen 
        FROM `admin` A JOIN `quyen` Q 
        ON A.maquyen = Q.maquyen
        WHERE A.manv = %s
        '''
        cur.execute(sql, (id,))
        ad = cur.fetchone()
        return ad


def get_producer_id(producerid):
    with connection.cursor() as cur:
        sql = "SELECT * FROM nhasx WHERE mansx = %s"
        cur.execute(sql, (producerid,))
        ad = cur.fetchone()
        return ad


def get_code_type(typeid):
    with connection.cursor() as cur:
        sql ="SELECT * FROM loaisp WHERE maloai = %s"
        cur.execute(sql, (typeid,))
        ad = cur.fetchone()
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
        types = cur.fetchall()
        return types


# Danh sách sản phẩm:
def get_all_product():
    with connection.cursor() as cur:
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


# Danh sách "chi tiết đơn hàng" theo id đơn hàng:



def get_all_detailOrder(order_id):
    with connection.cursor() as cur:
        sql = "SELECT * FROM `chitietdh` WHERE madonhang = %s"
        cur.execute(sql, (order_id,))
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


#
def get_product_name(name):
    with connection.cursor() as cur:
        sql = '''
        SELECT * 
        FROM sanpham
        WHERE tensp LIKE %s
        '''
        cur.execute(sql, (name,))
        ad = cur.fetchall()
        return ad


    # CHECK IN DATABASE: Nếu có thì trả về.
# Check "user" bằng id:
def check_user_id(user_id):
    with connection.cursor() as cur:
        sql = '''
        SELECT `tenkh`, `email`, `sodienthoai`, `diachi` 
        FROM `khachhang`
        WHERE `makh` = %s
        '''
        cur.execute(sql, (user_id,))
        user = cur.fetchone()
        if not user:    # Không tìm thấy user theo id trong DB.
            return -1
        return 1    # Tìm thấy user.


# Check admin bằng id:
def check_admin_id(admin_id):
    with connection.cursor() as cur:
        sql = '''
        SELECT `admin`, `tennv`, `admin`, `sodienthoai`, `diachi`, `maquyen`
        FROM `admin`
        WHERE `manv` = %s
        '''
        cur.execute(sql, (admin_id,))
        admin = cur.fetchone()
        if not admin:    # Không tìm thấy admin theo id trong DB
            return -1
        return 1    # Tìm thấy admin theo id trong DB


# Check "nhà sản xuất" theo id:
def check_producer_id(producer_id):
    with connection.cursor() as cur:
        sql = '''
        SELECT * 
        FROM `nhasx` 
        WHERE mansx = %s
        '''
        cur.execute(sql, (producer_id,))
        producer = cur.fetchone()
        if not producer:    # Ko có nhà sản xuất trong DB.
            return -1
        return producer


# Check quyền theo id trong DB:
def check_permission_id(permission_id):
    with connection.cursor() as cur:
        sql = '''
        SELECT * 
        FROM `quyen` 
        WHERE maquyen = %s
        '''
        cur.execute(sql, (permission_id,))
        permission = cur.fetchone()
        if not permission:
            return -1   # Ko tìm thấy trong DB.
        return permission    # Tìm thấy trong DB.


# Check trạng thái theo id:
def check_status_id(stt_id):
    with connection.cursor() as cur:
        sql = "SELECT * FROM trangthai WHERE trangthai = %s"
        cur.execute(sql, (stt_id,))
        stt = cur.fetchone()
        if not stt:  # Ko có trạng thái trong DB.
            return -1
        return stt    # Có trạng thái trong DB.


# Check loại theo id:
def check_type_id(type_id):
    with connection.cursor() as cur:
        sql = "SELECT * FROM loaisp WHERE maloai = %s"
        cur.execute(sql, (type_id,))
        types = cur.fetchone()
        if not types:  # Ko có loại trong DB.
            return -1
        return types    # Có loại trong DB.


# Check danh mục theo id:
def check_category_id(category_id):
    with connection.cursor() as cur:
        sql = "SELECT * FROM danhmuc WHERE madm = %s"
        cur.execute(sql, (category_id,))
        category = cur.fetchone()
        if not category:  # Ko có danh mục trong DB.
            return -1
        return category    # Có danh mục trong DB.


# Check sản phẩm theo id:
def check_product_id(product_id):
    with connection.cursor() as cur:
        sql = "SELECT * FROM sanpham WHERE masp = %s"
        cur.execute(sql, (product_id,))
        product = cur.fetchone()
        print(product)
        if product == {}:  # Ko có sản phẩm trong DB.
            return -1
        return product   # Có sản phẩm trong DB.


# Check đơn hàng bằng mã đơn hàng:
def check_order_id(order_id):
    with connection.cursor() as cur:
        sql = "SELECT * FROM donhang WHERE madonhang = %s"
        cur.execute(sql, (order_id,))
        order = cur.fetchone()
        if not order:  # Ko có sản phẩm trong DB.
            return -1
        return order   # Có sản phẩm trong DB.
