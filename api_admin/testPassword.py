import database
from datetime import datetime


conn = database.connection

with conn.cursor() as cur:
    # Kiểm tra ràng buộc khoá ngoại:
    sql = '''
        SELECT chitietdh.mact, sanpham.code, sanpham.tensp
        FROM sanpham JOIN chitietdh
        ON sanpham.masp = chitietdh.masp
        WHERE sanpham.masp = %s
    '''
    cur.execute(sql, 35)
    order = cur.fetchall()
    print("fetchall" , order)
    if not order:  # Ko có chi tiết đơn hàng nào chứa sản phẩm => Có thể xoá.
        sql1 = '''
            DELETE  FROM sanpham
            WHERE masp = %s
        '''
        cur.execute(sql1, (35,))
        conn.commit()
        print(1)  # Xoá sản phẩm thành công.
    else:  # Có chi tiết đơn hàng chứa sản phẩm => Ko thể xoá.
        print()  # Xoá sản phẩm ko thành công.
