import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tabs, Image } from 'antd';
import { Link,useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import "./components-css/Home.scss";
import axios from 'axios';
import ProductDetail from "./Product-detail";
const { TabPane } = Tabs;

const { Meta } = Card;
const ListProduct = [
    {
        id: '1',
        title: 'Áo KhoácCaro',
        img: 'iconCaro.jpg',
        price: '200000',
    },
    {
        id: '2',
        title: 'Áo Khoác Panda',
        img: 'boutonPanda.jpg',
        price: '300000',
    },
    {
        id: '3',
        title: 'Áo sơ mi',
        img: 'nomousSticker.jpg',
        price: '150000',
    }
]
const button = [
    { name: "all", value: "Tất cả" },
    { name: "asm", value: "Áo sơ mi" },
    { name: "ak", value: "Áo Khoác" },
    { name: "bl", value: "Balo" },
    { name: "giay", value: "Giày" }
]
const AllProduct = () => {
    const [ListProductHome, setListProductHome] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/san-pham/api/product'
        ).then(res => { setListProductHome(res.data) })
    }, []);
    const [ProductHome, setProductHome] = useState([]);
    useEffect(() => {
        setProductHome(ListProductHome)
    }, [ListProductHome]);
    const handleClick = (e) => {
        setProductHome(ListProductHome);
        let filterProduct = [];
        if (e === "all") {
            filterProduct = ListProductHome;
        } else {
            filterProduct = ListProductHome.filter(
                ListProductHome => ListProductHome.maloai === e
            )
        }
        setProductHome(filterProduct)
    };
    const [hiddenitem] = useState(12);
    const history = useHistory();
    <ProductDetail ListProductHome ={ListProductHome}/>
    return (
        <>
            <Row>
                <Col span={22} offset={1}>
                    <div className="site-card-wrapper">
                        <Row gutter={16} >
                            {ListProduct.map((productItem) => {
                                return (
                                    <Col key={productItem.id} span={6} xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }} >
                                        <Card

                                            className="card-pro"
                                            bordered={false}
                                            hoverable
                                            style={{ width: "100%" }}>
                                            <img
                                                alt="ao"
                                                src={`./images/aoKhoac/${productItem.img}`} />
                                            <Meta
                                                className="card-pro-name"
                                                title={productItem.title} />
                                            <Meta
                                                className="card-pro-price"
                                                title={`$ ${productItem.price}`} />
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </Col>
                <Col span={22} offset={1}>
                    <div className="menu_filter">
                        <h3>Best Seller</h3>
                        <Tabs onChange={handleClick} centered="true" >
                            {button.map(({ name, value }) => (
                                <TabPane
                                    tab={value}
                                    key={name}
                                    name={name}>
                                </TabPane>
                            ))}
                        </Tabs>
                    </div>
                    <div className="site-card-wrapper product_home">
                        <Row gutter={16} justify="space-around">
                            {ProductHome.map((productItem) => {
                                return (
                                    <Col key={productItem.masp} span={6}>
                                        <Link onClick={() => history.push(`/${productItem.masp}`)} to={`ProductDetail/${productItem.masp}`}>
                                            <Card
                                                width={'100%'}
                                                key={productItem.masp}
                                                className="card-pro card_product_home"
                                                bordered={false}
                                                hoverable >
                                                <Image
                                                    width={'100%'}
                                                    src={`./images/test/${productItem.hinh}`}
                                                    preview={{
                                                        visible: false,
                                                        /* onVisibleChange: () => { onClick() }, */
                                                        mask: <div>
                                                            <ShoppingCartOutlined
                                                                style={{ fontSize: '36px' }} />
                                                            <EyeOutlined
                                                                style={{ fontSize: '36px' }}
                                                            />
                                                        </div>
                                                    }}
                                                />
                                                <Meta
                                                    className="card-pro-name"
                                                    title={productItem.tensp} />
                                                <div className="price">
                                                    <Meta
                                                        className="card-pro-priceSale"
                                                        title={`${productItem.gia - (productItem.gia * productItem.giamgia / 100)} VNĐ`} />
                                                    <Meta
                                                        className="card-pro-price"
                                                        title={`${productItem.gia} VNĐ`} />
                                                    <Meta
                                                        className="card-pro-sale"
                                                        title={`${productItem.giamgia}% Off`} />
                                                </div>
                                            </Card>
                                        </Link>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Row>
                            <Col offset={12}>
                                <button className="btn-load">Xem thêm</button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default AllProduct;