import React, { useState, useEffect } from 'react';
import { Menu, Table, Modal, Button, Form, Input, message } from 'antd';
import axios from 'axios'
import { useHistory } from 'react-router';
import Item from 'antd/lib/list/Item';

const ListTypeProduct = () => {
    const link = useHistory();
    //const [a, setA] = useState([]);
    const [code, setCode] = useState('')
    const linkto = (e) => {
        console.log(e.key);
        localStorage.setItem('type',JSON.stringify(e.key) )
        setTimeout(() => {
            link.push('/EditType');
        }, 100)
    }
    const getName = (e) => {
        setCode(e.key)
        console.log(code);
    }
    console.log(code);
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
            render: text => <Menu onClick={linkto}><Menu.Item key={text} >Sửa</Menu.Item></Menu>,
        },
        {
            title: '',
            dataIndex: 'maloai',
            key: 'maloai',
            render: text => <Menu onClick={getName

            }  ><Menu.Item onClick={showModal} key={text} >Xoá </Menu.Item> </Menu>
        }

    ];

    //Model
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Bạn chắc chắn xoá loại sản phẩm này ?');
    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setModalText('Đang xoá...');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);

        }, 2000);
    };

    const handleCancel = () => {

        setVisible(false);
    };
    const del = (values) => {
        console.log('Received values of form: ', values);
        const url = "http://127.0.0.1:5000/api/v1/del-type";
        axios
            .post(url, values)
            .then(async (res) => {
                console.log(res.data.message);
                
            })
            .catch((err) => {
                message.error(`Sai tài khoản hoặc mật khẩu !!!`)
            })

    }
    return (
        <>
            <Table dataSource={ListType} columns={columns} pagination={{ pageSize: 6 }} size="middle" />
            <Modal
                title="Thông báo"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
                <Form

                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                        typrId: `${code}`
                    }}
                onFinish={del}
                >
                    <Form.Item
                        name="typrId"
                    >
                        <Input name="typrId" />
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Xoá
        </Button>

                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ListTypeProduct;
