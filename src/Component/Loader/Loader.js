import React from "react";
import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loadMain">
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
  );
};
