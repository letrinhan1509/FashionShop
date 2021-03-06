import React, { useState, useEffect } from 'react';
import axios from "axios"
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
const Balo = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const addProduct = (values) => {
        let nameImg = values['img'][0].name;
        console.log(nameImg);
        values["img"] = nameImg;
        console.log(values)
        const url = "http://127.0.0.1:5000/api/v1/add-product"
        axios.post(url, values).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/all');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            })
    };
    const [fileList, setFileList] = useState([]);
    const meta = {
        title: 'title 1',
        contents: 'contents 1',
    }
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => formData.append('img', file));
        for (let key in meta) {
            formData.append(key, meta[key]);
        }

        axios.post('http://127.0.0.1:5000/api/v1/add-img', formData, {
            header: { 'Content-Type': 'multipart/form-data' }
        });
    }
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }

    const [listProduct, setlistProduct] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/v1/producer").then((res) => {
            setlistProduct(res.data.data)
        })
    }, [])
    console.log(listProduct);
    console.log(props.listType);

    return (
        <>
            <h2 style={{ textAlign: 'center' }}> Nh???p th??ng tin s???n ph???m</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={addProduct}
                scrollToFirstError
            >
                <Form.Item
                    name="code"
                    label="M?? s???n ph???m"
                    rules={[
                        {
                            type: 'string',
                            message: 'M?? s???n ph???m kh??ng ???????c ????? tr???ng !',
                        },
                        {
                            required: true,
                            message: '??i???n m?? s???m ph???m',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="T??n s???n ph???m"
                    rules={[
                        {
                            required: true,
                            message: 'Nh???p t??n s???n ph???m!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Gi??"
                    rules={[
                        {
                            required: true,
                            message: 'Nh???p gi??'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="redPrice"
                    label="Khuy???n m??i"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="S??? l?????ng"
                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="img"
                    label="???nh s???n ph???m"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        listType="picture"
                        name='img'
                        multiple='true'
                        action='http://127.0.0.1:5000/api/v1/add-img'
                        beforeUpload={beforeUpload}
                        fileList
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="producer"  name="producer"
                    label="Nh?? s???n xu???t">
                    <Select>
                        {listProduct.map((item) => {
                            return (
                                <>
                                    <Option value={item.mansx}>{item.tennsx}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Nh???p m?? lo???i"
                    rules={[{ required: true, message: 'Nh???p m?? lo???i!' }]}
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
                    <Button type="primary" onClick={handleUpload} htmlType="submit">
                        Th??m s???m ph???m
              </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Balo;
