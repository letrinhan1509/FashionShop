import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router-dom";
import axios from "axios";
//import cookies from "react-cookies";
//import HeaderPage from '../components/include/HeaderPage';
const layout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Login = () => {
    const history = useHistory();

    const login = (values) => {
        const url = "http://localhost:3001/users/api/dang-nhap";
        axios
            .post(url, values)
            .then(async (res) => {
                if (res.data.status === "success") {
                    message.success(`Xin chào, ${res.data.data.username}`)
                    console.log(res.data.data.username)
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('username', res.data.data.username)
                    setTimeout(() => {
                        history.push("/")
                        window.location.reload()
                    }, 2000)
                }
                else {
                    message.error('Login fail !')
                }
            })
            .catch((err) => {
                message.error(`Đăng nhập thất bại\n ${err}`)
            })
    }

    return (
        <Row className="login-container">
            <Col className="login-form-wrapper" offset={6} span={10}>
                <Meta id='register-title' className="register-title" title="Đăng Nhập" />
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={login}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="matkhau"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;
