import React, { useState, useEffect } from 'react';
import { Table,Image } from 'antd';
import { storage } from "./firebase/firebase";
const ListUserKH = (props) => {
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
      const [link, setLink] = useState([]);
      useEffect(() => {
        const fetchImages = async () => {
          let i = 0;
          let storageRef = storage.ref();
          let starsRef = await storageRef.child('img_product/').listAll();
          let urlPromises = starsRef.items.map(imageRef => imageRef.getDownloadURL());
          /* starsRef.listAll().then(function (result) {
            result.items.forEach(function (imageRef) {
              i++;
              displayImage(i, imageRef)
            })
          })
          let result = await storageRef.child('images').listAll();
          let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL()); */
    
          return Promise.all(urlPromises);
    
        }
        /* function displayImage(row, images) {
          images.getDownloadURL().then(function (url) {
    
          })
        } */
        const loadImages = async () => {
          const urls = await fetchImages();
          setLink(urls);
        }
        loadImages();
      }, []);



    return (
        <>
        <Table dataSource={props.ListUser} columns={columns} />
        {link.map((item) => {
        console.log(item)
        return (
          <Image
            width={200}
            src={item}
          />
        )

      })}
        {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}

        </>
    );
}

export default ListUserKH;
