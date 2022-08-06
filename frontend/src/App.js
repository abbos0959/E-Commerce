import React, { useEffect } from "react";
import { Header } from "./component/layout/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { Footer } from "./component/layout/Footer";

function App() {
   useEffect(() => {
      WebFont.load({
         google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
      });
   }, []);
   return (
      <BrowserRouter>
         <Header />
         <Footer />
      </BrowserRouter>
   );
}

export default App;
