import React from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css"

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
      </>
   );
};
