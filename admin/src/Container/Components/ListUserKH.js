import React, { useState, useEffect } from 'react';
import { Table,Image } from 'antd';
import axios from 'axios'
const ListUserKH = (props) => {
  const [ListUser, setListUser] = useState([]);
  useEffect (()=>{
    axios.get("http://127.0.0.1:5000/api/v1/user").then((res)=>{
      setListUser(res.data.data);
    })
  }, []);
    let { sortedInfo, filteredInfo } = useState([]);
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
          title: 'Mã khách hàng',
          dataIndex: 'makh',
          key: 'makh',
        },
        {
          title: 'Tên khách hàng',
          dataIndex: 'tenkh',
          key: 'tenkh',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sodienthoai',
            key: 'sodienthoai',
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


    return (
        <>
        <Table dataSource={ListUser} columns={columns} pagination={{ pageSize: 6 }}  size="middle" />
       
        {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}

        </>
    );
}

export default ListUserKH;
