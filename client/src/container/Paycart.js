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
  message,Form
  
} from "antd";
import Payments2 from "./Payments2";
import {
  BankOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
LoadingOutlined, SmileOutlined 
} from "@ant-design/icons";
import "./Cart";
import Payments3 from './Payments3'
import Payments from './Payments'
import axios from "axios";
import { useHistory } from "react-router-dom";
const { Step } = Steps;
const { TextArea } = Input;
const { Content } = Layout;
const { confirm } = Modal;

const outlineInput ={
  border:"none",
  outline:"none"
}



const Paycart = (props) => {
  const history = useHistory();
  
  const pay = (values) => {
    console.log(values)
    const url = "http://localhost:3001/users/api/payment";
    axios
        .post(url, values)
        .then(async (res) => {
            if (res.data.status === "success") {
               
                message.success(`Xin chào, ${res.data.data.username}`)
                console.log(res.data.data.username)
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data.data))
                setTimeout(() => {
                    history.push("/")
                    window.location.reload()
                }, 2000)
            }
            else {
                message.error('Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng !')
            }
        })
        .catch((err) => {
            message.error(`Đạt hàng thất bại, vui lòng đăng nhập để đặt hàng ! \n ${err}`)
        })
}
  
  useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]);

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(props.payCart);
  const [visible, setVisible] = useState(false);

  const [isCitizen, setisCitizen] = useState(false)
  const onChange = e =>{
    setisCitizen(e.target.checked)
  }
  
  /* const userlog = localStorage.getItem() */
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Xác nhận
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
        
        </div>
        <div style={{ marginTop: "100px" }}>
          <Form onFinish={pay}>
            <p>
              <div style={{ /* border: "1px solid black" */ maxWidth: "100%", height: 300, overflow:"scroll",fontWeight:"bold" }}>
                {props.payCart.map((item) => (
                  <div>
       
                    <Input style={outlineInput} value={item.tensp} prefix="Tên SP :" />
                    <Input style={outlineInput} value={item.qty} prefix="SL : "/>
                    <Input style={outlineInput} value={item.qty * item.gia.toFixed(2)} prefix="Giá : "/>
          
                    <Divider/>
                  </div>
                ))}
              </div>
            </p>
            <div style={{ paddingLeft: "78%" }}>
                 
            <h1>{isCitizen ? <Payments2 /> : <Payments3 />}</h1>
         
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Paycart;
