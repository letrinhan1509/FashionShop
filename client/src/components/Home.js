<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Row, Col, Carousel, Card } from 'antd';
import './components-css/Home.scss';
import axios from 'axios';
const contentStyle = {
    height: '590px',
    backgroundImage: './',

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
    { name: "giay", value: "Giày" },
]

const Home = () => {
    const [ListProductHome, setListProductHome] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/san-pham/api/product'
        ).then(res => { setListProductHome(res.data) })
    }, []);
    const [ProductHome, setProductHome] = useState([]);
    useEffect(() => {
         setProductHome(ListProductHome)
    },[ListProductHome]);
    //console.log(ProductHome);
    const handleClick =(e) => {
        setProductHome(ListProductHome);
        let filterProduct = [];
        const name = e.target.name;
        console.log(name)
        if (name === "all") {
            filterProduct = ListProductHome;
            console.log(filterProduct);
          
        } else {
            filterProduct = ListProductHome.filter(
                ListProductHome => ListProductHome.maloai === name
            )
            console.log(filterProduct);
        }
        setProductHome(filterProduct)
        /// bị ngu chổ này)
    };

    return (
        <>
            <Carousel className="slider__bg" /* afterChange={onChange} */>

                <Row className="slider__bg" >
                    <Col style={contentStyle} className="menu " span={22} offset={1}>
                        <h3 className="slider__bg__title">
                            Super Flash Sale 50% Off
                                </h3>
                    </Col>
                </Row>

                {/*  <div>
        <h3 style={contentStyle}>2</h3>
    </div>
    <div>
        <h3 style={contentStyle}>3</h3>
    </div>
    <div>
        <h3 style={contentStyle}>4</h3>
    </div> */}
            </Carousel>
            <Row>
                <Col span={22} offset={1}>
                    <div className="site-card-wrapper">
                        <Row gutter={16}>
                            {ListProduct.map((productItem) => {
                                /* if (productItem.length > 0) { */
                                return (
                                    <Col key={productItem.id} span={8}>
                                        <Card className="card-pro" bordered={false}
                                            hoverable
                                            style={{ width: 350 }}
                                            title={productItem.title} >
                                            <img alt="ao" src={`./images/aoKhoac/${productItem.img}`} />
                                            <Meta className="card-pro-price" title={`$ ${productItem.price}`} />
                                        </Card>
                                    </Col>
                                );

                            }
                            )
                            }

                        </Row>
                    </div>
                </Col>
                <Col span={22} offset={1}>
                    <div className="menu_filter">
                        <h3>Best Seller</h3>
                        <ul>
                            {button.map(({ name, value }) => (
                                <li key={name}>
                                    <a href="#/"
                                        key={name}
                                        name={name}
                                        value={value}
                                        onClick={handleClick}
                                    >{value}</a>
                                </li>
                            ))}


                        </ul>
                    </div>
                    <div className="site-card-wrapper product_home">
                        <Row gutter={16}>
                            {ProductHome.map((productItem) => {
                                /* if (productItem.length > 0) { */
                                return (
                                    <Col key={productItem.masp} span={6}>
                                        <Card key={productItem.masp} className="card-pro card_product_home" bordered={false}
                                            hoverable

                                            title={productItem.tensp} >
                                            <img alt="ao" src={`./images/test/${productItem.hinh}`} />
                                            <Meta className="card-pro-price" title={`$ ${productItem.gia}`} />
                                        </Card>
                                    </Col>
                                );

                            }
                            )
                            }

                        </Row>
                    </div>
                </Col>
            </Row>



        </>
    )
}


export default Home;
=======
>>>>>>> parent of 19dd1ba (1)
