//import logo from './logo.svg';
import './App.css';
import "antd/dist/antd.css";
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from "antd";
import HeaderPage from './components/include/HeaderPage';
import { Content } from 'antd/lib/layout/layout';
import ProductDetail from "./container/Product-detail";
import Home from "./container/Home";
import Footer from "./components/include/Footer";
import Register from "./container/Register";
import Login from "./container/Login";
import Contact from "./container/Contact";
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AllProduct from './container/All-Product';

function App() {
  const [ListProductHome, setListProductHome] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/san-pham/api/product'
    ).then(res => {
      setListProductHome(res.data)
    })
  }, []);
  const shuffled = ListProductHome.sort(() => 0.5 - Math.random());
  const randomItem = shuffled.slice(0, 4);
  return (
    <Router>
      <Layout>
        <HeaderPage />
        <Content className="content-wrapper">
          <Route exact path="/">
            <Home ListProductHome={ListProductHome} />
          </Route>
          <Route exact path="/ProductDetail/:id">
            <ProductDetail initRelatedItems={randomItem} ListProductHome={ListProductHome} />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
