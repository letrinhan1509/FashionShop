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

const EditType = () => {
    const [form] = Form.useForm();
    const history = useHistory();
    const t = JSON.parse(localStorage.getItem("type"))
    const [type, setType] = useState([]);
    let url ="http://127.0.0.1:5000/api/v1/type-id/"+t
    useEffect(()=>{
        axios.get(url).then( async(res)=>{
            console.log(res.data.status);
            if(res.data.status ==="success"){
                setType(res.data.data);
            }
            else{
                message.error(res.data.status)
            }
          
        })


    },[])
    console.log("Thông tin admin:", type.maloai);
    const edittype = (values) => {
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
                <h2 style={{ textAlign: 'center' }}>Sửa Loại Sản Phẩm</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                 /*    onFinish={register} */
                    initialValues={{
                        typeId:`${type.maloai}`,
                      
                        name:`${type.tenloai}`,
                     
                    }}
                    scrollToFirstError
                    className="register-form"
                >
                    <Form.Item
                        name="typeId"
                        id="manv"
                        label="Mã loại"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                        name="name"
                      
                        label="Tên loại"
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

export default EditType;
