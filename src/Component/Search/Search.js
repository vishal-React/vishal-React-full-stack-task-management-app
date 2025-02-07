import React, { useContext, useEffect, useRef, useState } from "react";
import "./Search.css";
import { useCart } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import { RecipesContext } from "../../RecipesContext";
import { useOrderHistory } from "../../OrderHistoryContext";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaChevronLeft,
  FaSearch,
} from "react-icons/fa";

const Search = () => {
  const loadMoreRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef(null);
  const { cart, setCart, updateQuantity, addToCart } = useCart();
  const { setSearchQuery, loading, searchItem, setPages, searchQuery } =
    useContext(RecipesContext);

  const arr = [150, 240, 199, 300, 170, 99, 200, 176, 169, 233];
  const items = ["Pizza", "Burger", "Desserts", "Tacos", "Fries & Snacks"];

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  // Handle item selection from the list
  const handleSelectItem = (item) => {
    setSearchText(item);
    inputRef.current.focus();
  };

  // form submit
  const handleForm = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      setSearchQuery(searchText);
    }
  };

  // Passing items data to cart
  const handleCart = (recipe, price) => {
    toast.success("Item added to cart!");
    addToCart(recipe, price);
  };

  // load more
  const handlePagination = () => {
    if (loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "instant", block: "end" });
    }
    setTimeout(() => {
      setPages((prev) => prev + 1);
    }, 300);
  };
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  // cart badges count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const { addOrder } = useOrderHistory();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // cart slider
  const handleCartSlider = () => {
    setSidebarOpen(true);
    setTimeout(() => {
      sidebarRef.current?.focus();
    }, 0);
  };

  // switch cart slidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  // delete cart item
  const handleDelete = (id) => {
    toast("Item removed from cart!", {
      icon: "🗑️",
    });
    const updatedCart = cart.filter((elm) => elm.id !== id);
    setCart(updatedCart);
  };
  // incre cart item
  const handleIncre = (id) => {
    updateQuantity(id, 1);
  };
  // decre cart item
  const handleDecre = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, -1);
    }
  };
  // total price
  const calculateTotalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // passing data to History Component
  const handleHistory = () => {
    toast.success("Thank you! Your order is confirmed.");
    const orderData = {
      orderId: Date.now(),
      orderDate: new Date().toLocaleString(),
      items: cart,
      calculateTotalPrice,
    };
    addOrder(orderData);
  };
  return (
    <>
      {/* search box  */}
      <form onSubmit={handleForm}>
        <nav className="navbars" style={{ position: "fixed" }}>
          <div className="input-group ">
            <span className="input-group-text cursor" onClick={handleBack}>
              <FaChevronLeft />
            </span>

            <input
              type="text"
              className="form-control"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search something"
              spellCheck="false"
              ref={inputRef}
            />
            <button className="input-group-text searchIcon cursor">
              <FaSearch />
            </button>

            <span
              className="input-group-text cursor"
              onClick={handleCartSlider}
            >
              <div className={`cart-container`}>
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </div>
            </span>
          </div>
        </nav>
      </form>

      {/* Sidebar */}
      <div
        className={`sidebar ${sidebarOpen ? "open" : ""}`}
        ref={sidebarRef}
        tabIndex="0"
        onBlur={closeSidebar}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cartTwo">
          <h2>Your Cart</h2>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setSidebarOpen(false)}
          ></button>
        </div>
        {cart.length === 0 ? (
          <div className="cartSvgCenter">
            <div>
              {/* cart svg  */}
              <svg
                className="cartSvg"
                version="1.1"
                id="shopping_x5F_carts_1_"
                xmlns="http://www.w3.org/2000/svg"
                x={0}
                y={0}
                viewBox="0 0 128 128"
                style={{ enableBackground: "new 0 0 128 128" }}
                xmlSpace="preserve"
              >
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      ".st0{display:none}.st1{display:inline}.st2{fill:#020202}",
                  }}
                />
                <g id="_x34__1_">
                  <path
                    className="st2"
                    d="M45.3 81.2h78V43.7L35.9 25.4l-3.1-12.9-12.6-4.2c0-.2.1-.3.1-.5 0-4.3-3.5-7.8-7.8-7.8S4.7 3.5 4.7 7.8s3.5 7.8 7.8 7.8c1.8 0 3.4-.6 4.7-1.6l9.4 4.7L39 78l-12.5 9.4V103l5.7 7.1c-1.6 1.9-2.5 4.3-2.5 7 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9c-.9 0-1.8.1-2.6.3l-2.1-3.4h65.6l3.6 6c-2.2 2-3.6 4.9-3.6 8.1 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9h-.3l-1.3-3.1h12.5V97H32.8v-6.2l12.5-9.6zm0-6.3-4.6-21.4.6 3L59.8 58l3.8 17H45.3zm21.8 0-3.7-16.7 18.1 1.4 1.4 15.3H67.1zm18.8 0-1.4-15 17 1.3v13.7H85.9zm31.2-15.6v15.6h-12.5V61.5l12.5 1v-3.2l-12.5-1V44.4l12.5 2.4v12.5zM35.9 31.2l65.6 12.6V58l-17.3-1.4-1.5-16.4-3.1-.6 1.6 16.8-18.5-1.5-4.3-19.3-3.7-.7 4.4 19.7-18.5-1.5-4.7-21.9zm76.5 81.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7zm-71.8 0c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z"
                    id="icon_11_"
                  />
                </g>
              </svg>
              <h5>Your cart is currently empty.</h5>
            </div>
          </div>
        ) : (
          <ul className="cartUl">
            {cart.map((item, index) => (
              <li key={index} className="cartList">
                <div className="cartFlex">
                  <img
                    className="cartImg"
                    src={item.urls.thumb}
                    alt={item.alt_description}
                    style={{ height: "100px" }}
                  />
                  <div className="paddings">
                    <p className="card-title pElp">{item.alt_description}</p>
                    <p>Price: ₹ {item.price}</p>
                    <div className="addingFlex">
                      <MdDelete
                        onClick={() => handleDelete(item.id)}
                        className="delete"
                      />
                      <div className="addingFlex green">
                        <FaMinus
                          className="ico"
                          onClick={() => handleDecre(item.id, item.quantity)}
                        />
                        <div className="icons">{item.quantity}</div>
                        <FaPlus
                          className="ico"
                          onClick={() => handleIncre(item.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="end">
            <h5>Total Item: {cart.length}</h5>
            <h5>Total Quantity: {cartCount}</h5>
            <h5>Total Price: ₹ {calculateTotalPrice}</h5>
            <div className="alincenter">
              <button className="cartBtn" onClick={handleHistory}>
                <svg
                  className="cart"
                  fill="white"
                  viewBox="0 0 576 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
                Place An Order
              </button>
            </div>
          </div>
        )}
      </div>

      {/* manual list */}
      <div className="itemsList">
        {!searchText && (
          <>
            <h5>Search Food Item </h5>
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className="item"
                  onClick={() => handleSelectItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {loading ? (
        // Skeleton loading structure
        <div className="cardsF" id="menuss">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="card skeleton-card">
              <div className="card-img skeleton-img"></div>
              <div className="card-body">
                <h5 className="card-title skeleton-text"></h5>
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
          <div className="headCenter">
            <h3 className="card-title">{searchQuery}</h3>
          </div>
          {searchItem.length > 0 ? (
            <div className="cardsF">
              {searchItem.map((recipe, i) => (
                <div key={recipe.id} className="card">
                  <img
                    src={recipe.urls.full}
                    className="card-img-top cardImage"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title pElp">
                      {recipe.alt_description}
                    </h5>
                    <p className="card-text">
                      Some quick example text to build on the card title
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
          ) : (
            <div className="no-results">
              <div>
                <h3>No Items found</h3>
                <p>Try searching for something else!</p>
              </div>
            </div>
          )}

          {/* Load More */}
          {searchItem.length > 0 && (
            <div className="loadCenter" ref={loadMoreRef}>
              <button onClick={handlePagination} className="load-more-btn">
                <span>Load More</span>
              </button>
            </div>
          )}
          {loading && <p>Loading more...</p>}
        </>
      )}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Search;
