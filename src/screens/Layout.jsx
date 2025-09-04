import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ element }) {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        {element}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
