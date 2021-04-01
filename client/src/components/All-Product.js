import React from 'react';
import './components-css/Allproduct.scss';

const Allproduct = () =>{
    return(
            <main>
                <div className="banner__left">
                    <div className="banner__left__title">
                        <p>Clothes Designer</p>
                    </div>
                    <div className="banner__left__text">
                        <h2 className="title">All Clothes</h2>
                        <p className="description">
                        Collection of youth elongated T-shirts with cuffs on the sleeves. Style that will give you confidence in a big city.
                        </p>
                    </div>
                </div>
                <div className="list__product">
                    <div className="list__product__item">
                        <div className="card">
                            <div className="card__content">
                               <img src="./images/hoodie.png"></img>
                            </div>
                            <div className="title_item">
                                <p>Hoodie</p>
                                <img src="./images/icon/arrow-left.png"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    );
}
export default Allproduct;