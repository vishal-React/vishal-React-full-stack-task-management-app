import React, { useEffect, useState } from "react";
import "./Marquee.css";
const Marquee = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Dynamically change width and height based on screen size
  const isSmallScreen = screenWidth < 768; 

  const style = {
    "--width": isSmallScreen ? "70px" : "100px", 
    "--height": isSmallScreen ? "70px" : "100px",
    "--quantity": "10",
  };
  return (
    <>
      {/* mobile size  */}
      <div className="sliderFood" style={style}>
        <div className="listss">
          <div className="foodIcon" style={{ "--position": 1 }}>
            <img src="/asset/pizza.png" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 2 }}>
            <img src="/asset/fries.png" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 3 }}>
            <img src="/asset/cake.jpg" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 4 }}>
            <img src="/asset/burg.avif" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 5 }}>
            <img src="/asset/combo.png" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 6 }}>
            <img src="/asset/pizza.png" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 7 }}>
            <img src="/asset/fries.png" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 8 }}>
            <img src="/asset/cake.jpg" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 9 }}>
            <img src="/asset/burg.avif" alt="" />
          </div>
          <div className="foodIcon" style={{ "--position": 10 }}>
            <img src="/asset/combo.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Marquee;
