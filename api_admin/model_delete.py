from itertools import product

import database
import db_pyMySQL

conn = database.connection

# fail = "Xoá không thành công !!!"
# trạng thái: 0 -> "khoá", 1 -> "Ko khoá"


# Khoá mõm admin:
def lock_admin(admin_id,):
    with conn.cursor() as cur:
        if db_pyMySQL.check_admin_id(admin_id) == 1:    # Tìm thấy admin_id trong DB
            sql = '''
                UPDATE admin 
                SET trangthai = 0
                WHERE manv = %s
            '''
            cur.execute(sql, (admin_id,))
            conn.commit()
            return 1
        return -1


# Mở khoá mõm admin:
def unlock_admin(admin_id):
    with conn.cursor() as cur:
        if db_pyMySQL.check_admin_id(admin_id) == 1:
            sql = '''
                UPDATE admin 
                SET trangthai = 1
                WHERE manv = %s
            '''
            cur.execute(sql, (admin_id,))
            conn.commit()
            return 1
        return -1


# Khoá mõm khách hàng:
def lock_user(user_id):
    with conn.cursor() as cur:
        sql_check = "SELECT * FROM khachhang WHERE makh = %s"
        cur.execute(sql_check, (user_id,))
        user = cur.fetchone()
        if not user:    # ko có user nào trong DB "user = null"
            return -1
        else:   # có user trong DB => có thể khoá.
            sql = '''
                UPDATE khachhang 
                SET trangthai = 0
                WHERE makh = %s
            '''
            cur.execute(sql, (user_id,))
            conn.commit()
            return 1    # Khoá tài khoản user thành công.


# Mở khoá mõm khách hàng:
def unlock_user(user_id):
    with conn.cursor() as cur:
        if db_pyMySQL.check_user_id(user_id) == 1:  # Có user trong DB => Có thể mở khoá.
            sql = '''
                UPDATE khachhang 
                SET trangthai = 1
                WHERE makh = %s
            '''
            cur.execute(sql, (user_id,))
            conn.commit()
            return 1    # Khoá tài khoản user thành công.
        else:
            return -1   # Khoá tài khoản user ko thành công.


# Xoá sản phẩm:
def delete_product(product_id):
    with conn.cursor() as cur:
        # Kiểm tra ràng buộc khoá ngoại:
        sql = '''
            SELECT chitietdh.mact, sanpham.code, sanpham.tensp
            FROM sanpham JOIN chitietdh
            ON sanpham.masp = chitietdh.masp
            WHERE sanpham.masp = %s
        '''
        cur.execute(sql, (product_id,))
        order = cur.fetchall()
        if not order:   # Ko có chi tiết đơn hàng nào chứa sản phẩm => Có thể xoá.
            sql1 = '''
                DELETE  FROM sanpham
                WHERE masp = %s
            '''
            cur.execute(sql1, (product_id,))
            conn.commit()
            return 1    # Xoá sản phẩm thành công.
        else:   # Có chi tiết đơn hàng chứa sản phẩm => Ko thể xoá.
            return -1   # Xoá sản phẩm ko thành công.


# Xoá nhà sản xuất:
def delete_producer(producer_code):
    with conn.cursor() as cur:
        pro = '''
        SELECT sanpham.code, sanpham.tensp, nhasx.tennsx
        FROM sanpham JOIN nhasx
        ON sanpham.mansx = nhasx.mansx
        WHERE nhasx.mansx = %s
        '''
        cur.execute(pro, (producer_code,))
        producer = cur.fetchall()
        if not producer:    # Không bị ràng buộc khoá ngoại => Có thể xoá.
            sql = '''
            DELETE  FROM nhasx
            WHERE mansx = %s
            '''
            cur.execute(sql, (producer_code,))
            conn.commit()
            return 1
        else:   # Bị ràng buộc khoá ngoại => Ko thể xoá.
            return -1


# Xoá loại:
def delete_type(type_id):
    with conn.cursor() as cur:
        typ = '''
        SELECT sanpham.code, sanpham.tensp, loaisp.tenloai
        FROM sanpham JOIN loaisp
        ON sanpham.maloai = loaisp.maloai
        WHERE loaisp.maloai = %s
        '''
        cur.execute(typ, (type_id,))
        types = cur.fetchall()
        if not types:   # Ko bị ràng buộc khoá ngoại => Có thể xoá.
            sql = '''
                DELETE  FROM loaisp
                WHERE maloai = %s
            '''
            cur.execute(sql, (type_id,))
            conn.commit()
            return 1
        else:   # Có ràng buộc khoá ngoại => Ko thể xoá.
            return -1


# Xoá trạng thái:
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
        if not stt_dh:  # Không có ràng buộc khoá ngoại.
            sql = '''
            DELETE  FROM trangthai
            WHERE trangthai = %s
            '''
            cur.execute(sql, (stt_id,))
            conn.commit()
            return 1    # Xoá thành công.
        else:   # Có khoá ngoại nên không xoá được.
            return -1


# Xoá quyền:
def delete_permission(permission_id):
    with conn.cursor() as cur:
        ad = '''
            SELECT A.admin ,A.tennv, A.maquyen as quyen
            FROM admin A JOIN quyen
            ON A.maquyen = quyen.maquyen
            WHERE A.maquyen = %s
        '''
        cur.execute(ad, (permission_id,))
        admin = cur.fetchall()
        if not admin:  # Quyền ko có trong admin (ràng buộc khoá ngoại) => có thể xoá.
            sql = '''
                DELETE  FROM quyen
                WHERE maquyen = %s
            '''
            cur.execute(sql, (permission_id,))
            conn.commit()
            return 1  # Xoá thành công.
        else:   # Quyền có trong admin => ko thể xoá.
            return -1  # Xoá ko thành công


def delete_category(category_id):
    try:
        with conn.cursor() as cur:
            sql = '''
            DELETE  FROM danhmuc
            WHERE madm = %s
            '''
            cur.execute(sql, (category_id,))
            conn.commit()
    finally:    # ngắt kết nối.
        conn.close()


    # Chức năng của khách hàng:
# Xoá đơn hàng:
def delete_order(order_id):
    with conn.cursor() as cur:
        sql = "SELECT * FROM donhang WHERE madonhang = %s"
        cur.execute(sql, (order_id,))
        order = cur.fetchone()
        detail_order = db_pyMySQL.get_all_detailOrder(order['madonhang'])  # Mảng các chi tiết đơn hàng.
        if order['trangthai'] == 0:  # Đơn hàng có thể xoá được.
            for i in detail_order:  # Duyệt qua từng phần tử trong mảng(danh sách chi tiết).
                detail_id = i['mact']   # Lấy id của từng chi tiết.
                sql_detail = '''
                    DELETE  FROM chitietdh
                    WHERE mact = %s
                '''
                cur.execute(sql_detail, (detail_id,))   # thực thi xoá chi tiết đơn hàng.
                conn.commit()
            sql1 = '''
                DELETE  FROM donhang
                WHERE madonhang = %s
            '''
            cur.execute(sql1, (order_id,))  # thực thi xoá đơn hàng.
            conn.commit()
            return 1
        else:   # Không thể xoá đơn hàng do đơn hàng đã được duyệt.
            return -1

