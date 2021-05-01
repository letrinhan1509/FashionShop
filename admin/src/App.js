import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Layout from "antd/lib/layout/layout";
import { Content } from 'antd/lib/layout/layout';
import { Col, Row, Image } from "antd";
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
import { storage } from "./Container/Components/firebase/firebase";
function App() {
  const [ListProductHome, setListProductHome] = useState([]);
  const [ListNameImg, setListNameImg] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [ListAdmin, setListAdmin] = useState([]);
  const [load, setLoad] = useState(0);  ///Product
  const handleCreateUser = () => {
    let a = 0;
    a = a + 1;
    setLoad(a);
    console.log(load);
  };
  /*   useEffect(() => {
      axios.get("http://127.0.0.1:5000/api/v1/product").then((res) => {
        setListProductHome(res.data.data);
       
      });
    }, []); */
  /* useEffect (()=>{
    axios.get("http://127.0.0.1:5000/api/v1/user").then((res)=>{
      setListUser(res.data.data);
    })
  },[]); */
  //Admin
  /* useEffect(() => {
   axios.get("http://127.0.0.1:5000/api/v1/admin").then((res)=>{
     setListAdmin(res.data.data);
   })
  }, []); */
  //tai hinh
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/v1/img").then((res) => {
      let temp = [];
      temp = res.data.data;
      setListNameImg(res.data.data)

    })
  }, [])
  /* for (let index = 0; index < ListNameImg.length; index++) {
    const element = ListNameImg[index]
    console.log(element);
  } */
  let i = 0;
  let storageRef = storage.ref();
  var gsReference = storage.refFromURL('gs://fashionshop-11d42.appspot.com/img_product/adidas.jpg');
  let starsRef = storageRef.child('img_product/');
  starsRef.listAll().then(function (result) {
    result.items.forEach(function (imageRef) {
      i++;
      displayImage(i, imageRef)
    })
  })
const [links, setLinks]= useState([])
  function displayImage(row, images) {
    images.getDownloadURL().then(function (url) {
      console.log(url);
      /* console.log(link) */
    })
  }

//console.log(a);
console.log(links);

  //console.log(ListNameImg)
  /* console.log(ListProductHome[0]) */
  return (
    <>
      <Router>
        <Layout>
          <HeaderPage />
          <Row >
            <Col>
              <Navigation ListProductHome={ListProductHome} />
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
                  <AddProduct />
                </Route>
                <Route path="/Danhsachkhachhang">
                  <ListUserKH ListUser={ListUser} />
                </Route>
                <Route path="/DanhsachAdmin">
                  <ListUserAdmin ListAdmin={ListAdmin} />
                </Route>
                <Route path="/Themnhanvien">
                  <AddNV handleCreateUser={handleCreateUser} />
                </Route>
                <Route path="/Login">
                  <Login />
                </Route>
               {/*  {link.forEach((item)=>{
                  console.log(item)
                  return(
                    <Image
                    width={200}
                    src={{item}}
                  />
                  )
                
                })} */}
                
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
