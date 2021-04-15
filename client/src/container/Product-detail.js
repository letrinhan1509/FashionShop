import { Col, Layout, Row, Breadcrumb, Card } from "antd";
import React, { useState, useEffect} from 'react';
import "../container/components-css/ProductDetail.scss"
import "../components/Select_Product"
import SelectProduct from "../components/Select_Product";
const { Content } = Layout;

const ProductDetail = (props) => {
    
    const [relatedItems, setRelatedItems] = useState(props.initRelatedItems);
    useEffect(() => {
        setRelatedItems(props.initRelatedItems);
    }, [])

    return (
        <Content className="detail-wrapper">
            <Row className="link-row">
                <Col className="link-col" offset={10} >
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="#/">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="#/">Hot Deal</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>BIGBALL CHUNKY P BOSTON RED SOX</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col offset={2}>
                    <SelectProduct ListPro={props.ListProductHome} />
                </Col>
            </Row>
            <Row className="related">
                <Col offset={1}>
                    <Row className="title-related">
                        <Col offset={9} span={8}>
                            <h1>Related Products</h1>
                        </Col>
                    </Row>
                    <Row className="detail-related">
                        {props.initRelatedItems.map((Items) => {
                            return (
                                <Col className="box-product" key={Items.masp}>
                                    <Card className="card-pro"
                                        key={Items.masp}
                                        bordered={false}
                                        style={{ width: 320 }}>

                                        <div>
                                            <img alt='img' src={`../images/test/${Items.hinh}`} />
                                        </div>
                                        <p>
                                            {Items.tensp}
                                        </p>
                                        <ul className="price">
                                            <li className="new">{`${Items.gia - (Items.gia * Items.giamgia / 100)} VNĐ`}</li>
                                            <li className="old">{Items.gia}VNĐ</li>
                                            <li className="percent">{Items.giamgia}% OFF</li>
                                        </ul>
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