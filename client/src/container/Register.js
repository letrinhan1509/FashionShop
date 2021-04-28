import React from "react";
import { Form, Input, Row, Col, Button, message,Select } from "antd";
//import "./component-css/Register.css";

import axios from "axios"
import { useHistory } from "react-router-dom"
import Meta from "antd/lib/card/Meta";
import "./components-css/Register.scss";
const { Option } = Select;
const formItemLayout = {
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
const tailFormItemLayout = {
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

const RegisterForm = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="86">+84</Option>
           
          </Select>
        </Form.Item>
      );
    const register = (values) => {
        console.log(values)
        const url = "http://localhost:3001/users/api/dang-ky"
        axios.post(url, values).then((res) => {
            message.success("Register successfully!")
            setTimeout(() => { history.push('/login') }, 2000)
        })
            .catch(err => {
                message.error(`Login fail!\n ${err.response.data.message}`)
            })
    };


    return (
        <Row className="register-container">
            <Col className="register-form-wrapper" offset={6} span={10}>
                <Meta id='register-title' className="register-title" title="Đăng kí tài khoản" />
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={register}
                    initialValues={{
                        residence: ["zhejiang", "hangzhou", "xihu"],
                        prefix: "86",
                    }}
                    scrollToFirstError
                    className="register-form"
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: "email",
                                message: "Vui lòng nhập đúng E-mail!",
                            },
                            {
                                required: true,
                                message: "Bạn chưa nhập E-mail !",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tenkh"
                        label="Tên khách hàng"
                        tooltip="Đây là tên đăng nhập của bạn."
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tài khoảng !!!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="matkhau"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập mật khẩu!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="nhaplaimk"
                        label="Xác nhận mật khẩu"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Bạn phải xác nhận mật khẩu!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("matkhau") === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            "Hai mật khẩu phải giống nhau!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="sodienthoai"
                        label="Phone Number"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số điện thoại !'
                        }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="diachi"
                        label="Địa chỉ"
                        tooltip="Địa chỉ giao hàng"
                      /*   rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tài khoảng !!!",
                                whitespace: true,
                            },
                        ]} */
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Đăng kí
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default RegisterForm;
