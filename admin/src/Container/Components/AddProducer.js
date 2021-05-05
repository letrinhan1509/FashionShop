import React, { useState } from 'react';
import axios from "axios"
import { Form, Input, Button, Upload, message, Image, Row, Col } from 'antd';
import { useHistory } from "react-router-dom"
const AddProducer = () => {
    let link = useHistory()
    const addproducer = (values) => {
        console.log('Received values of form: ', values);
        const url = "http://127.0.0.1:5000/api/v1/add-producer";
        axios
            .post(url, values)
            .then(async (res) => {
                message.success(res.data.message);
                setTimeout(() => {
                    link.push('/Danhsachnhasx');
                }, 1000)

            })
            .catch((err) => {
                message.error(`Error`)
            })
    }
    return (
        <>
            <Row className="register-container">
                <Col className="register-form-wrapper" offset={6} span={10}>
                    <h2 style={{ textAlign: 'center' }}>Thêm loại sản phẩm</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                         
                        }}
                        onFinish={addproducer}
                    >
                        <Form.Item
                            name="code"
                            label="Mã nhà sản xuất"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mã nhà sản xuất !!!",

                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Tên nhà sản xuất"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên nhà sản xuất !!!",

                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                            name="origin"
                            label="Xuất xứ"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập xuất xứ !!!",

                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Thêm nhà sản xuất
                    </Button>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default AddProducer;
