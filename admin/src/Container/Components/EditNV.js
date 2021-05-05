
import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Button, message, Select } from "antd";
import axios from "axios"
import { Link, useHistory } from "react-router-dom"
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

const EditNV = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const Admin = JSON.parse(localStorage.getItem("admin"))
    

    const register = (values) => {
        console.log(values)
        let a = JSON.stringify({ admin: "adas@gmail.com" });

        console.log(a);
        const url = "http://127.0.0.1:5000/api/v1/update-profile-admin"
        axios.post(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/DanhsachAdmin');
                }, 2000)
            }
            else {
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
                <h2 style={{ textAlign: 'center' }}>Sửa  nhân viên</h2>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={register}
                    initialValues={{
                        id: `${Admin.data.manv}`,
                        prefix: "86",
                        email:`${Admin.data.admin}`,
                     
                        name:`${Admin.data.tennv}`,
                        pass:`${Admin.data.matkhau}`,
                        pass1:`${Admin.data.matkhau}`,
                        phone:`${Admin.data.sodienthoai}`,
                        address:`${Admin.data.diachi}`,
                        permission: `${Admin.data.maquyen}`
                    }}
                    scrollToFirstError
                    className="register-form"
                >

                    <Form.Item
                        name="id"
                        id="manv"
                        label="Mã nhân viên"

                    >
                        <Input disabled  />
                    </Form.Item>
                    <Form.Item
                        name="email"
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
                     
                        label="Tên nhân viên"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên tài khoản !!!",
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input value={Admin.data.tennv} defaultValue={Admin.data.tennv} />
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
                    >
                        <Input.Password  />
                    </Form.Item>
                    <Form.Item
                      
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
                        <Input.Password  />
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
                        <Input  />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        id="address"
                        label="Địa chỉ"

                    >
                        <Input value={Admin.data.diachi} defaultValue={Admin.data.diachi} />
                    </Form.Item>
                    <Form.Item
                        name="permission"
                        label="Phân quyền"
                    >
                        <Select>
                            <Option value="1">Admin</Option>
                            <Option value="2">Nhân viên bán hàng</Option>
                            <Option value="3">Nhân viên giao hàng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="set"
                        hidden='true'
                    >
                        <Input value="123" id={"123"} defaultValue={"123"} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                    <Link to={'/DanhsachAdmin'}><p   style={{marginRight:"20px",}}className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                            Xác nhận
                </Button>
                    </Form.Item>
                </Form>

            </Col>
        </Row >
    );
}

export default EditNV;
