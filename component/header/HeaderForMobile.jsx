import React, { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Search from "../homepage/Search";

const HeaderForMobile = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <div className="mobile_navbar">
        <div className="mobile_tabs">
          <div className="tabsMobile">
            <div>
              <IoHomeSharp size={20} color="var(--mainColor)" />
              <p>Home</p>
            </div>
          </div>
          <div
            className="tabsMobile"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <div>
              <BiSolidCategory size={20} color="var(--mainColor)" />
              <p>Category</p>
            </div>
          </div>
          <div
            className="tabsMobilesearch "
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <FaSearch size={20} color="var(--white)" />
          </div>
          <div className="tabsMobile">
            <div>
              <MdLocalOffer size={20} color="var(--mainColor)" />
              <p>OfferZone</p>
            </div>
          </div>
          <div className="tabsMobile">
            <div>
              <FaShoppingCart size={20} color="var(--mainColor)" />
              <p>Cart</p>
            </div>
          </div>
      
        </div>
      </div>
      {/* ////////////////////////////// category list ///////////////////////////////// */}
      <div
        class="offcanvas offcanvas-start w-75"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            All Category
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
          <p>cat 1</p>
        </div>

        {/* /////////////////////// saerch div /////////////////////// */}
      
      </div>
      {searchOpen && (
          <div className="searchBarForMobile">
            <Search />
            <p onClick={() => setSearchOpen(false)}>❌</p>
          </div>
        )}
    </>
  );
};

export default HeaderForMobile;
