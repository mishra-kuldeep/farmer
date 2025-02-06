import React from "react";
import "./veiwAllFilter.css";
import { IoIosArrowDown } from "react-icons/io";
import { VscCircleLargeFilled} from "react-icons/vsc";

const VeiwAllFilter = () => {
  return (
    <div className="filterwrapper">
      <div className="singlefilterdiv">
        <div className="filtertitle">
          <p className="fw-bold">Filter by Brand</p>
          <IoIosArrowDown />
        </div>
        <div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="var(--mainColor)" />
            <label className="ms-2">grade A</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">grade A</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">grade A</label>
          </div>
         
        </div>
      </div>

      <div className="singlefilterdiv">
        <div className="filtertitle">
          <p className="fw-bold">Filter by Units</p>
          <IoIosArrowDown />
        </div>
        <div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="var(--mainColor)" />
            <label className="ms-2">Kg</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Ton</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Gram</label>
          </div>
         
        </div>
      </div>
      <div className="singlefilterdiv">
        <div className="filtertitle">
          <p className="fw-bold">Filter by Units</p>
          <IoIosArrowDown />
        </div>
        <div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="var(--mainColor)" />
            <label className="ms-2">Kg</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Ton</label>
          </div>
          <div className="filterHoverlable">
            <VscCircleLargeFilled size={18} color="#dadada" />
            <label className="ms-2">Gram</label>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default VeiwAllFilter;
