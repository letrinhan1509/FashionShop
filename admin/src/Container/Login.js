import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Meta from "antd/lib/card/Meta";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Login = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const style={
    height: '100vh',
    

  }
  return (
    <>
      <Row  className="login-container">
        <Col style={{height:'100vh', marginTop:'200px'}}  className="login-form-wrapper" offset={7} span={10}>
        <h2 style={{ textAlign: 'center', fontSize:'30px' }}>Đăng nhập</h2>
          <Form
          
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="#/">
                Forgot password
        </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>
        Or <a href="#/">register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </>
  );
}

export default Login;
