import { Col, Layout, Row, Button, Modal, Breadcrumb } from "antd";
import React, { useState, useEffect } from 'react';
import "../container/components-css/cart.scss"
import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import Payments from "./Payments";
import Paycart from "./Paycart";
import { Link } from "react-router-dom";
import Link_Page from "../components/Link_Page";
const { Content } = Layout;
const { confirm } = Modal;
const Cart = (props) => {

    const sumPrice = props.cart.reduce((a, c) => a + c.gia * c.qty, 0);
    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);
    }, [props.cart]);


    function showDeleteConfirm(item) {
        confirm({
            title: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                props.removeProduct(item);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const [size, setSize] = useState('large');

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Cash Assets',
            className: 'column-money',
            dataIndex: 'money',
            align: 'right',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];


    return (
        <Content className="cart-wrapper">

            {
                props.cart.length !== 0 ? (
                    <>
                        <Link_Page />
                        <h1>Giỏ Hàng</h1>
                        <p className="Count_Cart">Có {props.CountCart} sản phẩm trong giỏ hàng</p>
                        <Row className="cart-title">
                            <Col>SẢN PHẨM</Col>
                            <Col offset={2}>SỐ LƯỢNG</Col>
                            <Col>GIÁ</Col>
                        </Row>
                    </>
                ) : ("")
            }

            {props.cart.length === 0 ? (
                <div className="cart-empty">
                    <p>Giỏ hàng của bạn chưa có sản phẩm nào !</p>
                    <div>
                        <Link to="/">
                            <Button type="primary" shape="round" size={size}>
                                Mua Hàng
                            </Button>
                        </Link>

                    </div>
                    <img src="https://chillydraji.files.wordpress.com/2015/08/empty_cart.jpeg" alt="empty" />
                </div>
            ) :
                (
                    props.cart.map((item) => (
                        <Row className="cart-product">
                            <Col className="cart-imgProduct" key={item.masp} span={6}>
                                <Button onClick={() => showDeleteConfirm(item)} type="primary" danger>
                                    <DeleteOutlined />
                                </Button>
                                <img src={`./images/test/${item.hinh}`} />
                            </Col>
                            <Col className="cart-deProduct">
                                <p>{item.tensp}</p>
                                <p>Giá: {item.gia}Đ</p>
                            </Col>
                            <Col className="quantity-price">
                                <div className="quantity-box">

                                    <button onClick={() => props.removeCart(item)} className="remove">-</button>
                                    {item.qty}
                                    <button onClick={() => props.addCart(item)} className="add">+</button>

                                </div>
                            </Col>
                            <Col className="price-box">
                                <div>${item.qty * item.gia.toFixed(2)}Đ</div>
                            </Col>

                        </Row>
                    ))
                )
            }
            {props.cart.length !== 0 && (
                <>
                    <Row className="cart-sum">
                        <Col>
                            <textarea
                                placeholder="Ghi chú"
                            />


                        </Col>
                        <Col className="line">
                            <h3>Tổng Hóa đơn</h3>
                            <div>
                                {props.PriceCart.toFixed(2)}Đ
                            </div>
                        </Col>

                    </Row>
                    <Row className="warning">
                        <Col >
                            (*) Mọi thông tin của bạn sẽ được bảo mật
                        </Col>
                    </Row>
                    <Row className="button-group">
                        <Col>
                            <Button type="primary" size={size}>
                                <Link to="/">
                                    Tiếp tục mua hàng <RollbackOutlined />
                                </Link>
                            </Button>
                        </Col>
                        <Col className="payments">
                            <Paycart payCart={props.cart} size={size} />
                        </Col>
                      
                       
                    </Row>
                </>
            )}

        </Content>
    );
}

export default Cart;



