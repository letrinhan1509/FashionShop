import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
const ListUserAdmin = (props) => {
    let { sortedInfo, filteredInfo } = useState([]);
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
          title: 'Mã nhân viên',
          dataIndex: 'manv',
          key: 'manv',
        },
        {
          title: 'Gmail',
          dataIndex: 'admin',
          key: 'admin',
        },
        {
          title: 'Tên nhân viên',
          dataIndex: 'tennv',
          key: 'tennv',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sdt',
            key: 'sdt',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi',
        }
        /* {
            title: 'Mã loại',
            dataIndex: 'maloai',
            key: 'maloai',
            filters: [
                { text: 'Áo sơ mi', value: 'asm' },
                { text: 'Áo thun', value: 'at' },
                { text: 'Áo khoác', value: 'ak' },
                { text: 'Balo', value: 'bl' },
                { text: 'Dép', value: 'dep' },
                { text: 'Giày', value: 'giay' },
                { text: 'Nón', value: 'no' },
              ],
            filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
        }, */
      ];
      const arry=[{'manv': 1, 'admin': 'admin@gmail.com', 'matkhau': '123456', 'tennv': 'Admin', 'diachi': '155 PNT q8', 'sodienthoai': '098564715', 'maquyen': 1}, {'manv': 3, 'admin': 'nhhy@gmail.com', 'matkhau': '123456', 'tennv': 'Yen Nhan', 'diachi': '15/2 HHH q1', 'sodienthoai': '098547136', 'maquyen': 2}, {'manv': 4, 'admin': 'mhth@gmail.com', 'matkhau': '123456', 'tennv': 'Mong Ha Trung Huyen', 'diachi': '11 TTT q11', 'sodienthoai': '0906548444', 'maquyen': 2}, {'manv': 5, 'admin': 'dhnhan1999@gmail.com', 'matkhau': '123456', 'tennv': 'Quách Trọng Nhân', 'diachi': '196 TVH q9', 'sodienthoai': '098564123', 'maquyen': 3}, {'manv': 6, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123456', 'tennv': 'Ho Van Cuong', 'diachi': '152 HQL q6', 'sodienthoai': '0965753304', 'maquyen': 3}, {'manv': 17, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng', 'diachi': 'Tiền Giangc1', 'sodienthoai': '0929192185', 'maquyen': 1}, {'manv': 18, 'admin': 'nhankaca1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng 4', 'diachi': 'Tiền Giang', 'sodienthoai': '0929192185', 'maquyen': 1}, {'manv': 19, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng3', 'diachi': '186 Cao lỗ', 'sodienthoai': '0929192185', 'maquyen': 3}, {'manv': 20, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng', 'diachi': 'Tiền Giang', 'sodienthoai': '0929192185', 'maquyen': 1}, {'manv': 21, 'admin': 'nhan1003@gmail.com', 'matkhau': '123', 'tennv': 'Lê Trí Nhân', 'diachi': 'Tiền Giang', 'sodienthoai': '0123245753', 'maquyen': 1}, {'manv': 22, 'admin': 'dhnhan19999@gmail.com', 'matkhau': '123', 'tennv': 'Trương Hải Hoàng Phương', 'diachi': '233 Vĩnh Viễn', 'sodienthoai': '123245753', 'maquyen': 1}]
      console.log(arry);



    return (
        <>
        <Table dataSource={arry} columns={columns} />
        
      {/*   <a className="ant-btn ant-btn-primary" href='/Themnhanvien'  type="primary">Thêm nhân viên</a> */}
        <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link>

        </>
    );
}

export default ListUserAdmin;
