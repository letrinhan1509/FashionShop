import database


conn = database.connection

with conn.cursor() as cur:
    # trthai = "SELECT `donhang`.`madonhang`, `donhang`.`makh`, TT.`trangthai` FROM `donhang` JOIN `trangthai` TT ON `donhang`.`trangthai` = TT.`trangthai` WHERE TT.`trangthai` = %s "
    sql = "SELECT * FROM `donhang` WHERE madonhang = %s"

    cur.execute(sql, 46)
    stt = cur.fetchall()
    print(stt)
    for i in stt:
        print("chi tiet", i)
        print("ma chi tiet", i['madonhang'])
    # print(stt['madonhang'])
    if not stt:  # stt = null
        print("Ko có đơn hàng chứa trạng thái. Xoá được")
    else:   # stt != null
        print(len(stt))
        # print("Ko đc xoá")

