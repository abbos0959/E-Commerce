import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";

export const Header = () => {
   return (
      <ReactNavbar
         logo={logo}
         burgerColorHover="#eb4034"
         navColor1="white"
         logoWidth="20vmax"
         logoHoverSize="10px"
         logoHoverColor="10px"
         link1Text="Home"
         link2Text="Product"
         link3Text="Contact"
         link4Text="About"
         link1Url="/"
         link2Url="/product"
         link3Url="/contact"
         link4Url="/about"
         link1Size="1.3vmax"
         link1Color="rgba(35,35,35,0.8)"
         nav1justifyContent="flex-end"
         nav2justifyContent="flex-end"
         nav3justifyContent="flex-start"
         nav4justifyContent="flex-start"
         link1ColorHover="#eb4034"
         link1Margin="1vmax"
         //  profileIcon="false"
         //  lik2Margin="300px"
         profileIconColor="rgba(35,35,35,0.8)"
         searchIconColor="rgba(35,35,35,0.8)"
         cartIconColor="rgba(35,35,35,0.8)"
         profileIconColorHover="#eb4034"
         searchIconColorHover="#eb4034"
         cartIconColorHover="#eb4034"
         cartIconMargin="1vmax"
      />
   );
};
