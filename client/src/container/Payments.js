import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  Timeline,
  Input,
  Steps,
  Layout,
  BackTop,
  Divider,
} from "antd";
import Payments2 from "./Payments2";
import {
  BankOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
LoadingOutlined, SmileOutlined 
} from "@ant-design/icons";
import "./Cart";
const { Step } = Steps;
const { TextArea } = Input;
const { Content } = Layout;
const { confirm } = Modal;
const Payments = (props) => {
  useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(props.payCart);
  const [visible, setVisible] = useState(false);

  /* const userlog = localStorage.getItem() */
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Thanh Toán
      </Button>
      <Modal
        title="Payments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <div>
          <Steps>
            <Step
              status="finish"
              title="Make Payment"
              icon={<LoadingOutlined />}
            />
            <Step status="process" title="Card Infomation" />
            <Step status="wait" title="Done" icon={<SmileOutlined />} />
          </Steps>
        </div>

        <div style={{ marginTop: "100px" }}>
          <form>
            <p>
              <div style={{ border: "1px solid black", maxWidth: "100%", height: 300, overflow:"scroll" }}>
                {props.payCart.map((item) => (
                  <div>
                    <div
                      className="cart-imgProduct"
                      key={item.masp}
                      span={6}
                    ></div>
                    <h1>{item.tensp}</h1>
                    <h3 className="quantity-box">SL : {item.qty}</h3>
                    <h3>Giá : ${item.qty * item.gia.toFixed(2)}Đ</h3>
                    <hr></hr>
                  </div>
                ))}
              </div>
            </p>
            <Row>
              <Col span={10} offset={1}>
                <p>
                  <Input placeholder="Firt Name" value={user.username} />
                </p>
                <p>
                  <Input placeholder="Email Address" value={user.email} />
                </p>
                <p>
                  <h1>Select Method Of Payment</h1>
                </p>
                <p>
                  <Checkbox.Group style={{ width: "100%" }}>
                    <Row>
                      <Col span={24}>
                        <Row>
                          <Col span={2}>
                            <CreditCardOutlined
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </Col>
                          <Col span={20}>Credit Cart Or Debit</Col>
                          <Col>
                            <Checkbox value="Credit"></Checkbox>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          <Col span={2}>
                            <DollarCircleOutlined
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </Col>
                          <Col span={20}>Paypal</Col>
                          <Col>
                            <Checkbox value="Paypal"></Checkbox>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          <Col span={2}>
                            <BankOutlined
                              style={{ fontSize: "20px", color: "blue" }}
                            />
                          </Col>
                          <Col span={20}>Bank Tranfer</Col>
                          <Col>
                            <Checkbox value="Bank"></Checkbox>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                  ,
                </p>
              </Col>
              <Col span={10} offset={1}>
                <p>
                  <TextArea
                    placeholder="Address Delivery"
                    rows={5}
                    value={user.diachi}
                  />
                </p>
                <p>
                  <Input placeholder="Mobile Phone" value={user.sdt} />
                </p>
              </Col>
            </Row>
            <div style={{ paddingLeft: "78%" }}>
              <Payments2 />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Payments;
