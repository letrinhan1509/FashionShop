import database
from datetime import datetime


conn = database.connection

with conn.cursor() as cur:
    # trthai = "SELECT `donhang`.`madonhang`, `donhang`.`makh`, TT.`trangthai` FROM `donhang` JOIN `trangthai` TT ON `donhang`.`trangthai` = TT.`trangthai` WHERE TT.`trangthai` = %s "
    sql = "SELECT * FROM `chitietdh` WHERE madonhang = %s"
    today = datetime.today()
    id = 5
    total = 650000
    # sql = '''
    #           INSERT INTO donhang(makh, tong, ngaydat)
    #           VALUES (%s, %s, %s);
    # '''
    # cur.execute(sql, (id, total, today,))
    # sql = "SELECT LAST_INSERT_ID() as LastID;"
    cur.execute(sql, 46)
    stt = cur.fetchall()
    print(stt)
    #print("Last id", a['LastID'])

    # stt = []
    # print("id mới thêm vào DB", ['LastID'])
    o = 1
    for i in stt:
        print("ok",o)
        u = i['tensp']
        print("chi tiet", i)
        print("ma chi tiet", i['madonhang'])
        print(u)
        o = o + 1
    # print(stt['madonhang'])
    if not stt:  # stt = null
        print("Ko có đơn hàng chứa trạng thái. Xoá được")
    else:   # stt != null
        print(len(stt))
        # print("Ko đc xoá")

