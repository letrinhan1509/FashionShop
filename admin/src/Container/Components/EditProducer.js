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

const EditProducer = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const t = JSON.parse(localStorage.getItem("producer"))
   
    console.log("Thông tin nhasx:",t.mansx);
    //console.log("Thông tin admin:", type);
    const editproducer = (values) => {
        console.log(values)
        let a = JSON.stringify({ admin: "adas@gmail.com" });

        console.log(a);
        const url = "http://127.0.0.1:5000/api/v1/update-producer"
        axios.post(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/Danhsachnhasx');
                }, 2000)
            }
            else {
                message.error("Sửa thất bại")
            }
        }) 
            .catch(err => {
                console.log(err.response);
                message.error(`Error\n ${err.response.data}`)
            })
    };
    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <Row className="register-container">
            <Col className="register-form-wrapper" offset={6} span={10}>
                <h2 style={{ textAlign: 'center' }}>Sửa Nhà Sản Xuất</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                  onFinish={editproducer}
                    initialValues={{
                        producerId:`${t.mansx}`,
                        name:`${t.tennsx}`,
                        origin:`${t.xuatxu}`
                    }}
                    scrollToFirstError
                    className="register-form"
                >
                    <Form.Item
                        name="producerId"
                        id="typeId"
                        label="Mã nhà sản xuất"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        id="name"
                        label="Tên nhà sản xuất"
                        rules={[
                           
                            {
                                required: true,
                                message: "Bạn chưa nhập tên nhà sản xuất ",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="origin"
                        id="name"
                        label="Xuất xứ"
                        rules={[
                           
                            {
                                required: true,
                                message: "Bạn chưa nhập tên nhà sản xuất ",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                    <Link to={'/Danhsachnhasx'}><p   style={{marginRight:"20px",}}className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                            Xác nhận
                </Button>
                    </Form.Item>
                </Form>

            </Col>
        </Row >
    );
}

export default EditProducer;


