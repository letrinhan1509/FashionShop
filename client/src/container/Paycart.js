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
  message,
  Form,
} from "antd";
import "./Cart";
import Payments from "./Payments";
import axios from "axios";
import { useHistory } from "react-router-dom";
const { Step } = Steps;
const { TextArea } = Input;
const { Content } = Layout;
const { confirm } = Modal;
const outlineInput = {
  border: "none",
  outline: "none",
};

const Paycart = (props) => {
  console.log(props.payCart);
  const [form] = Form.useForm();
  const history = useHistory();
  const pay = (values) => {
    console.log(values);

    const url = "http://127.0.0.1:5000/api/v1/add-order";
    axios
      .post("http://127.0.0.1:5000/api/v1/add-order", values)
      // console.log(values)
      .then(async (res) => {
        if (res.data.status === "success") {
          message.success(`Tạo đơn hàng thành công !`);

          setTimeout(() => {
            history.push("/");
            window.location.reload();
          }, 2000);
        } else {
          message.error("Đặt hàng thất bại");
        }
      })
      .catch((err) => {
        message.error(`Đạt hàng thất bại \n ${err}`);
      });
  };

  const [paycarts, setPaycart] = useState();

  useEffect(() => {
    localStorage.setItem(...["cart", JSON.stringify(props.cart)]);
  }, [props.cart]);

  const user = JSON.parse(localStorage.getItem("user"));

  // console.log(props.payCart);
  const [visible, setVisible] = useState(false);

  const [isCitizen, setisCitizen] = useState(false);
  const handleFormSubmit = () => {
		form.validateFields()
			.then((values) => {
				// Submit values
				// submitValues(values);
			})
			.catch((errorInfo) => {});
	};
  return (
    <>
      <Button
        style={{ height: "40px" }}
        type="primary"
        onClick={() => setVisible(true)}
      >
        Xác nhận
      </Button>
      <Modal
        title="Payments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        okText={<Payments />}
      >
        <div></div>
        <div style={{ marginTop: "100px" }}>
          {props.payCart.map((item) => (
            <>
              <Form onFinish={pay}
                initialValues={{
                  masp:`${item.masp}`,
                  soluong:`${item.qty}`,
                  gia:`${item.qty * item.gia.toFixed(2) }`
                }}>
                <p>
                  <Form.Item name="userId">
                    <Input name="userId" defaultValue="okk" />
                  </Form.Item>
                  <div
                    style={{
                  /* border: "1px solid black" */ maxWidth: "100%",
                      height: 300,
                      overflow: "scroll",
                      fontWeight: "bold",
                    }}
                  >
                    <Form.Item label="Mã sản phẩm" name="masp">
                      <Input
                        defaultValue={item.masp}
                      />
                    </Form.Item>
                    <Form.Item label="Số lượng" name="soluong">
                      <Input
                        defaultValue={item.qty}
                      />
                    </Form.Item>
                    <Form.Item label="Giá" name="gia">
                      <Input defaultValue={item.qty * item.gia.toFixed(2)}
                      />
                    </Form.Item>
              </div>
            </p>
           
           
              {/* <div style={{ paddingLeft: "78%" }}>
            <Payments  />
            </div> */}
                <Form.Item>
                  <Button type="primary" onClick={pay} htmlType="submit">
                Xác nhận
            </Button>
            </Form.Item>
            </Form>
            </>
                )

                )}
              {/*   <Button onSubmit={handleFormSubmit} ></ */}
               
        </div>
      </Modal>
    </>
  );
};

export default Paycart;
