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
    axios.get("http://127.0.0.1:5000/api/v1/product").then((res) => {
      setListProductHome(res.data.data);
    });
  }, []);
  ////console.log(ListProductHome)
  ///User
useEffect (()=>{
  axios.get("http://127.0.0.1:5000/api/v1/user").then((res)=>{
    setListUser(res.data.data);
  })
},[]);
//Admin
useEffect(() => {
 axios.get("http://127.0.0.1:5000/api/v1/admin").then((res)=>{
   setListAdmin(res.data.data);
 })
}, []);
  
/* arry.map(function(name){
  name.forEach(function(item){
    var myJsonString = JSON.stringify(item);
    console.log(myJsonString)
  })
}) */
console.log(ListAdmin)
console.log(ListUser)
console.log(ListProductHome)
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
                  <ListUserAdmin ListAdmin={ListAdmin}   />
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
