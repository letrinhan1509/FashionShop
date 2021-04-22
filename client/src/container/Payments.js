import React, { useState } from "react";
import { Row, Col, Checkbox, Modal, Button, Timeline, Input, Steps } from "antd";
import Payments2 from "./Payments2";
import {
  ClockCircleOutlined,
  BankOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined 
} from "@ant-design/icons";
const { Step } = Steps;
const { TextArea } = Input;
const Payments = () => {
  const [visible, setVisible] = useState(false);
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
    <Step status="finish" title="Make Payment" icon={<LoadingOutlined />} />
    <Step status="process"  title="Card Infomation" />
    <Step status="wait" title="Done" icon={<SmileOutlined />} />
  </Steps>
  </div>
        <div style={{marginTop:"100px"}}>
          <form>
          <Row>
            <Col span={10} offset={1}>
              <p>
                <Input placeholder="Firt Name" />
              </p>
              <p>
                <Input placeholder="Email Address" />
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
                <Input placeholder="Last Name" />
              </p>
              <p>
                <TextArea placeholder="Address Delivery" rows={5} />
              </p>
              <p>
                <Input placeholder="Mobile Phone" />
              </p>
            </Col>
          </Row>
          <div style={{paddingLeft:"78%"}}>
         <Payments2 />
       </div>
          </form>
        </div>

      
      
        
      
      </Modal>
    </>
  );
};

export default Payments;
