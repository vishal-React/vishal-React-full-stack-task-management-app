import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <>
      <div className="cookMain">
        <div id="cooking">
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div className="bubble" />
          <div id="area">
            <div id="sides">
              <div id="pan" />
              <div id="handle" />
            </div>
            <div id="pancake">
              <div id="pastry" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
