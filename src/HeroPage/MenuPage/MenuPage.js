import React, { useContext } from "react";
import "./MenuPage.css";
import toast from "react-hot-toast";
import { useCart } from "../../CartContext";
import { RecipesContext } from "../../RecipesContext";

const MenuPage = () => {
  const { addToCart } = useCart();
  const { filteredRecipes, loading, setPage } = useContext(RecipesContext);

  // passing items data to cart
  const handleCart = (recipe, price) => {
    toast.success("Item added to cart!");
    addToCart(recipe, price);
  };

  const arr = [150, 240, 199, 300, 170, 99, 200, 176, 169, 233];

  const handlePagination = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      {loading ? (
        <h3 className="loader">Loading...</h3>
      ) : (
        <div className="cardsF" id="menuss">
          {filteredRecipes.map((recipe, i) => (
            <div key={recipe.id} className="card" style={{ width: "18rem" }}>
              <img
                src={recipe.urls.full}
                className="card-img-top cardImage"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title pElp ">{recipe.alt_description}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title
                </p>
                <div className="two-colum">
                  {/* ADD TO CART */}
                  <button
                    className="cartBtn"
                    onClick={() => handleCart(recipe, arr[i % arr.length])}
                  >
                    <svg
                      className="cart"
                      fill="white"
                      viewBox="0 0 576 512"
                      height="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                    </svg>
                    ADD TO CART
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                      className="product"
                    >
                      <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3L628.5 127.4c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
                    </svg>
                  </button>
                  <p>Price: ₹ {arr[i % arr.length]}</p>
                </div>
              </div>
            </div>
          ))}
          {/* load more */}
          {!loading && (
            <button onClick={handlePagination} className="load-more-btn">
              <span>Load More</span>
            </button>
          )}
          {loading && <p>Loading more...</p>}
        </div>
      )}
    </>
  );
};

export default MenuPage;
