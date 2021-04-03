import React from "react";
import { Row, Col, Carousel, Card } from 'antd';
import './components-css/Home.scss'
const contentStyle = {
    height: '590px',
    backgroundImage: './',

};
const {Meta} = Card;
const Home = () => {
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
                            <Col span={8}>
                                <Card title="Card title" bordered={true}
                                    hoverable
                                    style={{ width: 415 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                    >
                                    <Meta title="Europe Street beat" description="www.instagram.com" />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                    Card content
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )

}
export default Home;
