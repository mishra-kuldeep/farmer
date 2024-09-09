import React, { useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import Search from "../reusableComponent/search/Search";
import Category from "../reusableComponent/category/Category";
import { useRouter } from "next/navigation";

const HeaderForMobile = () => {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <div className="mobile_navbar">
        <div className="mobile_tabs">
          <div className="tabsMobile" onClick={()=>router.push("/")}>
            <div>
              <IoHomeSharp size={20} color="var(--mainColor)" />
              <p>Home</p>
            </div>
          </div>
          <div
            className="tabsMobile"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample1"
            aria-controls="offcanvasExample1"
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
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample1"
        aria-labelledby="offcanvasExampleLabel1"
        style={{backgroundColor:"var(--mainColor)",width:"90%"}}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-light" id="offcanvasExampleLabel1">
            All Category
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-2">
          <Category />
        </div>
        </div>
        {/* /////////////////////// saerch div /////////////////////// */}
    
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
