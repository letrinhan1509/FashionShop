//import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";

import { Layout, Col, Row } from "antd";
import React, { useState } from "react";
import Header_page from './components/include/Header_page';
import { Content } from 'antd/lib/layout/layout';
import ProductDetail from "./container/Product-detail";
import Home from "./container/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    
      <Router>
        <Layout>
          <Header_page />
          <Content className="content-wrapper">
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/ProductDetail">
                <ProductDetail />
            </Route>
          </Content>
        </Layout>
      </Router>
   
  );
}

export default App;
