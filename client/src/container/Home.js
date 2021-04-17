import React, { useState, useEffect } from "react";
import { Row, Col, Carousel, Card, Tabs, Image } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import "./components-css/Home.scss";
import cookies from "react-cookies";
//import ProductDetail from "./Product-detail";
const { TabPane } = Tabs;
const contentStyle = {
    height: '590px',
};
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
const Home = (props) => {
    console.log(props)
    const [ProductHome, setProductHome] = useState([]);
    useEffect(() => {
        setProductHome(props.ListProductHome)
    }, [props.ListProductHome])
    const handleClick = (e) => {
        setProductHome(props.ListProductHome);
        let filterProduct = [];
        if (e === "all") {
            filterProduct = props.ListProductHome;
        } else {
            filterProduct = props.ListProductHome.filter(
                ListProductHome => ListProductHome.maloai === e
            )
        }
        setProductHome(filterProduct)
    };
    const [hiddenitem] = useState(12);
    //const history = useHistory();
    const history = useHistory();
    useEffect(() => {
        if (!cookies.load('jwt')) {
            history.push('/')
            //window.location.reload()
        }
    })
    return (
        <>
            <Carousel className="slider__bg">
                <Row className="slider__bg" >
                    <Col style={contentStyle} className="menu " span={22} offset={1}>
                        <h3 className="slider__bg__title">
                            Super Flash Sale 50% Off
                        </h3>
                    </Col>
                </Row>
            </Carousel>
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
                        <Tabs defaultActiveKey={'all'} onChange={handleClick} centered="true" >
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
                            {ProductHome.slice(0, hiddenitem).map((productItem) => {
                                return (
                                    <Col key={productItem.masp} span={6}>
                                        <Link to={`/ProductDetail/${productItem.masp}`}>
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
                                <a href='/AllProduct' className="btn-load">Xem thêm</a>
                              
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default Home;