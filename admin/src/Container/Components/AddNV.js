import React from 'react';
import { Form, Input, Row, Col, Button, message, Select } from "antd";
//import "./component-css/Register.css";

import axios from "axios"
import { useHistory } from "react-router-dom"
import Meta from "antd/lib/card/Meta";
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
const AddNV = (props) => {
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
        let a = JSON.stringify({ admin: "adas@gmail.com" });

        console.log(a);
        const url = "http://127.0.0.1:5000/api/v1/add-admin"
        axios.post(url, values).then((res) => {
            if (res.data.status ==="success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/DanhsachAdmin');
                }, 2000)
            }
            else{
                message.error("Thêm thất bại")
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            })
    };
    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <Row className="register-container">
            <Col className="register-form-wrapper" offset={6} span={10}>
                <h2 style={{ textAlign: 'center' }}>Thêm nhân viên</h2>
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
                        name="admin"
                        id="admin"
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
                        name="name"
                        id="name"
                        label="Tên nhân viên"
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
                        id="pass"
                        name="pass"
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
                        id="pass1"
                        name="pass1"
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
                                    if (!value || getFieldValue("pass") === value) {
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
                        name="phone"
                        id="phone"
                        label="Phone Number"
                        rules={[{
                            required: true,
                            message: 'Vui lòng nhập số điện thoại !'
                        }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        id="address"
                        label="Địa chỉ"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="permission"
                        id="permission"
                        label="Mã quyền"

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="set"
                        hidden='true'
                    >
                        <Input value={"123"} id={"123"} defaultValue={"123"} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button value="submit" onClick={() => props.handleCreateUser()} type="primary" htmlType="submit">
                            Đăng kí
                    </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default AddNV;
