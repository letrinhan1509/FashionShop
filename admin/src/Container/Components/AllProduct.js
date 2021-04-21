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
