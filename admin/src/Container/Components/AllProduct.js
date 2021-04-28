import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const AllProduct = (props) => {
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
            title: 'Hình',
            dataIndex: 'hinh',
            key: 'hinh',
        },
        {
            title: 'Mã nhà sản xuất',
            dataIndex: 'mansx',
            key: 'mansx',
        },
        {
            title: 'Mã loại',
            dataIndex: 'maloai',
            key: 'maloai',
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
        <Table dataSource={props.ListProductHome} columns={columns} />
        
        
        <Link to={'/Themsanpham'}><p className="ant-btn ant-btn-primary" type="primary">Thêm sản phẩm</p></Link>
        </>
    );
}

export default AllProduct;
