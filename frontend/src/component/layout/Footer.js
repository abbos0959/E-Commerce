import React from "react";
import AppStore from "../../images/Appstore.png";
import playerStore from "../../images/playstore.png";
import "./Footer.css"

export const Footer = () => {
   return (
      <footer id="footer">
         <div className="leftFooter">
            <h4> Download  Our App</h4>
            <p>Download App for Android and Ios mobile Phone</p>
            <img src={AppStore} />
            <img src={playerStore} />
         </div>
         <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>ABBOS AKROMOVICH</p>
         </div>
         <div className="rightFooter">
            <h4>Follow us</h4>
            <a href=""> Telegram</a>
            <a href=""> Instagram</a>
            <a href="http://youtube.com"> Youtube</a>
         </div>
      </footer>
   );
};
