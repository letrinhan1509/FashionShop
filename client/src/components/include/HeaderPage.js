import { Row, Col, Layout, Badge, Menu } from 'antd';
import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined, SearchOutlined, UserOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";
import "../components-css/Header.scss"

const { Header } = Layout;
const contentStyle = {
    textAlign: 'right',
};
const menu = {
    fontSize: '25px',
    fontWeight: '500'
}
const logo = {
    textAlign: 'left'
}
const HeaderPage = (user, props) => {
    const {CountCart} = props;

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
        localStorage.removeItem("username")
        //history.push('/');
        window.location.reload()

    }
    console.log(CountCart);
    return (
        <>
            <Header className="header">
            <p>{props.CountCart}</p>
                <Row>
                    <Router>
                        <div className="logo" key='/'  >
                            <img style={logo} alt='logo' src="../images/icon/logo.svg" />
                        </div>
                        <Col className="menu" span={22} offset={1}>
                            <Menu style={contentStyle} mode="horizontal"
                                onClick={handClick}
                                selectedKeys={[current]}>
                                <Menu.Item>
                                   
                                    <p>{props.CountCart}</p>
                                    
                                </Menu.Item>
                                <Menu.Item key="cart">
                                    <Badge size="small" count={5}>
                                        <ShoppingCartOutlined style={{ fontSize: '26px' }}>
                                        </ShoppingCartOutlined>
                                    </Badge>
                                </Menu.Item>
                                <Menu.Item key="item">
                                    Item
                            </Menu.Item>
                                <Menu.Item key="price">
                                    $ 00.0
                            </Menu.Item>
                                <Menu.Item key="sreach">
                                    <SearchOutlined />
                                </Menu.Item>
                                {localStorage.getItem('username') === null ? (
                                    <>
                                        <Menu.Item key="register" style={menu} icon={<UserAddOutlined style={{ fontSize: 20 }} />}>
                                        </Menu.Item>
                                        <Menu.Item key="login" style={menu} icon={<LoginOutlined style={{ fontSize: 20 }} />}>
                                        </Menu.Item>
                                    </>
                                ) : (
                                    <>
                                        <Menu.Item key="profile" icon={<UserOutlined />}>
                                            {localStorage.getItem('username')}
                                        </Menu.Item>
                                        <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
                                            Log out
                                        </Menu.Item>

                                    </>
                                )}



                            </Menu>
                            <Col className="menu" span={22} offset={1}>
                                <Menu style={contentStyle} mode="horizontal"
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
                        </Col>
                    </Router>
                </Row>
            </Header>
        </>
    );
};
export default HeaderPage;