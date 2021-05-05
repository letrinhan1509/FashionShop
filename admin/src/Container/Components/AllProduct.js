import React, { useState, useEffect } from 'react';
import { Button, Table,Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useHistory } from 'react-router';
const AllProduct = () => {
  let link = useHistory()
  const [idPro, setIdPro]=useState([]);
  const [a, setA] = useState([]);


  const loadEdit= (e)=>{
    let i =e.currentTarget.dataset.id;
    console.log(i);
    setA(i);
    setTimeout(()=>{
      link.push('/Editsanpham');
     },100) 
   
  }
  const onClick=(e)=>{
    let id = e.currentTarget.dataset.id
    setIdPro(id)
    console.log('Content: ', e.currentTarget.dataset.id);
    console.log(idPro);
    setIsModalVisible(true);
  }
 
  const masp = window.localStorage.getItem("masp");
  const [product, setProduct] = useState([]);
  let url = "http://127.0.0.1:5000/api/v1/product-id/" +a
  useEffect(() => {
      axios.get(url).then((res) => {
          if(res.data.status ==="Success"){
              setProduct(res.data.data)
              console.log(res.data.data);
          }
         
         

      })

  }, [a])
  console.log(product.code);
  window.localStorage.setItem('Product', JSON.stringify(product));
  let result =JSON.parse(localStorage.getItem('user'))
  console.log(result.maquyen);
  ///Modal Xoá
  const [isModalVisible, setIsModalVisible] = useState(false);

 
  const handleOk = () => {
    let url = "http://127.0.0.1:5000/api/v1/del-product/"+idPro;
    console.log(url);
     axios.get(url).then((res)=>{
       if(res.data.status ==="Success"){
          message.success(res.data.message);
          window.location.reload()
       }
       if(res.data.status ==="Fail"){
        message.error(res.data.message);
       }
      
   
      })
     
    setIsModalVisible(false);
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
        
        {
          title: 'Action',
          dataIndex:"masp",
          key:"masp",
          render:text =>result.maquyen ===1 ?(<Button data-id={text} onClick={onClick}>Xoá</Button>):(<p></p>)
          
        },
        {
          title: '',
          dataIndex:"masp",
          key:"masp",
          render:text =>result.maquyen ===1 ?(<Button data-id={text} onClick={loadEdit} >Sửa</Button>):(<p></p>)
        }
      ];
      
    return (
        <>
        <Table dataSource={ListProductHome} rowKey="uid"   columns={columns} pagination={{ pageSize: 6 }}  size="middle"
       
        />
         <Modal title="Thông báo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       
        <p>Bạn có muốn xoá sản phẩm này không ?</p>
      </Modal>
        
        
        <Link to={'/Themsanpham'}><p className="ant-btn ant-btn-primary" type="primary">Thêm sản phẩm</p></Link>
        </>
    );
}

export default AllProduct;
