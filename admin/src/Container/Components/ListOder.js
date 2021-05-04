import React, { useState, useEffect } from 'react';
import {  Table } from 'antd';
import axios from 'axios'

const ListOder = () => {
    const [Order, setOrder] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/order").then((res) => {
        setOrder(res.data.data);
    });
  }, []);

    const columns = [
        {
          title: 'Mã đơn hàng',
          dataIndex: 'madonhang',
          key: 'madonhang',
        },
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
            title: 'Mã sản phẩm',
            dataIndex: 'masp',
            key: 'masp',
          },
          {
            title: 'Tên sản phẩm',
            dataIndex: 'tensp',
            key: 'tensp',
          },
          {
            title: 'Số lượng ',
            dataIndex: 'soluong',
            key: 'soluong',
          },
          {
            title: 'Giá ',
            dataIndex: 'gia',
            key: 'gia',
          },
          {
            title: 'Ngày đặt',
            dataIndex: 'ngaydat',
            key: 'ngaydat',
          },
          {
            title: 'Ngày giao',
            dataIndex: 'ngaygiao',
            key: 'ngaygiao',
          },
        
        {
            title: 'Mã NV bán hàng',
            dataIndex: 'manv',
            key: 'manv',
          },
          {
            title: 'Tên NV bán hàng',
            dataIndex: 'tennv',
            key: 'manv',
          },
          {
            title: 'Mã NV giao hàng',
            dataIndex: 'manv',
            key: 'manv',
          },{
            title: 'Tên NV giao hàng',
            dataIndex: 'tennv',
            key: 'tennv',
          },
          
       
      ];
    return (
        <>
        <Table dataSource={Order} columns={columns} pagination={{ pageSize: 6 }}  size="middle" />
        
        </>
    );
}

export default ListOder;
