import { Row, Col, Menu } from 'antd';
import React from "react";
/* import {  LoginOutlined } from '@ant-design/icons'; */
import { BrowserRouter as Router} from "react-router-dom";
import "./scss/Header.scss"
import { Layout } from 'antd';
const { Header} = Layout;

const HeaderPage = () => {
    return (
        <>
            <Header className="header">
                <Row>
                    <Router>
                        <Col span={22} offset={1}>
                        <Menu  mode="horizontal">
                                <Menu.Item key="app">
                                    Xin chào Quách Trọng Nhân
                                </Menu.Item>
                                <Menu.Item key="item">
                                    Đăng xuất
                            </Menu.Item>
                            </Menu>
                        </Col>

                    </Router>
                </Row>
            </Header>
        </>
    );
};
export default HeaderPage;