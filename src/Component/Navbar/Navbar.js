import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import "../../media.css";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../CartContext";
import { useOrderHistory } from "../../OrderHistoryContext";
import { useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [active, setActive] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const [log, setLog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // use context
  const { cart, setCart, updateQuantity } = useCart();
  const { addOrder } = useOrderHistory();

  // cart badges count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // switch humburger
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // cart slider
  const handleCart = () => {
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

  // scroll to menu
  const scrollToMenus = () => {
    setActive("menu");
    navigate("/");
    setMenuOpen(false);
    document.getElementById("label-check").checked = false;
    const element = document.getElementById("menuss");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // navigate to history
  const handleHis = () => {
    setActive("orders");
    navigate("/history");
  };
  // scroll to footer
  const scrollTofoterr = () => {
    setActive("contact");
    navigate("/");
    setMenuOpen(false);
    document.getElementById("label-check").checked = false;
    const ele = document.getElementById("footerr");
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  // navigate to home page
  const handleHome = () => {
    navigate("/");
  };

  // navigate to login p[age]
  const handleLogin = () => {
    navigate("/register");
  };

  // getting data from localstorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData")) || null;
    if (data && data.fullname) {
      const name = data.fullname.trim();
      const nletter = name[0];
      setStoredData(nletter);
    }
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/register");
  };

  const handleperson = (event) => {
    event.stopPropagation();
    setLog((prevLog) => !prevLog);
  };

  // when menu click outside close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is inside the menu or toggle button
      if (
        !event.target.closest(".humList") &&
        !event.target.closest(".navbar-toggle")
      ) {
        setMenuOpen(false);
        document.getElementById("label-check").checked = false;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // when person icon click outside close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".floatDown") &&
        !event.target.closest(".percart")
      ) {
        setLog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // navigate to search
  const moveToSearch = () => {
    navigate("/Search");
  };

  return (
    <>
      <nav className="navbars" style={{ position: "fixed" }}>
        <div className={`navbar-logo`} onClick={handleHome}>
          Food Delivery
        </div>
        <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <div
                onClick={scrollToMenus}
                className={
                  active === "menu" ? "cusrorpo NavActive" : "cusrorpo"
                }
              >
                Menu
              </div>
            </li>
            <li>
              <div
                onClick={handleHis}
                className={
                  active === "orders" ? "cusrorpo NavActive" : "cusrorpo"
                }
              >
                Orders
              </div>
            </li>
            <li>
              <div
                onClick={scrollTofoterr}
                className={
                  active === "contact" ? "cusrorpo NavActive" : "cusrorpo"
                }
              >
                Contact
              </div>
            </li>
          </ul>
        </div>
        {/* search,person and cart icon */}
        <div className={`cart-icon ${menuOpen ? "active" : ""}`}>
          {/* search input  */}
          <div className="input-container" onClick={moveToSearch}>
            <input
              id="navbar-input"
              placeholder="Search something..."
              className="input"
              name="text"
              type="text"
              spellCheck="false"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="icon"
            >
              <g strokeWidth={0} id="SVGRepo_bgCarrier" />
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <rect fill="white" />{" "}
                <path
                  d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />{" "}
              </g>
            </svg>
          </div>
          {/* cart icon  */}
          <div className={`cart-container`} onClick={handleCart}>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            <FaShoppingCart className="cart" />
          </div>
          {/* person icon */}
          <div
            className="cart-container percart"
            onClick={storedData ? handleperson : handleLogin}
          >
            {storedData && storedData.length > 0 ? (
              <span className="cart loggs">{storedData}</span>
            ) : (
              <IoPersonCircle className="cart a" />
            )}
          </div>

          <p
            className={`floatDown ${log ? "logShow" : ""}`}
            onClick={handleLogout}
          >
            Logout
          </p>
          {/* humburger icon */}
          <div className={`navbar-toggle hide`}>
            <input type="checkbox" id="label-check" className="label-check" />
            <label
              className="hamburger-label"
              htmlFor="label-check"
              onClick={toggleMenu}
            >
              <div className="line1" />
              <div className="line2" />
              <div className="line3" />
              <label />
            </label>
          </div>
        </div>
      </nav>

      {/* menu for phone */}
      <ul className={`humList ${menuOpen ? "show" : ""}`}>
        <li onClick={scrollToMenus}>Menu</li>
        <li onClick={handleHis}>Orders</li>
        <li onClick={scrollTofoterr}>Contact</li>
        {storedData && storedData.length > 0 ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={handleLogin}>Login</li>
        )}
      </ul>

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
    </>
  );
};

export default Navbar;
