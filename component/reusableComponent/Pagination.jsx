import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./pagination.css";

const Pagination = ({
  page,
  setPage,
  searchText,
  setSearchText,
  searchShow,
  metaData,
}) => {
  const handlePage = (direction) => {
    if (direction === "prev" && page > 1) {
      setPage(page - 1);
    } else if (
      direction === "next" &&
      metaData?.totalPages !== metaData?.currentPage
    ) {
      setPage(page + 1);
    }
  };

  return (
    <div className="paginationWrapper">
      {searchShow && (
        <input
          type="search"
          className="form-control categorySearch"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1); // Reset to page 1 whenever search text changes
          }}
          placeholder="Search ..."
        />
      )}
      <h6>
        Page ( {metaData?.currentPage}/{metaData?.totalPages} )
      </h6>
      <button
        disabled={page <= 1}
        className={`${page <= 1 ? "arrwleftdisable" : "arrwleft"}`}
        onClick={() => handlePage("prev")} // Prevent clicking on disabled button
      >
        <IoIosArrowBack color="#fff" size={20} />
      </button>
      <button
        disabled={ (metaData?.totalPages == 0)||(page == metaData?.totalPages) }
        className={`${
          page == metaData?.totalPages ? "arrwleftdisable" : "arrwleft"
        }`}
        onClick={() => handlePage("next")} // Prevent clicking on disabled button
      >
        <IoIosArrowForward color="#fff" size={20} />
      </button>
    </div>
  );
};

export default Pagination;
