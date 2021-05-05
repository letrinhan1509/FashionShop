import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tabs, Image, Button, Carousel, Badge } from "antd";
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import "./components-css/Home.scss";
import axios from "axios";
import ProductDetail from "./Product-detail";
const { TabPane } = Tabs;

const { Meta } = Card;
const ListProduct = [
  {
    id: "1",
    title: "Áo KhoácCaro",
    img: "iconCaro.jpg",
    price: "200000",
  },
  {
    id: "2",
    title: "Áo Khoác Panda",
    img: "boutonPanda.jpg",
    price: "300000",
  },
  {
    id: "3",
    title: "Áo sơ mi",
    img: "nomousSticker.jpg",
    price: "150000",
  },
];
const button = [
  { name: "all", value: "Tất cả" },
  { name: "asm", value: "Áo sơ mi" },
  { name: "ak", value: "Áo Khoác" },
  { name: "bl", value: "Balo" },
  { name: "giay", value: "Giày" },
];
const Shoes = (props) => {


  const [visible, setVisible] = useState(8);
  const showMoreProduct = () => {
    setVisible((preValueProduct) => preValueProduct + 8);
  };

  const [hiddenitem] = useState(12);
  const history = useHistory();
  <ProductDetail ListProductHome={props.ListProductHome} />;
  const contentStyle = {
    height: "200px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <>
      <p style={{ marginTop: "20px" }}></p>
      <div>
        <Carousel autoplay>
          <div>
            <img height="650px" width="100%" src="./images/slider/slider_giay1.jpg" />
          </div>
          <div>
            <img height="650px" width="100%" src="./images/slider/slider_giay2.jpg" />
          </div>
          <div>
            <img height="650px" width="100%" src="./images/slider/slider_giay3.png" />
          </div>
        </Carousel>
      </div>
      <p style={{ textAlign: "center", fontSize: "26px", fontWeight: "bold" }}>
        Tổng số lượng sản phẩm : {props.countGiay}
      </p>
      <Row>
        <Col span={22} offset={1}>
          <div className="site-card-wrapper product_home">
            <Row gutter={16} justify="space-around">
              {props.Giay.slice(0, visible).map((productItem) => {
                return (
                  <Col key={productItem.masp} span={6}>
                    <Link
                      onClick={() => history.push(`/${productItem.masp}`)}
                      to={`ProductDetail/${productItem.masp}`}
                    >
                      <Card
                        width={"100%"}
                        key={productItem.masp}
                        className="card-pro card_product_home"
                        bordered={false}
                        hoverable
                      >
                        <Image
                          width={"100%"}
                          src={`./images/test/${productItem.hinh}`}
                          preview={{
                            visible: false,

                            mask: (
                              <div>
                                <ShoppingCartOutlined
                                  style={{ fontSize: "36px" }}
                                />

                                <EyeOutlined style={{ fontSize: "36px" }} />
                              </div>
                            ),
                          }}
                        />

                        <Meta
                          className="card-pro-name"
                          title={productItem.tensp}
                        />

                        <div className="price">
                          <Badge
                            /* style={{margin:"-80px 300px 0 0 "}} */ count="HOT"
                          >
                            <Meta
                              className="card-pro-priceSale"
                              title={`${
                                productItem.gia -
                                (productItem.gia * productItem.giamgia) / 100
                              } VNĐ`}
                            />
                          </Badge>
                          <Meta
                            className="card-pro-price"
                            title={`${productItem.gia} VNĐ`}
                          />

                          <Meta
                            className="card-pro-sale"
                            title={`${productItem.giamgia}% Off`}
                          />
                        </div>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
            <Row>
              <Col offset={12}>
                <Button
                  type="primary"
                  onClick={showMoreProduct}
                  className="btn-load"
                >
                  Xem thêm
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Shoes;

