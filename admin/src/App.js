import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Layout from "antd/lib/layout/layout";
import { Content } from 'antd/lib/layout/layout';
import { Col, Row } from "antd";
import axios from "axios";
import HeaderPage from "./Container/Header";
import Home from "./Container/Home";
import Navigation from "./Container/Navigation";
import Footer from "./Container/Footer";
import AllProduct from "./Container/Components/AllProduct";
import AddProduct from "./Container/Components/AddProduct";
import ListUserKH from "./Container/Components/ListUserKH";
import ListUserAdmin from "./Container/Components/ListUserAdmin";
import AddNV from "./Container/Components/AddNV";
import Login from "./Container/Login";

function App() {
  const [ListProductHome, setListProductHome] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [ListAdmin, setListAdmin] = useState([]);
  const [load, setLoad] = useState(0);  ///Product
  const handleCreateUser = () => {
    let a=0;
    a=a+1;
    setLoad(a);
    console.log(load);
};
  useEffect(() => {
    axios.get("http://localhost:3001/san-pham/api/product").then((res) => {
      setListProductHome(res.data);
    });
  }, []);
  ////console.log(ListProductHome)
  ///User
useEffect (()=>{
  axios.get("http://localhost:3001/users/api/khach-hang").then((res)=>{
    setListUser(res.data);
  })
},[]);
//Admin
useEffect(() => {
 axios.get("http://localhost:3001/users/api/admin").then((res)=>{
   setListAdmin(res.data);
 })
}, [load]);
  const arry={1: {'manv': 1, 'admin': 'admin@gmail.com', 'matkhau': '123456', 'tennv': 'Admin', 'diachi': '155 PNT q8', 'sdt': '098564715', 'mq': 1}, 3: {'manv': 3, 'admin': 'nhhy@gmail.com', 'matkhau': '123456', 'tennv': 'Yen Nhan', 'diachi': '15/2 HHH q1', 'sdt': '098547136', 'mq': 2}, 4: {'manv': 4, 'admin': 'mhth@gmail.com', 'matkhau': '123456', 'tennv': 'Mong Ha Trung Huyen', 'diachi': '11 TTT q11', 'sdt': '0906548444', 'mq': 2}, 5: {'manv': 5, 'admin': 'dhnhan1999@gmail.com', 'matkhau': '123456', 'tennv': 'Quách Trọng Nhân', 'diachi': '196 TVH q9', 'sdt': '098564123', 'mq': 3}, 6: {'manv': 6, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123456', 'tennv': 'Ho Van Cuong', 'diachi': '152 HQL q6', 'sdt': '0965753304', 'mq': 3}, 17: {'manv': 17, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng', 'diachi': 'Tiền Giangc1', 'sdt': '0929192185', 'mq': 1}, 18: {'manv': 18, 'admin': 'nhankaca1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng 4', 'diachi': 'Tiền Giang', 'sdt': '0929192185', 'mq': 1}, 19: {'manv': 19, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng3', 'diachi': '186 Cao lỗ', 'sdt': '0929192185', 'mq': 3}, 20: {'manv': 20, 'admin': 'zznhanzz1999@gmail.com', 'matkhau': '123', 'tennv': 'Quách Trọng Lượng 3434', 'diachi': 'Tiền Giang', 'sdt': '0929192185', 'mq': 1}, 21: {'manv': 21, 'admin': 'nhan1003@gmail.com', 'matkhau': '123', 'tennv': 'cccc', 'diachi': 'Tiền Giang', 'sdt': '0123245753', 'mq': 1}, 22: {'manv': 22, 'admin': 'dhnhan19999@gmail.com', 'matkhau': '123', 'tennv': 'Trương Hải Hoàng Phương', 'diachi': '233 Vĩnh Viễn', 'sdt': '123245753', 'mq': 1}}
/* arry.map(function(name){
  name.forEach(function(item){
    var myJsonString = JSON.stringify(item);
    console.log(myJsonString)
  })
}) */
console.log(arry)
  return (
    <>
      <Router>
        <Layout>
          <HeaderPage />
          <Row >
            <Col>
            <Navigation ListProductHome={ListProductHome}  />
            </Col>
            <Col span={18} push={1} width={'100%'}>
              <Content className="content-wrapper">
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/all">
                  <AllProduct ListProductHome={ListProductHome} />
                </Route>
                <Route path="/Themsanpham">
                  <AddProduct  />
                </Route>
                <Route path="/Danhsachkhachhang">
                  <ListUserKH ListUser={ListUser}   />
                </Route>
                <Route path="/DanhsachAdmin">
                  <ListUserAdmin ListAdmin={arry}   />
                </Route>
                <Route path="/Themnhanvien">
                  <AddNV handleCreateUser= { handleCreateUser } />
                </Route>
                <Route path="/Login">
                  <Login />
                </Route>
              </Content>
            </Col>
          </Row>
             <Footer /> 
        </Layout>
      </Router>
    </>
  );
}
export default App;
