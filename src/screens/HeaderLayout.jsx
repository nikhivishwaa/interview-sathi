import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function HeaderLayout({ element }) {
  return (
    <>
      <div className="min-h-screen bg-amber-300">
        <Header />
        {element}
      </div>
    </>
  );
}

export default HeaderLayout;
