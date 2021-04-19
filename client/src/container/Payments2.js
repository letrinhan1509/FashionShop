import React, { useState } from "react";
import {
  Row,
  Col,
  Checkbox,
  Modal,
  Button,
  Timeline,
  Input,
  Space,
  BackTop,
} from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Payments3 from './Payments3';
import Payments from './Payments';


const { TextArea } = Input;

const Payments2 = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [focus, setFocus] = useState("");

  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button style={{outline:"none"}} type="primary" onClick={() => setVisible(true)}>
        Go To Payments
      </Button>
      <Modal
        title="Payments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
       cancelText="Back"
       okText={<Payments3/>}
        width={1000}
      
        /* cancelText={<Payments/>}
        okText={<Payments3/>} */
      >
           <Timeline>
          <Timeline.Item
            
          >
            Select Payment Method
          </Timeline.Item>
          <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />}
            color="red">
            Credit Cart Infomation
          </Timeline.Item>
          <Timeline.Item>Successfully</Timeline.Item>
        
        </Timeline>
        <form>
          <Row>
            <Col span={12}>
              <Card
                cvv={cvv}
                expiry={expiry}
                forcused={focus}
                name={name}
                number={number}
              />
            </Col>
            <Col span={12}>
              <p>
              <Input
                type="tel"
                name="number"
                value={number}
                placeholder="Enter Number"
                onChange={(e) => setNumber(e.target.value)}
                onFocus={(e) => setFocus(e.target.number)}
              />
              </p>
              <p>
              <Input
                type="tel"
                name="name"
                value={name}
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocus(e.target.name)}
              />
              </p>
              <p>
                
              </p>
              <Space>
                <Input
                  type="tel"
                  name="expiry"
                  value={expiry}
                  placeholder="Expiry"
                  onChange={(e) => setExpiry(e.target.value)}
                  onFocus={(e) => setFocus(e.target.expiry)}
                />

                <Input
                  type="tel"
                  name="cvv"
                  value={cvv}
                  placeholder="CVV"
                  onChange={(e) => setCvv(e.target.value)}
                  onFocus={(e) => setFocus(e.target.cvv)}
                />
              </Space>
              <p><Checkbox>Save this credir card</Checkbox></p>
        
            </Col>
            
          
          
          </Row>
          
        </form>

      </Modal>
    </>
  );
};

export default Payments2;
