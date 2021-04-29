import database

conn = database.connection


# Thêm tài khoản "user": User sẽ không mã hoá mkhau do xài 2 ngôn ngữ khác nhau,
# nên khi mã hoá xong NodeJS sẽ ko hỗ trợ để giải mã => sẽ không đăng nhập được.
def insert_user(name, email, password, phone, address):
    with conn.cursor() as cur:
        mk = password + database.mysecret_key
        #pas = mk.encode()
        sql = '''
        INSERT INTO khachhang(tenkh, email, matkhau, sodienthoai, diachi)
        VALUES (%s, %s, %s, %s, %s)
        '''
        cur.execute(sql, (name, email, mk, phone, address))
        conn.commit()


# Thêm tài khoản "admin": sẽ mã hoá mật khẩu bằng
def insert_admin(admin, ten, matkhau, sdt, diachi, maquyen):
    with conn.cursor() as cur:
        # mk = matkhau + database.mysecret_key
        # pas = database.cipher.encrypt(matkhau)   # Mã hoá mật khẩu
        sql = '''
        INSERT INTO admin(admin, matkhau, tennv, diachi, sodienthoai, maquyen)
        VALUES (%s, %s, %s, %s, %s, %s)
        '''
        cur.execute(sql, (admin, ten, matkhau, sdt, diachi, maquyen))
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
def insert_type(maL, tenL):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO loaisp(maloai, tenloai)
        VALUES (%s, %s)
        '''
        cur.execute(sql, (maL, tenL))
        conn.commit()


# Thêm "sản phẩm":
def insert_product(code, ten, gia, giamgia, hinh, mansx, maloai):
    with conn.cursor() as cur:
        sql = '''
        INSERT INTO sanpham(code, tensp, gia, giamgia, hinh, mansx, maloai)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        '''
        cur.execute(sql, (code, ten, gia, giamgia, hinh, mansx, maloai))
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
