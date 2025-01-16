import React from "react";
import { MdCategory } from "react-icons/md";
import { FaProductHunt, FaServicestack } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { FaRegListAlt, FaListUl } from "react-icons/fa";
import { SiUnpkg } from "react-icons/si";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";
import { AiFillTruck } from "react-icons/ai";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { BiSolidCategoryAlt } from "react-icons/bi";

const sidebarArray = [
  {
    id: 1,
    title: "Dashboard",
    url: "/admin",
    icon: <MdOutlineDashboard size={25} />,
  },
  {
    id: 2,
    title: "Farmer Products List",
    url: "/admin/farmerProductList",
    icon: <FaRegListAlt size={25} />,
  },
  {
    id: 3,
    title: "Order List",
    url: "/admin/orders",
    icon: <MdProductionQuantityLimits size={22} />,
  },
  {
    id: 4,
    title: "Add Products",
    url: "/admin/addProduct",
    icon: <FaProductHunt size={25} />,
  },
  {
    id: 5,
    title: "Add Category",
    url: "/admin/addCategory",
    icon: <MdCategory size={25} />,
  },
  {
    id: 6,
    title: "Add Subcategory",
    url: "/admin/addSubCategory",
    icon: <FaRegListAlt size={25} />,
  },
  {
    id: 7,
    title: "Add Brands",
    url: "/admin/addBrand",
    icon: <SiBrandfolder size={25} />,
  },
  {
    id: 8,
    title: "Add Unit",
    url: "/admin/addUnits",
    icon: <SiUnpkg size={25} />,
  },
  {
    id: 9,
    title: "Add Grade",
    url: "/admin/addGrade",
    icon: <GiUpgrade size={25} />,
  },
  {
    id: 10,
    title: "Users List",
    url: "/admin/users",
    icon: <FaListUl size={20} />,
  },
  {
    id: 11,
    title: "Add Vehicle",
    url: "/admin/addVehicle",
    icon: <AiFillTruck size={28} />,
  },
  {
    id: 12,
    title: "Transporter Vehicle List",
    url: "/admin/transportList",
    icon: <AiFillTruck size={28} />,
  },
  {
    id: 13,
    title: "Transportation Status",
    url: "/admin/transportationStatus",
    icon: <MdOutlineEmojiTransportation size={28} />,
  },
  {
    id: 15,
    title: "Add Role",
    url: "/admin/addRole",
    icon: <FaIdCard size={25} />,
  },
  {
    id: 16,
    title: "Add Vendor",
    url: "/admin/addVendor",
    icon: <IoMdAddCircle size={25} />,
  },
  {
    id: 17,
    title: "Vendor services List",
    url: "/admin/VendorServicesList",
    icon: <FaServicestack size={25} />,
  },
  {
    id: 18,
    title: "Add Rent Category",
    url: "/admin/addrentCategory",
    icon: <BiSolidCategoryAlt size={25} />,
  },

];

const AdminSidebar = ({ sideOpen, toggleidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  const hendleSidebar = (data) => {
    toggleidebar
  }
  return (
    <div
      className="adminSIdebarWrapper"
      style={{
        width: !isMobile
          ? sideOpen
            ? "300px"
            : "55px"
          : sideOpen
            ? "100vw"
            : "0px",
        overflow: "auto",
        
      }}
      onMouseLeave={()=>toggleidebar(false)}
      onMouseEnter={()=>toggleidebar(true)}
     
    >
      {sidebarArray.map((items) => {
        return (
          <div
          // onMouseLeave={()=>hendleSidebar(false)}
            key={items.id}
            className={`${pathname !== items.url
                ? "sidebarListItemsActive"
                : "sidebarListItems"
              }`}
            onClick={() => {
              router.push(items.url);
              isMobile && toggleidebar();
            }}
          >
            {items.icon} {sideOpen && items.title}
          </div>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
