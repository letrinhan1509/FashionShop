import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Layout from "antd/lib/layout/layout";
import { Content } from 'antd/lib/layout/layout';
import { Col, Row, Image } from "antd";
import HeaderPage from "./Container/Header";
import Dashboard from "./Container/Dashboard";
import Navigation from "./Container/Navigation";
import Footer from "./Container/Footer";
import AllProduct from "./Container/Components/AllProduct";
import AddProduct from "./Container/Components/AddProduct";
import ListUserKH from "./Container/Components/ListUserKH";
import ListUserAdmin from "./Container/Components/ListUserAdmin";
import AddNV from "./Container/Components/AddNV";
import Login from "./Container/Login";
import EditNV from "./Container/Components/EditNV";
function App() {



  const [load, setLoad] = useState(0);  ///Product
  const handleCreateUser = () => {
    let a = 0;
    a = a + 1;
    setLoad(a);
    console.log(load);
  };



  //Admin



  return (
    <>
      {localStorage.getItem('user') === null ? (
        <Layout>

          <Content className="content-wrapper">
            <Router>
              <Login />
            </Router>
          </Content>
        </Layout>

      ) : (
        <Router>
          <Layout>
            <HeaderPage />
            <Row >
              <Col>
                <Navigation />
              </Col>
              <Col span={18} push={1} width={'100%'}>
                <Content className="content-wrapper">
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route path="/all">
                    <AllProduct />
                  </Route>
                  <Route path="/Themsanpham">
                    <AddProduct />
                  </Route>
                  <Route path="/Danhsachkhachhang">
                    <ListUserKH />
                  </Route>
                  <Route path="/DanhsachAdmin">
                    <ListUserAdmin />
                  </Route>
                  <Route path="/Themnhanvien">
                    <AddNV handleCreateUser={handleCreateUser} />
                  </Route>
                  <Route path="/Login">
                    <Login />
                  </Route>
                  <Route path="/EditNV">
                    <EditNV />
                  </Route>
                </Content>
              </Col>
            </Row>
            <Footer />
          </Layout>
        </Router>
      )}
    </>
  );
}
export default App;
