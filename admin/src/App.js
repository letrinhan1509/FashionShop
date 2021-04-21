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

function App() {
  const [ListProductHome, setListProductHome] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [ListAdmin, setListAdmin] = useState([]);
  const [load, setLoad] = useState(0);  ///Product
  useEffect(() => {
    axios.get("http://localhost:3001/san-pham/api/product").then((res) => {
      setListProductHome(res.data);
    });
  }, []);
  console.log(ListProductHome)
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
const handleCreateUser = () => {
     //let key =0;
    setLoad(load +1)
    
};
console.log(ListAdmin)
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
