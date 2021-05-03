import database


conn = database.connection

with conn.cursor() as cur:
    trthai = '''
    SELECT `donhang`.`madonhang`, `donhang`.`masp`, `donhang`.`makh`, TT.`trangthai`
        FROM `donhang` JOIN `trangthai` TT
        ON `donhang`.`trangthai` = TT.`trangthai`
        WHERE TT.`trangthai` = %s
    '''
    cur.execute(trthai, 999)
    stt = cur.fetchall()
    print(stt)
    if not stt:
        print("Xoá được")
    else:
        print(len(stt))
        print("Ko đc xoá được")