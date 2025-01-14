import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  // scroll to menu
  const scrollToMenus = () => {
    const element = document.getElementById("menuss");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // scroll to footer
  const scrollTofoterr = () => {
    const ele = document.getElementById("footerr");
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer" id="footerr">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Food Delivery</h3>
          <p>
            Your one-stop destination for delicious meals delivered straight to
            your doorstep.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink onClick={scrollToMenus} className="cusrorpo">
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/history">Orders</NavLink>
            </li>
            <li>
              <NavLink onClick={scrollTofoterr} className="cusrorpo">
                Contact
              </NavLink>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Phone: 7648876901</p>
          <p>Email: vishalgupta28012004@gmail.com</p>
          <p>Address: 123 Food Street, Mumbai City</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <p aria-label="Facebook">
              <FaFacebook />
            </p>
            <p aria-label="Twitter">
              <FaTwitter />
            </p>
            <p aria-label="Instagram">
              <FaInstagram />
            </p>
            <p aria-label="YouTube">
              <FaYoutube />
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Food Delivery. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
