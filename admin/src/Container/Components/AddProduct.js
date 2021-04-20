import React, { useState } from 'react';
import { Form, Input,Button,Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
const Balo = () => {
    const [form] = Form.useForm();

    /* const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    }; */
    return (
        <>
            <h2 style={{textAlign:'center'}}> Nhập thông tin sản phẩm</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
              /*   onFinish={onFinish} */

                scrollToFirstError
            >
                <Form.Item
                    name="masp"
                    label="Mã sản phẩm"
                    rules={[
                        {
                            type: 'email',
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
                    name="tensp"
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
                    name="gia"
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
                    name="giamgia"
                    label="Khuyến mãi"

                    rules={[{ required: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Ảnh sản phẩm"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}

                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="mansx"
                    label="Mã nhà sản xuất"
                    rules={[{ required: true, message: 'Nhập mã nhà sản xuất' }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="ml"
                    label="Nhập mã loại"
                    rules={[{ required: true, message: 'Nhập mã loại!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Thêm sảm phẩm
              </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Balo;
