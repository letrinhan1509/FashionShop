import { Row, Col, Layout, Badge, Menu } from 'antd';
import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined, SearchOutlined, UserOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import '../Select_Product';
import Payments from "../../container/Payments";
import "../components-css/Header.scss"
import Cart from '../../container/Cart';
import UserInfo from "../../container/UserInfo";


const menu = {
    fontSize: '25px',
    fontWeight: '500'
}

const HeaderPage = (props) => {


    const history = useHistory();
    const [current, setCurrent] = useState("home");
    const handClick = (e) => {
        setCurrent(e.key);
        if (e.key === '/') {
            history.push('/')
        }
        else history.push(`/${e.key}`);
    }
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        //history.push('/');
        window.location.reload()

    }
    const User = JSON.parse(localStorage.getItem('user'));
    console.log(props.CountCart);
    return (
        <>
            <Row className="menu1-wrapper">

                <Col className="menu1-box">

                    <Menu mode="horizontal"
                        className="menu1"
                        onClick={handClick}
                        selectedKeys={[current]}>
                            <div className="logo" key='/'  >
                                <img alt='logo' src="../images/icon/logo.svg" />
                            </div>
                        <Menu.Item key="cart">
                            <Badge size="small" count={props.CountCart}>
                                <ShoppingCartOutlined style={{ fontSize: '26px' }}>
                                </ShoppingCartOutlined>
                            </Badge>
                        </Menu.Item>
                        <Menu.Item key="price">
                            {props.PriceCart}Đ
                            </Menu.Item>
                        <Menu.Item key="sreach">
                            <SearchOutlined />
                        </Menu.Item>
                        {JSON.parse(localStorage.getItem('user')) === null ? (
                            <>
                                <Menu.Item key="register" style={menu} icon={<UserAddOutlined style={{ fontSize: 20 }} />}>
                                </Menu.Item>
                                <Menu.Item key="login" style={menu} icon={<LoginOutlined style={{ fontSize: 20 }} />}>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                      
                                <Menu.Item key="UserInfo" icon={<UserOutlined />}>
                                    {User.username}
                                </Menu.Item>
                          
                                <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
                                    Log out
                                        </Menu.Item>

                            </>
                        )}
                    </Menu>
                </Col>
            </Row>
            <Row className="menu2-wrapper">
                <Col className="menu2-box" >
                    <Menu mode="horizontal"
                        className="menu2"
                        onClick={handClick}
                        selectedKeys={[current]}>
                        <Menu.Item key="/" style={menu} >
                            Home
                                        </Menu.Item>
                        <Menu.Item key="ao" style={menu}>
                            Áo
                                        </Menu.Item>
                        <Menu.Item key="balo" style={menu}>
                            Balo
                                        </Menu.Item>
                        <Menu.Item key="giay" style={menu}>
                            Giày/Dép
                                        </Menu.Item>
                        <Menu.Item key="pk" style={menu}>
                            Phụ kiện
                                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
};
export default HeaderPage;