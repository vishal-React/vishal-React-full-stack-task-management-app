import React, { useContext, useState } from "react";
import { RecipesContext } from "../../RecipesContext";

const Slider = () => {
  const { recipes } = useContext(RecipesContext);
  let slidearr = recipes
    .slice(0, recipes.length - 2)
    .slice(5)
    .filter((elm) => elm);

  return (
    <>
      {slidearr.length > 0 ? (
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-pause="false"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active " data-bs-interval="3000">
              <img
                src={slidearr[0].urls.full}
                className="d-block w-100 "
                alt="..."
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slidearr[0].alt_description}</h5>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src={slidearr[1].urls.full}
                className="d-block w-100"
                alt="..."
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slidearr[1].alt_description}</h5>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src={slidearr[2].urls.full}
                className="d-block w-100"
                alt="..."
                style={{ maxHeight: "550px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{slidearr[2].alt_description}</h5>
              </div>
            </div>
          </div>
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
      ) : (
        ""
      )}
    </>
  );
};

export default Slider;
