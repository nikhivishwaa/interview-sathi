import React from "react";

function Loader({ className = "" }) {
  return <div className={`absolute bg-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>
  <div className="Loader"></div>
  </div>;
}

export default Loader;
