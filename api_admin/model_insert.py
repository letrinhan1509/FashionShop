import database
import db_pyMySQL

conn = database.connection

# Thêm tài khoản "user": User sẽ không mã hoá mkhau do xài 2 ngôn ngữ khác nhau,
# nên khi mã hoá xong NodeJS sẽ ko hỗ trợ để giải mã => sẽ không đăng nhập được.


    # INSERT:
# Thêm tài khoản khách hàng:
def insert_user(name, email, password, phone, address):
    with conn.cursor() as cur:
        mk = password + database.mysecret_key
        # pas = mk.encode()
        sql = '''
        INSERT INTO khachhang(tenkh, email, matkhau, sodienthoai, diachi)
        VALUES (%s, %s, %s, %s, %s)
        '''
        cur.execute(sql, (name, email, mk, phone, address))
        conn.commit()


# Thêm tài khoản "admin":
def insert_admin(admin, matkhau, ten, diachi, sdt, maquyen):
    with conn.cursor() as cur:
        mk = matkhau + database.mysecret_key
        # pas = database.cipher.encrypt(matkhau)   # Mã hoá mật khẩu
        sql = '''
        INSERT INTO admin(admin, matkhau, tennv, diachi, sodienthoai, maquyen)
        VALUES (%s, %s, %s, %s, %s, %s)
        '''
        cur.execute(sql, (admin, mk, ten, diachi, sdt, maquyen))
        conn.commit()


# Thêm "danh mục" sản phẩm:
def insert_category(ma, ten):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO danhmuc(madm, tendm)
        VALUES (%s, %s)
        '''
        cur.execute(sql, (ma, ten))
        conn.commit()


# Thêm "nhà sản xuất":
def insert_producer(ma, ten, xuatxu):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO nhasx(mansx, tennsx, xuatxu)
        VALUES (%s, %s, %s)
        '''
        cur.execute(sql, (ma, ten, xuatxu))
        conn.commit()


# Thêm "loại" sản phẩm:
def insert_type(type_id, name):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO loaisp(maloai, tenloai)
        VALUES (%s, %s)
        '''
        cur.execute(sql, (type_id, name))
        conn.commit()


# Thêm "sản phẩm":
def insert_product(code, name, price, reduced_price, amount, img, producer_id, type_id):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO sanpham(code, tensp, gia, giamgia, soluong, hinh, mansx, maloai)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        '''
        cur.execute(sql, (code, name, price, reduced_price, amount, img, producer_id, type_id))
        conn.commit()


# Thêm mới "Quyền hạn - chức vụ":
def insert_permission(code, name):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO quyen(maquyen, Ten)
        VALUES (%s, %s)
        '''
        cur.execute(sql, (code, name))
        conn.commit()


# Thêm mới "trạng thái":
def insert_status(ten, trangthai):
    with conn.cursor() as cursor:
        sql = '''
        INSERT INTO trangthai(tentt, trangthai)
        VALUES (%s, %s)
        '''
        cursor.execute(sql, (ten, trangthai))
        conn.commit()


    # UPDATE:
# Sửa profile tài khoản admin:
def update_profile_admin(email, name, address, phone, admin_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE admin 
        SET admin = %s, tennv = %s, diachi = %s, sodienthoai = %s 
        WHERE manv = %s
        '''
        cur.execute(sql, (email, name, address, phone, admin_id))
        conn.commit()
        return 1


# Cập nhật mật khẩu của admin:
def update_password_admin(pas, admin_id):
    with conn.cursor() as cur:
        password = pas + database.mysecret_key
        sql = '''
        UPDATE admin 
        SET matkhau = %s
        WHERE manv = %s
        '''
        cur.execute(sql, (password, admin_id,))
        conn.commit()
        return 1


# Sửa profile tài khoản khách hàng:
def update_profile_user(name, email, phone, address, user_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE khachhang 
        SET tenkh = %s, email = %s, sodienthoai = %s, diachi = %s 
        WHERE makh = %s
        '''
        cur.execute(sql, (name, email, phone, address, user_id))
        conn.commit()
        return 1


# Cập nhật mật khẩu của khách hàng:
def update_password_user(pas, user_id):
    with conn.cursor() as cur:
        password = pas + database.mysecret_key
        sql = '''
        UPDATE khachhang 
        SET matkhau = %s
        WHERE makh = %s
        '''
        cur.execute(sql, (password, user_id,))
        conn.commit()
        return 1


# Sửa danh mục:
def update_category(name, category_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE danhmuc 
        SET tendm = %s
        WHERE madm = %s
        '''
        cur.execute(sql, (name, category_id,))
        conn.commit()
        return 1


# Sửa loại:
def update_type(name, type_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE loaisp 
        SET tenloai = %s
        WHERE maloai = %s
        '''
        cur.execute(sql, (name, type_id,))
        conn.commit()
        return 1


# Sửa nhà sản xuất:
def update_producer(name, origin, producer_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE nhasx 
        SET tennsx = %s, xuatxu = %s
        WHERE mansx = %s
        '''
        cur.execute(sql, (name, origin, producer_id,))
        conn.commit()
        return 1


# Sửa quyền hạn - chức vụ:
def update_permission(name, permission_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE quyen 
        SET Ten = %s
        WHERE maquyen = %s
        '''
        cur.execute(sql, (name, permission_id,))
        conn.commit()
        return 1


# Sửa trạng thái:
def update_status(name, status_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE trangthai 
        SET tentt = %s
        WHERE trangthai = %s
        '''
        cur.execute(sql, (name, status_id,))
        conn.commit()
        return 1


# Sửa sản phẩm:
def update_product(code, name, price, reduced_price, amount, img, producer_id, type_id, product_id):
    with conn.cursor() as cur:
        sql = '''
        UPDATE sanpham 
        SET code = %s, tensp = %s, gia = %s, giamgia = %s, soluong = %s, hinh = %s, mansx = %s, maloai = %s
        WHERE masp = %s
        '''
        cur.execute(sql, (code, name, price, reduced_price, amount, img, producer_id, type_id, product_id))
        conn.commit()
        return 1


    # Chức năng của khách hàng.
# Thêm đơn hàng:
def insert_order(order_id, product_id, user_id, amount, price, order_date, delivery_date, stt, detail_id, pro_price,
                 pro_amount):
    with conn.cursor() as cur:
        conn.close()


# Sửa đơn hàng: Chỉ sửa được đơn hàng khi trạng thái đơn hàng là 'Đang chờ xử lý', còn lại thì khách hàng ko được sửa.
def update_order(amount, order_id):
    with conn.cursor() as cur:
        sql = "SELECT * FROM donhang WHERE madonhang = %s"
        cur.execute(sql, (order_id,))
        order = cur.fetchone()
        product_id = order['masp']
        # Tìm giá của sản phẩm:
        sql1 = "SELECT gia FROM sanpham WHERE masp = %s"
        cur.execute(sql1, (product_id,))
        gia = cur.fetchone()
        price = amount * gia
        if order['trangthai'] == 0:  # Kiểm tra trạng thái đơn hàng.
            sql = '''
                UPDATE donhang 
                SET soluong = %s, gia = %s
                WHERE madonhang = %s
            '''
            cur.execute(sql, (amount, price, order_id,))
            conn.commit()
            return 1
        else:   # Đơn hàng đã được duyệt ko thể sửa.
            return -1
