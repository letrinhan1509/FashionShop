import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  Input,
  Steps,
  Layout
} from "antd";
import Payments2 from "./Payments2";
import {
  BankOutlined,
  CreditCardOutlined,
LoadingOutlined, SmileOutlined 
} from "@ant-design/icons";
import "./Cart";
import Payments3 from './Payments3'
const { Step } = Steps;
const { TextArea } = Input;


const Payments = (props) => {
  useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(props.payCart);
  

  const [isCitizen, setisCitizen] = useState(false)
  const onChange = e =>{
    setisCitizen(e.target.checked)
  }
  const [visible, setVisible] = useState(false);
  /* const userlog = localStorage.getItem() */
  console.log(props.visible);
  return (
    <>
      <Button type="primary"  size={props.size} onClick={() => setVisible(true)}>
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
                            <Checkbox value="Credit"
                             checked={isCitizen}
                             onChange={onChange}
                            ></Checkbox>
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
                          <Col span={20}>Thanh toán sau khi nhận hàng</Col>
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
             
            <h1>{isCitizen ? <Payments2 /> : <Payments3 />}</h1>
         
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Payments;
