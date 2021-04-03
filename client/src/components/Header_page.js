import { Row, Col, Layout, Select, Badge } from 'antd';
import React from "react";
import { ShoppingCartOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import "./components-css/Header.scss"
const { Option } = Select;
const { Header } = Layout;

const Header_page = () => {
    return (
        <>
            <Header className="header">
                <Row>
                    <Col className="menu" span={22} offset={1}>
                        <div className="menu__top">
                            <div className="menu__top__select">
                                <Select defaultValue="VN" style={{ width: 70 }} >
                                    <Option value="US">US</Option>
                                    <Option value="VN">VN</Option>
                                </Select>
                                <Select defaultValue="VN" style={{ width: 75 }} >
                                    <Option value="US">USD</Option>
                                    <Option value="VN">VND</Option>
                                </Select>
                            </div>
                            <div className="menu__top__profile">
                                <ul>
                                    <li>
                                        <UserOutlined />My Profile
                                    </li>
                                    <li>
                                        <Badge size="small" count={5}>
                                            <a href="#/"  ><ShoppingCartOutlined style={{ fontSize: '26px' }} ></ShoppingCartOutlined></a>
                                            
                                        </Badge>
                                    </li>
                                    <li>
                                        Item
                                    </li>
                                    <li>
                                        $0.00
                                    </li>
                                    <li>
                                        <SearchOutlined />
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="menu__bottom">
                            <div className="logo">
                                <img src="./images/icon/logo.svg" alt="cc"/>
                            </div>
                            <div className="menu" >
                                <ul>
                                    <li><a href='#/'>Home</a></li>
                                    <li><a  href='#/'>Bags</a></li>
                                    <li><a  href='#/'>Sneakers</a></li>
                                    <li><a  href='#/'>Belt</a></li>
                                    <li><a  href='#/'>Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Header>
           
            
        </>
    );
};
export default Header_page;