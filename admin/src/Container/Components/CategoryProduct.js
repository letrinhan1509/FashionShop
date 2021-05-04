import React, { useState, useEffect } from 'react';
import {  Table } from 'antd';

import axios from 'axios'
const CategoryProduct = () => {
    const [Category, setCategory] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/category").then((res) => {
        setCategory(res.data.data);
    });
  }, []);

    const columns = [
        {
          title: 'Mã danh mục',
          dataIndex: 'madm',
          key: 'madm',
        },
        {
          title: 'Tên danh mục',
          dataIndex: 'tendm',
          key: 'tendm',
        },
       
      ];
      
    return (
        <>
        <Table dataSource={Category} columns={columns} pagination={{ pageSize: 6 }}  size="middle" />
        
        </>
    );
}

export default CategoryProduct;
