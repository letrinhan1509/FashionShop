import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { useHistory } from "react-router-dom"
import { UploadOutlined, } from '@ant-design/icons';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
const EditProduct = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
   

    const [listProducer, setlistProducer] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/producer").then((res) => {
            setlistProducer(res.data.data)
        })
    }, [])
    
    const Product1 = JSON.parse(localStorage.getItem("Product"))
    console.log(Product1.hinh);
    const editproduct= (values)=>{
        console.log(values)
        let a = JSON.stringify({ admin: "adas@gmail.com" });

        console.log(a);
        const url = "http://127.0.0.1:5000/api/v1/update-product"
        axios.post(url, values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/all');
                }, 2000)
            }
            else {
                message.error("Sửa thất bại")
            }
        }) 
            .catch(err => {
                console.log(err.response);
                message.error(`Error!\n ${err.response.data}`)
            })
    }
    return (
        <>
            <h2 style={{ textAlign: 'center' }}> Sửa sản phẩm sản phẩm</h2>
            {console.log(Product1)}
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={editproduct}
                initialValues={{
                    productId:`${Product1.masp}`,
                    code: `${Product1.code}`,
                    name: `${Product1.tensp}`,
                    price: `${Product1.gia}`,
                    
                    redPrice: `${Product1.giamgia}`,
                    amount: `${Product1.soluong}`,
                    img: `${Product1.hinh}`,
                    producerId: `${Product1.mansx}`,
                    typeIid: `${Product1.maloai}`,
                }}
                scrollToFirstError
            >
                 <Form.Item  name="productId" label="Mã">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Mã sản phẩm"
                    rules={[
                        {
                            type: 'string',
                            message: 'Mã sản phẩm không được để trống !',
                        },
                        {
                            required: true,
                            message: 'Điền mã sảm phẩm',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    id="name"
                    label="Tên sản phẩm"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập tên sản phẩm!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập giá'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="redPrice"
                    label="Khuyến mãi"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Số lượng"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="img"
                    label="Ảnh sản phẩm"
                   
                >
                    {/* <Upload
                        listType="picture"
                        name='img'
                        multiple='true'
                        action='http://127.0.0.1:5000/api/v1/add-img'
                        beforeUpload={beforeUpload}
                        fileList
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload> */}
                    <Input  name='img' />
                </Form.Item>
                <Form.Item name="producerId"
                    label="Nhà sản xuất">
                    <Select>
                         {listProducer.map((item) => {
                            return (
                                <>
                                    <Option value={item.mansx}>{item.tennsx}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="typeIid"
                    label="Nhập mã loại"
                    rules={[{ required: true, message: 'Nhập mã loại!' }]}
                >
                    <Select>
                          {props.listType.map((item) => {
                            return (
                                <>
                                    <Option value={item.maloai}>{item.tenloai}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"  htmlType="submit">
                        Sửa sảm phẩm
              </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default EditProduct;
