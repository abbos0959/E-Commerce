import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css"
import { Product } from "./Product";

const product={
  name:"Blue Shortik",
  images:[{url:""}],
  price:"300$",
  _id:"abbos"
}

export const Home = () => {
   return (
      <>
         <div className="banner">
            <p>Welcome To ECOMMERCE</p>
            <h1>FIND AMAZING PRODUCTS BELONG</h1>
            <a href="#container">
               <button>
                  Scroll <CgMouse />
               </button>
            </a>
         </div>
         <h2 className="homeHeading"> Featured Product</h2>
         <div className="container" id="container">

          <Product product={product}/>
         </div>
      </>
   );
};
