import { Row, Col, Layout, Badge, Menu, Dropdown } from 'antd';
import React, { useState, useEffect, Fragment } from "react";
import { ShoppingCartOutlined, PhoneOutlined, UserOutlined, UserAddOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
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
        history.push('/');
        window.location.reload()

    }
    const User = JSON.parse(localStorage.getItem('user'));


    const drops = (
        <Menu>
            <Menu.Item key="donhang">
                <a target="_blank" rel="donhang">
                    Đơn hàng
            </a>
            </Menu.Item>
            <Menu.Item key="UserInfo">
                <a target="_blank" rel="UserInfo">
                    Profile
            </a>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
                <a target="_blank" rel="logout">
                    Log out
            </a>
            </Menu.Item>
        </Menu>
    );

    let wordData = props.ListProductHome;
    const [wordSearch, setWordSearch] = useState('');

    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    function filterItems(arr, query) {

        return arr.filter(function (el) {

            if (removeAccents(el.tensp.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
                return el;
            } else {
                return null;
            }
        });

    }

    const [visible, setVisible] = useState(false);
    const [hidden, setHidden] = useState(false);


    function handlerClick(e) {
        if (e.target.value != "") {
            setWordSearch(e.target.value);
            setHidden(true);
            setVisible(true);
        } else {
            setWordSearch(e.target.value);
            setHidden(false);
            setVisible(false);
        }
    }

    function xoaWord() {
        setWordSearch("");
        setHidden(false);
        setVisible(false);
    }

    console.log(wordSearch);

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
                        <div className="search_bar">
                            <input value={wordSearch} placeholder='Tên sản phẩm' onChange={e => handlerClick(e)} />
                            <div>
                                {
                                    hidden ? (
                                        <div className="dropList" >
                                            {
                                                visible ? filterItems(wordData, wordSearch).map(value => {
                                                    return (
                                                        <Link to={`/ProductDetail/${value.masp}`} onClick={xoaWord}>
                                                            <div className="box_link">
                                                                <p key={value.masp}>{value.tensp}</p>
                                                            </div>
                                                        </Link>
                                                    )
                                                }) : null
                                            }
                                        </div>
                                    ) : ""
                                }
                            </div>
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
                        <Menu.Item key="Contact">
                            <PhoneOutlined />
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
                                    <Dropdown overlay={drops}>
                                        <a className="ant-dropdown-link">
                                            {User.username}
                                        </a>
                                    </Dropdown>
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
                        <Menu.Item key="Ao" style={menu}>
                            Áo
                                        </Menu.Item>
                        <Menu.Item key="Balo" style={menu}>
                            Balo
                                        </Menu.Item>
                        <Menu.Item key="Giay" style={menu}>
                            Giày/Dép
                                        </Menu.Item>
                        <Menu.Item key="Phukien" style={menu}>
                            Phụ kiện
                                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
        </>
    );
};
export default HeaderPage;