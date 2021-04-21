import { Col, Layout, Row, Button, Modal, Space } from "antd";
import React, { useState, useEffect } from 'react';
import "../container/components-css/cart.scss"
import { DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { confirm } = Modal;
const Cart = (props) => {

    const sumPrice = props.cart.reduce((a, c) => a + c.gia * c.qty, 0);
    const Sum_qty = props.cart.reduce((a, c) => a + c.gia * c.qty, 0);
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

    

    console.log(props.cart);
    return (
        <Content className="cart-wrapper">
            
            {
                props.cart.length !== 0 ? (
                    <>
                        <h1>Giỏ Hàng</h1>
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
                                    <button onClick={() => props.addCart(item)} className="add">+</button>
                                    {item.qty}
                                    <button onClick={() => props.removeCart(item)} className="remove">-</button>

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
                <Row className="cart-sum">
                    <Col className="line" offset={19}>
                        <h3>Tổng Hóa đơn</h3>
                        <div>
                            {sumPrice.toFixed(2)}đ
                        </div>
                    </Col>
                </Row>
            )}

        </Content>
    );
}

export default Cart;



