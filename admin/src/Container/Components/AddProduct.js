import React, { useState } from 'react';
import axios from "axios"
import { Form, Input, Button, Upload, message,Image } from 'antd';
import { useHistory } from "react-router-dom"
import { UploadOutlined, } from '@ant-design/icons';
import { storage } from "./firebase/firebase";
import { Content } from 'antd/lib/layout/layout';
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

    const [link, setLink] = useState("");
    const [antPics, setAntPics] = useState([]);

    const [urls, setUrls] = useState([]);
    const handleAnt = e => {
        console.log(e.file.originFileObj);
        setAntPics(e.file.originFileObj);
    };
    const sendAnt = async e => {

        console.log("uploading...");

        storage
            .ref("img_product/" + antPics.name)
            .put(antPics)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
            .then(url => {
                console.log(url);
                setUrls([...urls, url]);

            })
            .catch(error => {
                console.log(error);
            });
    };

    const dowimg = () => {
        let storageRef = storage.ref();
        var gsReference = storage.refFromURL('gs://fashionshop-11d42.appspot.com/img_product/adidas.jpg');
        let starsRef = storageRef.child('img_product/tam.png');
        gsReference.getDownloadURL()
            .then((url) => {
               setLink(url)
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    // ...
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
    };
    console.log(link);
    return (
        <>
            <h2 style={{ textAlign: 'center' }}> Nhập thông tin sản phẩm</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={addProduct}

                scrollToFirstError
            >
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
                    name="ten"
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
                    name="img"
                    label="Ảnh sản phẩm"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture"
                        onChange={handleAnt}
                    >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="msx"
                    label="Mã nhà sản xuất"
                    rules={[{ required: true, message: 'Nhập mã nhà sản xuất' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="loai"
                    label="Nhập mã loại"
                    rules={[{ required: true, message: 'Nhập mã loại!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" onClick={sendAnt} htmlType="submit">
                        Thêm sảm phẩm
              </Button>
                </Form.Item>
                <Button onClick={dowimg}> Tải ảnh</Button>
               
            </Form>
            
        </>
    );
};
export default Balo;
