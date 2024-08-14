import React, { useState } from "react";
import "./search.css"

const Search = () => {
  const[open,setOpen] = useState(false)
  const handleSearch = (e) => {
    if(e.target.value.length>3){
      setOpen(true)
    }else{
      setOpen(false)
    }
  }
  return (
    <div className="w-100 position-relative">
      <input
        type="search"
        className="form-control"
        onChange={handleSearch}
        placeholder="Search for Products ..."
      />
     {open&&<div className="search_list_wrapper">
        <p>fgfhhmghjgh</p>
        <p>fgfh</p>
        <p>fgfh</p>
        <p>fgfh</p>
        <p>fgfh</p>
        <p>fgfh</p>
      </div>}
    </div>
  );
};

export default Search;
