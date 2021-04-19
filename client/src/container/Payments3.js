import React, { useState } from "react";
import { Row, Col, Checkbox, Modal, Button, Timeline, Input,Progress } from "antd";
import Payments2 from "./Payments2";
import {
  ClockCircleOutlined,
  BankOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import Payments from './Payments'
const { TextArea } = Input;
const Payments3 = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
    
      <Button type="primary" onClick={() => setVisible(true)}>
        Confirm
      </Button>
     
      <Modal
        title="Payments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      
        
      >
        <Timeline>
          <Timeline.Item
            
          >
            Select Payment Method
          </Timeline.Item>
          <Timeline.Item>
            Credit Cart Infomation
          </Timeline.Item>
          <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />}
            color="red">Successfully</Timeline.Item>
        
        </Timeline>
        <div style={{textAlign:"center"}}>
          <h1 style={{fontSize:"36px"}}>Successfully!</h1>
        <Progress type="circle" percent={100} />
        </div>
        
      </Modal>
    </>
  );
};

export default Payments3;
