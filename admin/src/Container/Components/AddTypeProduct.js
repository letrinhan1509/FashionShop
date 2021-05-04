import React, { useState } from 'react';
import axios from "axios"
import { Form, Input, Button, Upload, message, Image, Row, Col } from 'antd';
import { useHistory } from "react-router-dom"
const AddTypeProduct = () => {
    const addType = (values) => {
        console.log('Received values of form: ', values);
        const url = "http://127.0.0.1:5000/api/v1/add-type";
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
            <Row className="register-container">
                <Col className="register-form-wrapper" offset={6} span={10}>
                    <h2 style={{ textAlign: 'center' }}>Thêm loại sản phẩm</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                            /* typrId: `${code}` */
                        }}
                        onFinish={addType}
                    >
                        <Form.Item
                            name="ma"
                            label="Mã loại"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mã loại !!!",

                                },
                            ]}
                        >
                            <Input name="ma" />
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="Tên loại"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên loại !!!",

                                },
                            ]}
                        >
                            <Input name="name" />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Thêm loại
                    </Button>

                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default AddTypeProduct;
