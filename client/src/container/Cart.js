import { Col, Layout, Row, Breadcrumb, Card } from "antd";
import React, { useState, useEffect } from 'react';
import "../container/components-css/ProductDetail.scss"
import "../components/Select_Product"
import SelectProduct from "../components/Select_Product";
import axios from 'axios';
import { useParams } from "react-router";
import Payments from "./Payments";
const { Content } = Layout;

const Cart = (props) => {
    const { id } = useParams();
    console.log(id);
    const [ListProductHome, setListProductHome] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/san-pham/api/product'
        ).then(res => { setListProductHome(res.data) })
    }, []);
    const menuItems = [
        {
            key: "1",
            img: "iconGray.jpg",
            name: "IconGray",
            costNew: "$100,00",
            costOld: "$200,00"
        },
        {
            key: "2",
            img: "lacoste.jpg",
            name: "Lacoste",
            costNew: "$200,00",
            costOld: "$250,00"
        },
        {
            key: "3",
            img: "mlbNY.jpg",
            name: "mlbNY",
            costNew: "$200,00",
            costOld: "$340,00"
        },
        {
            key: "4",
            img: "pumathunder.jpg",
            name: "Pumathunder",
            costNew: "$300,00",
            costOld: "$450,00"
        },
    ];
    let item = [];
    item = ListProductHome.filter(
        ListProductHome => ListProductHome.masp == id

    )
    return (
        <Content >
        <Payments />

    </Content>
    );
}

export default Cart;
