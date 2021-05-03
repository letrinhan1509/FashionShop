import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";
const AllProduct = (props) => {
  const [ListProductHome, setListProductHome] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/product").then((res) => {
      setListProductHome(res.data.data);
    });
  }, []);

    let { sortedInfo, filteredInfo } = useState([]);
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
          title: 'Mã sản phẩm',
          dataIndex: 'masp',
          key: 'masp',
        },
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'tensp',
          key: 'tensp',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Khuyến mãi',
            dataIndex: 'giamgia',
            key: 'giamgia',
        },
        {
            title: 'Số lương',
            dataIndex: 'soluong',
            key: 'soluong',
        },
        {
          title: 'Hình',
          dataIndex: 'hinh',
          key: 'hinh',
      },
        {
            title: 'Tên nhà sản xuất',
            dataIndex: 'TenNSX',
            key: 'TenNSX',
        },
        {
            title: 'Tên loại',
            dataIndex: 'TenLoai',
            key: 'TenLoai',
            filters: [
                { text: 'asm', value: 'asm' },
                { text: 'at', value: 'at' },
                { text: 'ak', value: 'ak' },
                { text: 'Balo', value: 'bl' },
                { text: 'Dép', value: 'dep' },
                { text: 'Giày', value: 'giay' },
                { text: 'Nón', value: 'no' },
              ],
            filteredValue: filteredInfo.maloai || null,
        onFilter: (value, record) => record.maloai.includes(value),
        //onFilter: (value, record) => record.maloai.indexOf(value) === 0,
       /*  sorter: (a, b) => a.maloai.length - b.maloai.length,
        sortOrder: sortedInfo.columnKey === 'maloai' && sortedInfo.order, */
        ellipsis: true,
        },
      ];
      
    return (
        <>
        <Table dataSource={ListProductHome} columns={columns} pagination={{ pageSize: 6 }}  size="middle" />
        
        
        <Link to={'/Themsanpham'}><p className="ant-btn ant-btn-primary" type="primary">Thêm sản phẩm</p></Link>
        </>
    );
}

export default AllProduct;
