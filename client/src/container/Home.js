import React, { useState, useEffect } from "react";
import { Row, Col, Carousel, Card, Tabs, Image, Checkbox } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import "./components-css/Home.scss";
import cookies from "react-cookies";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
//import ProductDetail from "./Product-detail";
const { TabPane } = Tabs;
const contentStyle = {
    height: '590px',
};


const { Meta } = Card;
const ListProduct = [
    {
        id: '1',
        title: 'Áo',
        img: 'sale_off_1.jpg',
        sale: '30',
        name: 'Ao'
    },
    {
        id: '2',
        title: 'Balo',
        img: 'sale_off_2.jpg',
        sale: '10',
        name: 'Balo'
    },
    {
        id: '3',
        title: 'Giày',
        img: 'sale_off_3.jpeg',
        sale: '20',
        name: 'Phukien'
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
    const [ProductHome, setProductHome] = useState(props.ListProductHome);
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


    useEffect(() => {
        const swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                autoplay: 2,
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: true,
            },
            loop: true,
        });
    }, [])
    const info_sale = {
        height: '300px',
        color: '#fff',
        textAlign: 'center',
    };

    useEffect(() => {
        localStorage.setItem(...['cart', JSON.stringify(props.cart)]);

    }, [props.cart]);



    /* const [ck, setCk] = useState(false);
    const onChange = () => {
        if(ck== false){
            setCk(true);
        }else{
            setCk(false);
        }
    }; */

    return (
        <>
            <Carousel className="slider__bg">
                <Row className="slider__bg" >
                    <Col style={contentStyle} className="menu " span={22} offset={1}>
                        {/* <h3 className="slider__bg__title">
                            Super Flash Sale 50% Off
                        </h3> */}
                        <Carousel className="slider__bg__title" autoplay>
                            <div>
                                <h3 style={info_sale}>Super Flash Sale 30% Off</h3>
                            </div>
                            <div>
                                <h3 style={info_sale}>Giảm 10% cho hóa đơn trên 700k</h3>
                            </div>
                            <div>
                                <h3 style={info_sale}>Summer Collection<p>26-05-2021</p></h3>
                            </div>
                        </Carousel>
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

                                            className="card-sale"
                                            bordered={false}
                                            back
                                        >
                                            <Link to={`/${productItem.name}`}>
                                                <div className="img-box">
                                                    <Image
                                                        className="sale_img"
                                                        width={'100%'}
                                                        src={`./images/slider/${productItem.img}`}
                                                        preview={{
                                                            visible: false,
                                                            /* onVisibleChange: () => { onClick() }, */
                                                            mask: <div className="link_product">
                                                                
                                                                <span>
                                                                        {productItem.title} - Sale Off {productItem.sale}%
                                                                </span>
                                                                

                                                            </div>
                                                        }}
                                                    />
                                                </div>
                                            </Link>
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

                                        <Card
                                            width={'100%'}
                                            key={productItem.masp}
                                            className="card-pro card_product_home"
                                            bordered={false}
                                            hoverable >
                                            <div className="img-box">
                                                <Image
                                                    width={'100%'}
                                                    src={`./images/test/${productItem.hinh}`}
                                                    preview={{
                                                        visible: false,
                                                        /* onVisibleChange: () => { onClick() }, */
                                                        mask: <div className="icon_product">
                                                            <span onClick={() => props.Thongbao_Them(productItem)}>
                                                                <ShoppingCartOutlined
                                                                    style={{ fontSize: '36px' }} />
                                                            </span>
                                                            <span>
                                                                <Link to={`/ProductDetail/${productItem.masp}`}>
                                                                    <EyeOutlined
                                                                        style={{ fontSize: '36px' }}
                                                                    />
                                                                </Link>
                                                            </span>
                                                        </div>
                                                    }}
                                                />
                                            </div>
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
                                    </Col>
                                );
                            })}
                        </Row>
                        {/* <Row>
                            <Col offset={12}>
                                <a href='/AllProduct' className="btn-load">Xem thêm</a>

                            </Col>
                        </Row> */}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* <Carousel autoplay>
                        <div className="slider">
                            <div className="img-box">
                                <img src="./images/slider/slider1.jpeg"/>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="img-box">
                                <img src="./images/slider/slider2.jpeg"/>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="img-box">
                                <img src="./images/slider/slider3.jpeg"/>
                            </div>
                        </div>
                        <div className="slider">
                            <div className="img-box">
                                <img src="./images/slider/slider4.jpg"/>
                            </div>
                        </div>
                    </Carousel> */}
                    <div className="four">
                        <div className="texttitle">
                            <h1>Hot Detail</h1>
                        </div>
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide"><img src="./images/slider/slider1.jpeg" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider2.jpeg" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider3.jpeg" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider4.jpg" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider5.png" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider6.png" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider7.png" /></div>
                                <div className="swiper-slide"><img src="./images/slider/slider8.png" /></div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>

                </Col>
            </Row>


            {/* 
            <Row>
                <Col><h1>Kết quả: {ck ? "Yes" : "No"}</h1></Col>
                <Col>
                    <Checkbox value="Credit" checked={ck} onChange={onChange}></Checkbox>
                </Col>

            </Row> */}


        </>
    )
}
export default Home;