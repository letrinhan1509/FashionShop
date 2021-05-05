import React, { useState, useEffect } from 'react';
import { Menu, Table, Modal, Button, Form, Input, message } from 'antd';
import axios from 'axios'
import { useHistory } from 'react-router';
import Item from 'antd/lib/list/Item';

const ListTypeProduct = () => {
    const link = useHistory();
    //const [a, setA] = useState([]);
    const [code, setCode] = useState('')
    const [idPro, setIdPro] = useState([]);
    const onClick = (e) => {
        let id = e.currentTarget.dataset.id
        setIdPro(id)
        console.log('Content: ', e.currentTarget.dataset.id);
        console.log(idPro);
        setIsModalVisible(true);
    }
    const getName = (e) => {
        let id = e.currentTarget.dataset.id
        setCode(id);
        setTimeout(()=>{
            link.push('/EditType');
           },1000) 
       
    }
    let url="http://127.0.0.1:5000/api/v1/type-id/"+code
    useEffect(() => {
        axios.get(url).then((res) => {
            console.log(res.data.data);
            window.localStorage.setItem("type1",JSON.stringify(res.data.data) )
        });
    }, [code]);
    const showModal =()=>{
        setIsModalVisible(true);
    }
    let result =JSON.parse(localStorage.getItem('user'))
    
    const [ListType, setListType] = useState([]);
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/type").then((res) => {
            setListType(res.data.data);
        });
    }, []);
    const columns = [
        {
            title: 'Mã loại',
            dataIndex: 'maloai',
            key: 'maloai',
        },
        {
            title: 'Tên loại',
            dataIndex: 'tenloai',
            key: 'tenloai',
        },
        {
            title: 'Action',
            dataIndex: 'maloai',
            key: 'maloai',
          /*   render: text =>result.maquyen===1 ?(<Menu onClick={linkto}><Menu.Item key={text} >Sửa</Menu.Item></Menu>):(<p/>)  */
            render: text =>result.maquyen ===1 ?(<Button data-id={text} onClick={onClick}>Xoá</Button>):(<p/>) 
        },
        {
            title: '',
            dataIndex: 'maloai',
            key: 'maloai',
           /*  render: text =>result.maquyen===1?(<Menu onClick={getName}><Menu.Item onClick={showModal} key={text} >Xoá </Menu.Item> </Menu>):(<p/>)  */
            render: text =>result.maquyen ===1 ?(<Button data-id={text} onClick={getName}>Sửa</Button>):(<p/>) 
        }

    ];

    //Model
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        let url = "http://127.0.0.1:5000/api/v1/del-type/"+idPro;
        console.log(url);
        axios.get(url).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                window.location.reload()
            }
            if (res.data.status === "Fail") {
                message.error(res.data.message);
            }
        })
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Table dataSource={ListType} columns={columns} pagination={{ pageSize: 6 }} size="middle" />
            <Modal title="Thông báo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn xoá loại sản phẩm này không  ?</p>
            </Modal>
        </>
    );
}

export default ListTypeProduct;
