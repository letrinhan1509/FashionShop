import { Col, Layout, Row, Image, Card } from "antd";
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import "../container/components-css/ProductDetail.scss"
import "../components/Select_Product"
import SelectProduct from "../components/Select_Product";
import Link_Page from "../components/Link_Page";
import { Link } from "react-router-dom";
const { Content } = Layout;

const ProductDetail = (props) => {
    const { Meta } = Card;
    const [relaedItems, setRelatedItems] = useState(props.initRelatedItems);

    useEffect(() => {
        setRelatedItems(props.initRelatedItems);
        // eslint-disable-next-line
    }, [])

    return (
        <Content className="detail-wrapper">
            <Link_Page />
            <Row>
                <Col offset={2}>
                    <SelectProduct ListPro={props.ListProductHome} />
                </Col>
            </Row>
            <Row className="related">
                <Col>
                    <Row className="title-related">
                        <Col offset={9} span={8}>
                            <h1>Related Products</h1>
                        </Col>
                    </Row>
                    <Row className="detail-related">
                        {props.initRelatedItems.map((Items) => {
                            return (
                                <Col key={Items.masp} >

                                    <Card
                                        width={'100%'}
                                        key={Items.masp}
                                        className="card-pro card_product_home"
                                        bordered={false}
                                        >
                                        <div className="img-box">
                                            <Image
                                                width={'100%'}
                                                src={`../images/test/${Items.hinh}`}
                                                preview={{
                                                    visible: false,
                                                    /* onVisibleChange: () => { onClick() }, */
                                                    mask: <div className="icon_product">
                                                        <span onClick={() => props.Thongbao_Them(Items)}>
                                                            <ShoppingCartOutlined
                                                                style={{ fontSize: '36px' }} />
                                                        </span>
                                                        <span>
                                                            <Link to={`/ProductDetail/${Items.masp}`}>
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
                                            title={Items.tensp} />
                                        <div className="price">
                                            <Meta
                                                className="card-pro-priceSale"
                                                title={`${Items.gia - (Items.gia * Items.giamgia / 100)} VNĐ`} />
                                            <Meta
                                                className="card-pro-price"
                                                title={`${Items.gia} VNĐ`} />
                                            <Meta
                                                className="card-pro-sale"
                                                title={`${Items.giamgia}% Off`} />
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Row>

        </Content>
    );
}

export default ProductDetail;