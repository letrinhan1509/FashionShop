import React, { useState, useEffect } from 'react';
import { Menu, Table, Modal, Button, Form, Input, message } from 'antd';
import axios from 'axios'
import { useHistory } from 'react-router';
const ListProducter = () => {
    const [producer, setProducer] = useState([]);
    const [idPro, setIdPro] = useState([]);
    const loadEdit = (e) => {
        let i = e.currentTarget.dataset.id;
    }
    const onClick = (e) => {
        let id = e.currentTarget.dataset.id
        setIdPro(id)
        console.log('Content: ', e.currentTarget.dataset.id);
        console.log(idPro);
        setIsModalVisible(true);
    }
    ///Modal Xoá
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        let url = "http://127.0.0.1:5000/api/v1/del-product/" + idPro;
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
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/producer").then((res) => {
            console.log(res.data.data);
            setProducer(res.data.data)
        });
    }, []);
    const columns = [
        {
            title: 'Mã nhà sản xuất',
            dataIndex: 'mansx',
            key: 'mansx',
        },
        {
            title: 'Tên nhà sản xuất',
            dataIndex: 'tennsx',
            key: 'tennsx',
        },
        {
            title: 'Xuất xứ',
            dataIndex: 'xuatxu',
            key: 'xuatxu',

        },
        {
            title: 'Action',
            dataIndex: 'mansx',
            key: 'mansx',
            render: text => <Button data-id={text} onClick={onClick}>Xoá</Button>
        },
        {
            title: '',
            dataIndex: 'mansx',
            key: 'mansx',
            render: text => <Button data-id={text} onClick={onClick}>Sửa</Button>
        }

    ];
    //Model
    return (
        <>
            <Table dataSource={producer} columns={columns} pagination={{ pageSize: 6 }} size="middle" />
            <Modal title="Thông báo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn xoá nhà sản xuất này không  ?</p>
            </Modal>

        </>
    );
}
export default ListProducter;