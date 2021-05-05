import React, { useState, useEffect } from 'react';
import { Menu, Table } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const ListUserAdmin = () => {

  const link = useHistory();
  const [a, setA] = useState([]);
  const linkto = (e) => {
     setA(e.key);
    
      setTimeout(()=>{
      link.push('/EditNV');
     },100) 
  }
  let url = "http://127.0.0.1:5000/api/v1/admin-id/"+a
  const [Admin, setAdmin] = useState([]);
  useEffect(() => {
      axios.get(url).then((res) => {
          setAdmin(res.data);
      });
  }, [a]);
 
  localStorage.setItem('admin',JSON.stringify(Admin) )
  let result =JSON.parse(localStorage.getItem('user'))
  const lickIdAdmmin =()=>{
    console.log('ádada');


  }







  const [ListAdmin, setListAdmin] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/admin").then((res) => {
      setListAdmin(res.data.data);
    })
  }, []);
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
      dataIndex: 'sodienthoai',
      key: 'sodienthoai',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    {
      title: 'Action',
      dataIndex: 'manv',
      key: 'manv',
      render: text =>result.maquyen===1?(<Menu onClick={linkto}><Menu.Item key={text} >Sửa</Menu.Item></Menu>):(<p/>) 

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
       <h2 style={{ textAlign: 'center',marginTop:"50px" }}>Danh sách nhân viên</h2>
      <Table onSelect={lickIdAdmmin} dataSource={ListAdmin} columns={columns} pagination={{ pageSize: 6 }} size="middle" 
        
      
      
      
      />

      {/*   <a className="ant-btn ant-btn-primary" href='/Themnhanvien'  type="primary">Thêm nhân viên</a> */}
    
      <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link>

    </>
  );
}

export default ListUserAdmin;
