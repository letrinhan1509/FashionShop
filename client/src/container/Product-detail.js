import { Col, Layout, Row, Breadcrumb, Card } from "antd";
import React from 'react';
import "../container/components-css/ProductDetail.scss"
import "../components/Select_Product"
import SelectProduct from "../components/Select_Product";
//import axios from 'axios';
import { useParams } from "react-router";
const { Content } = Layout;

const ProductDetail = () => {
    const { id } = useParams();
    console.log(id);
   /*  const [ListProductHome, setListProductHome] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/san-pham/api/product'
        ).then(res => { setListProductHome(res.data) })
    }, []); */
    const menuItems = [
        {
            key: "1",
            img: "iconGray.jpg",
            name: "IconGray",
            costNew: "$100,00",
            costOld: "$200,00"
        },
        {
            key: "2",
            img: "lacoste.jpg",
            name: "Lacoste",
            costNew: "$200,00",
            costOld: "$250,00"
        },
        {
            key: "3",
            img: "mlbNY.jpg",
            name: "mlbNY",
            costNew: "$200,00",
            costOld: "$340,00"
        },
        {
            key: "4",
            img: "pumathunder.jpg",
            name: "Pumathunder",
            costNew: "$300,00",
            costOld: "$450,00"
        },
    ];
 /*    let item = [];
    item = ListProductHome.filter(
        ListProductHome => ListProductHome.masp.toString() === id

    ) */


    return (
        <Content >
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
                    <SelectProduct />
                </Col>
            </Row>
            <Row className="related">
                <Col>
                    <Row className="title-related">
                        <Col offset={9}>
                            <h1>Related Products</h1>
                        </Col>
                    </Row>
                    <Row className="detail-related">
                        {menuItems.map((Items) => {
                            return (
                                <Col className="box-product" key={Items.key}>
                                    <Card className="card-pro"
                                        key={Items.key}
                                        bordered={false}
                                        style={{ width: 320 }}>

                                        <div>
                                            <img alt='img' src={`../images/giay/${Items.img}`} />
                                        </div>
                                        <p>
                                            {Items.name}
                                        </p>
                                        <ul className="price">
                                            <li className="new">{Items.costNew}</li>
                                            <li className="old">{Items.costOld}</li>
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