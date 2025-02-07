import React, { useContext } from "react";
import { RecipesContext } from "../../RecipesContext";

const Slider = () => {
  const { recipes } = useContext(RecipesContext);
  let slidearr = recipes.slice(5).filter((elm) => elm);
  slidearr.length = 5;

  return (
    <>
      {slidearr.length > 0 && (
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          {/* Carousel Indicators 5*/}
          <div className="carousel-indicators">
            {slidearr.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel Inner */}
          <div className="carousel-inner">
            {slidearr.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="2500"
              >
                <img
                  src={item.urls.full}
                  className="d-block w-100"
                  alt={item.alt_description || "Slide image"}
                  style={{ height: "93vh", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{item.alt_description}</h5>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Slider;
