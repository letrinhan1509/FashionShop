//import logo from './logo.svg';
import "./App.css";
import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { Layout, Modal } from "antd";
import HeaderPage from "./components/include/HeaderPage";
import { Content } from "antd/lib/layout/layout";
import ProductDetail from "./container/Product-detail";
import Home from "./container/Home";
import Footer from "./components/include/Footer";
import Register from "./container/Register";
import Login from "./container/Login";
import Cart from "./container/Cart";
import Contact from "./container/Contact";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Shirt from "./container/Shirt";
import {storage} from "./container/firebase"
//import AllProduct from './container/All-Product';
import UserInfo from "./container/UserInfo";
import Backpack from "./container/Backpack";
import Shoes from "./container/Shoes";
import Accessories from "./container/Acessories";


function App() {



  const [ListProductHome, setListProductHome] = useState([]);
  const { confirm } = Modal;
  useEffect(() => {
    axios.get("http://localhost:3001/san-pham/api/product").then((res) => {
      setListProductHome(res.data);
    });
  }, []);
  const ak = ListProductHome.filter(ListProductHome => ListProductHome.maloai === "ak" || ListProductHome.maloai === "asm" || ListProductHome.maloai === "at");
  let Ao = [];
  Ao = ak;
  const bl = ListProductHome.filter(ListProductHome => ListProductHome.maloai === "bl");
  let Balo = [];
  Balo = bl;
  const giay = ListProductHome.filter(ListProductHome => ListProductHome.maloai === "giay");
  let Giay = [];
  Giay = giay;
  const pk = ListProductHome.filter(ListProductHome => ListProductHome.maloai === "no" || ListProductHome.maloai === "tl" || ListProductHome.maloai === "vo");
  let Phukien = [];
  Phukien = pk;
  
  

  const shuffled = ListProductHome.sort(() => 0.5 - Math.random());
  const randomItem = shuffled.slice(0, 4);


  const storageItem = JSON.parse(localStorage.getItem("cart") || "[]");
  const [cart, setCart] = useState(storageItem);

  const addCart = (productItem) => {
    const exist = cart.find((x) => x.masp === productItem.masp);
    if (exist) {
      setCart(
        cart.map((x) => x.masp === productItem.masp ? { ...exist, qty: exist.qty + 1 } : x)
      );
    } else {
      setCart([...cart, { ...productItem, qty: 1 }]);
    }
  };
  const removeCart = (productItem) => {
    const exist = cart.find((x) => x.masp === productItem.masp);
    if (exist.qty === 1) {
      showDeleteProduct(productItem);
    } else {
      setCart(
        cart.map((x) => x.masp === productItem.masp ? { ...exist, qty: exist.qty - 1 } : x)
      );
    }
  };
  function showDeleteProduct(productItem) {
    confirm({
      title: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        setCart(
          cart.filter((x) => x.masp !== productItem.masp)
        );

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function Thongbao_Them(productItem) {
    
    const exist = cart.find((x) => x.masp === productItem.masp);
    if (exist) {
      setCart(
        cart.map((x) => x.masp === productItem.masp ? { ...exist, qty: exist.qty + 1 } : x)
      );
      Modal.success({
        content: 'Bạn đã thêm 1 sản phẩm vào giỏ hàng !',
      });
    } else {
      setCart([...cart, { ...productItem, qty: 1 }]);
      Modal.success({
        content: 'Bạn đã thêm 1 sản phẩm vào giỏ hàng !',
      });
    }
  }

  const removeProduct = (productItem) => {
    setCart(
      cart.filter((x) => x.masp !== productItem.masp)
    );
  };

  const sumPrice = cart.reduce((a, c) => a + c.gia * c.qty, 0);



  //Firebase get image
  const [link, setLink] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      let i = 0;
      let storageRef = storage.ref();
      let starsRef = await storageRef.child('img_product/').listAll();
      let urlPromises = starsRef.items.map(imageRef => imageRef.getDownloadURL());
      /* starsRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
          i++;
          displayImage(i, imageRef)
        })
      })
      let result = await storageRef.child('images').listAll();
      let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL()); */

      return Promise.all(urlPromises);

    }
    /* function displayImage(row, images) {
      images.getDownloadURL().then(function (url) {

      })
    } */
    const loadImages = async () => {
      const urls = await fetchImages();
      setLink(urls);
    }
    loadImages();
  }, []);




  return (
    <Router>
      <Layout>
        <HeaderPage ListProductHome={ListProductHome} CountCart={cart.length} PriceCart={sumPrice}/>
        <Content className="content-wrapper">
          <Route exact path="/">
            <Home ListProductHome={ListProductHome} link={link} cart={cart} addCart={addCart} Thongbao_Them={Thongbao_Them}/>
          </Route>
          <Route exact path="/ProductDetail/:id">
            <ProductDetail
              initRelatedItems={randomItem}
              ListProductHome={ListProductHome}
              addCart={addCart}
            />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Ao">
            <Shirt ListProductHome={ListProductHome} countAo = {Ao.length} link={link} Ao={Ao} Balo={Balo} />
          </Route>
          <Route path="/bl">
            <Backpack ListProductHome={ListProductHome} countBalo = {Balo.length} link={link} Balo={Balo}/>
          </Route>
          <Route path="/giay">
            <Shoes ListProductHome={ListProductHome} countGiay = {Giay.length} link={link} Giay={Giay}/>
          </Route>
          <Route path="/pk">
            <Accessories ListProductHome={ListProductHome} countPhukien = {Phukien.length} link={link} Phukien={Phukien}/>
            
          </Route>
          <Route path="/UserInfo">
            <UserInfo />
          </Route>
          <Route path="/cart">
            <Cart cart={cart} CountCart={cart.length} addCart={addCart} removeCart={removeCart} removeProduct={removeProduct} PriceCart={sumPrice}/>
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
