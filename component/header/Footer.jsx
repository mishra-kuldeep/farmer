import React from "react";
import "./footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { MdWhatsapp } from "react-icons/md";

const Footer = () => {
  return (
    // <footer className="footer">
    //   <div className="container">
    //     <div className="row">
    //       <div className="footer-col col-6 col-md-3">
    //         <h4>company</h4>
    //         <ul>
    //           <li>
    //             <a href="#">about us</a>
    //           </li>
    //           <li>
    //             <a href="#">our services</a>
    //           </li>
    //           <li>
    //             <a href="#">privacy policy</a>
    //           </li>
    //           <li>
    //             <a href="#">affiliate program</a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="footer-col col-6 col-md-3">
    //         <h4>get help</h4>
    //         <ul>
    //           <li>
    //             <a href="#">FAQ</a>
    //           </li>
    //           <li>
    //             <a href="#">shipping</a>
    //           </li>
    //           <li>
    //             <a href="#">returns</a>
    //           </li>
    //           <li>
    //             <a href="#">order status</a>
    //           </li>
    //           <li>
    //             <a href="#">payment options</a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="footer-col col-6 col-md-3">
    //         <h4>online shop</h4>
    //         <ul>
    //           <li>
    //             <a href="#">watch</a>
    //           </li>
    //           <li>
    //             <a href="#">bag</a>
    //           </li>
    //           <li>
    //             <a href="#">shoes</a>
    //           </li>
    //           <li>
    //             <a href="#">dress</a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="footer-col col-6 col-md-3">
    //         <h4>follow us</h4>
    //         <div className="social-links">
    //           <a href="#">
    //             <FaFacebookF />
    //           </a>
    //           <a href="#">
    //             <FaXTwitter size={20} />
    //           </a>
    //           <a href="#">
    //             <FaInstagram size={20} />
    //           </a>
    //           <a href="#">
    //             <MdWhatsapp size={20} />
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <footer className="mt-4 mb-md-0 mb-5" style={{ backgroundColor: "#dddddd" }}>
      <div className="text-center p-md-5 p-2">
        <h6>
          <b>Office Address -</b> 146 Starflower Way, Mickleover, Derby,<br/> United Kingdom, Post Code - De3 0FD
        </h6>
        <div className="footer-col ">
          <h4>follow us</h4>
          <div className="social-links">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaXTwitter size={20} />
            </a>
            <a href="#">
              <FaInstagram size={20} />
            </a>
            <a href="#">
              <MdWhatsapp size={20} />
            </a>
          </div>
        </div>

		<div className="d-flex d-md-none justify-content-center gap-3">
            <p className="cursor">About</p>
            <p className="cursor">FAQ</p>
          </div>
      </div>
      <div
        style={{ backgroundColor: "#bbbbbb" }}
      >
        <div className="container d-flex justify-content-between gap-5 p-2">
          <p className="cursor">Privacy Policy</p>
          <div className="d-none d-md-flex gap-4">
            <p className="cursor">About</p>
            <p className="cursor">FAQ</p>
          </div>

          <p className="cursor">Term & Condition</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
