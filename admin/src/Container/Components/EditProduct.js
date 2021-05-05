import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditProduct = () => {
    const masp = window.localStorage.getItem("masp");
    console.log(masp);
    const [product, setProduct] = useState([]);
    useEffect(()=>{
      /*   axios.get */

    })

    return (
        <div>
            
        </div>
    );
}

export default EditProduct;
