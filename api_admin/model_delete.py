from itertools import product

import database

conn = database.connection

# fail = "Xoá không thành công !!!"
# trạng thái: 0 -> "khoá", 1 -> "Ko khoá"


# Khoá mõm admin:
def lock_admin(admin_id,):
    with conn.cursor() as cur:
        sql = '''
            UPDATE admin 
            SET trangthai = 0
            WHERE manv = %s
        '''
        cur.execute(sql, (admin_id,))
        conn.commit()


# Mở khoá mõm admin:
def unlock_admin(admin_id):
    with conn.cursor() as cur:
        sql = '''
            UPDATE admin 
            SET trangthai = 1
            WHERE manv = %s
        '''
        cur.execute(sql, (admin_id,))
        conn.commit()


def delete_order(order_id):
    with conn.cursor() as cur:
        dh = "SELECT * FROM donhang WHERE madonhang = %s"
        cur.execute(dh, (order_id,))
        order = cur.fetchone()

        sql = '''
        DELETE  FROM donhang
        WHERE madonhang = %s
        '''
        cur.execute(sql, (order_id,))
        conn.commit()


# Khoá mõm khách hàng:
def lock_user(user_id):
    with conn.cursor() as cur:
        sql = '''
            UPDATE khachhang 
            SET trangthai = 0
            WHERE makh = %s
        '''
        cur.execute(sql, (user_id,))
        conn.commit()


# Mở khoá mõm khách hàng:
def unlock_user(user_id):
    with conn.cursor() as cur:
        sql = '''
            UPDATE khachhang 
            SET trangthai = 1
            WHERE makh = %s
        '''
        cur.execute(sql, (user_id,))
        conn.commit()


def delete_product(product_id):
    with conn.cursor() as cur:
        sql = '''
        DELETE  FROM sanpham
        WHERE masp = %s
        '''
        cur.execute(sql, (product_id,))
        conn.commit()


def delete_producer(producer_code):
    with conn.cursor() as cur:
        pro = '''
        SELECT sanpham.code, sanpham.tensp, nhasx.tennsx
        FROM sanpham JOIN nhasx
        ON sanpham.mansx = nhasx.mansx
        WHERE nhasx.mansx = %s
        '''
        cur.execute(pro, (producer_code))
        producer = cur.fetchall()
        if not producer:
            sql = '''
            DELETE  FROM nhasx
            WHERE mansx = %s
            '''
            cur.execute(sql, (producer_code,))
            conn.commit()
            return 1
        else:
            return len(producer)


def delete_type(type_code):
    with conn.cursor() as cur:
        typ = '''
        SELECT sanpham.code, sanpham.tensp, loaisp.tenloai
        FROM sanpham JOIN loaisp
        ON sanpham.maloai = loaisp.maloai
        WHERE loaisp.maloai = %s
        '''
        cur.execute(typ, (type_code))
        types = cur.fetchall()
        if not types:
            sql = '''
                DELETE  FROM loaisp
                WHERE maloai = %s
            '''
            cur.execute(sql, (type_code,))
            conn.commit()
            return 1
        else:
            return len(types)


def delete_status(stt_id):
    with conn.cursor() as cur:
        stt = '''
        SELECT `donhang`.`madonhang`, `donhang`.`masp`, `donhang`.`makh`, TT.`trangthai`
        FROM `donhang` JOIN `trangthai` TT
        ON `donhang`.`trangthai` = TT.`trangthai`
        WHERE TT.`trangthai` = %s
        '''
        cur.execute(stt, (stt_id,))
        stt_dh = cur.fetchall()
        a = len(stt_dh)
        if not stt_dh:  # Không có ràng buộc khoá ngoại
            sql = '''
            DELETE  FROM trangthai
            WHERE trangthai = %s
            '''
            cur.execute(sql, (stt_id,))
            conn.commit()
            return 1
        else:   # Có khoá ngoại nên không xoá được
            return a



def delete_permission(permission_id):
    with conn.cursor() as cur:
        ad = '''
        SELECT A.admin ,A.tennv, A.maquyen as quyen
        FROM admin A JOIN quyen
        ON A.maquyen = quyen.maquyen
        WHERE A.maquyen = %s
        '''
        cur.execute(ad, (permission_id,))
        admin = cur.fetchone()
        if not admin:
            sql = '''
                    DELETE  FROM quyen
                    WHERE maquyen = %s
                    '''
            cur.execute(sql, (permission_id,))
            conn.commit()
            return 1
        else:
            return -1
