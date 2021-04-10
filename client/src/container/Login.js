import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col,message } from 'antd';
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cookies from "react-cookies";    
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
    const histor = useHistory();
//tạo cookie
  const validUser = async (url) => {
    const res = await axios.post(url + 'validUser', { jwt: cookies.load('jwt') })
      .catch(err => {
        message.error(`Valid fail!\n ${err}`)
        return { status: "fail" }
      })
    message.success("Valid user successful!")
    return res.data
  }
  const login = (values) => {
    const url = "http://localhost:3001/users/api/dang-nhap";
    axios
      .post(url + 'login', values)
      .then(async (res) => {
        if (res.data.status === "success") {
          message.success("Login successful!")
          cookies.save('jwt', res.data.token)

          const valided = await validUser(url);
           
          if (valided.status === "success") {
            cookies.save('username', valided.user.username)
            
            setTimeout(async () => {
              await histor.push("/home")
              window.location.reload()
            }, 2000)
          }

        }
      })
      .catch((err) => {
        message.error(`Login fail!\n ${err}`)
      })
  }
    return (
        <Row className="login-container">
            <Col className="login-form-wrapper" offset={6} span={10}>
            <Meta id='register-title' className="register-title" title="Đăng Nhập"/>
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
