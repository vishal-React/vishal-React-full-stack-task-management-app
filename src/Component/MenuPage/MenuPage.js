import React, { useContext, useRef } from "react";
import "./MenuPage.css";
import toast from "react-hot-toast";
import { useCart } from "../../CartContext";
import { RecipesContext } from "../../RecipesContext";

const MenuPage = () => {
  const { addToCart } = useCart();
  const loadMoreRef = useRef(null);
  const { loading, setPage, recipes } = useContext(RecipesContext);

  // Passing items data to cart
  const handleCart = (recipe, price) => {
    toast.success("Item added to cart!");
    addToCart(recipe, price);
  };

  // price
  const arr = [150, 240, 199, 300, 170, 99, 200, 176, 169, 233];

  // load more
  const handlePagination = () => {
    if (loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    setTimeout(() => {
      setPage((prev) => prev + 1);
    }, 500);
  };

  return (
    <>
      {loading ? (
        // Skeleton loading structure
        <div className="cardsF" id="menuss">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="card skeleton-card">
              <div className="card-img skeleton-img"></div>
              <div className="card-body">
                <h5 className="card-title skeleton-text">&nbsp;</h5>
                <p className="card-text skeleton-text"></p>
                <div className="two-colum">
                  <div className="skeleton-btn"></div>
                  <div className="skeleton-btn"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="cardsF" id="menuss">
            {recipes.map((recipe, i) => (
              <div key={recipe.id} className="card">
                <img
                  src={recipe.urls.full}
                  className="card-img-top cardImage"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title pElp ">{recipe.alt_description}</h5>
                  <p className="card-text">
                  Fresh ingredients always make a dish taste delicious.
                  </p>
                  <div className="two-colum">
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
                    </button>
                    <div>
                      <p>Price: ₹ {arr[i % arr.length]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Load More */}
          {!loading && (
            <div className="loadCenter" ref={loadMoreRef}>
              <button onClick={handlePagination} className="load-more-btn">
                <span>Load More</span>
              </button>
            </div>
          )}
          {loading && <p>Loading more...</p>}
        </>
      )}
    </>
  );
};

export default MenuPage;
