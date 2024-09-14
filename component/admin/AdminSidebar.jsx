import React from "react";
import { MdCategory } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { FaRegListAlt,FaListUl } from "react-icons/fa";
import { SiUnpkg } from "react-icons/si";
import { GiUpgrade } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

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
    title: "Add Products",
    url: "/admin/addProduct",
    icon: <FaProductHunt size={25} />,
  },
  {
    id: 4,
    title: "Add Category",
    url: "/admin/addCategory",
    icon: <MdCategory size={25} />,
  },
  {
    id: 5,
    title: "Add Subcategory",
    url: "/admin/addSubCategory",
    icon: <FaRegListAlt size={25} />,
  },
  {
    id: 6,
    title: "Add Brands",
    url: "/admin/addBrand",
    icon: <SiBrandfolder size={25} />,
  },
  {
    id: 6,
    title: "Add Unit",
    url: "/admin/addUnits",
    icon: <SiUnpkg size={25} />,
  },
  {
    id: 6,
    title: "Add Grade",
    url: "/admin/addGrade",
    icon: <GiUpgrade size={25} />,
  },
  {
    id: 7,
    title: "Users List",
    url: "/admin/users",
    icon: <FaListUl size={22} className="me-1"/>,
  },
];

const AdminSidebar = ({ sideOpen, toggleidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
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
        overflow: "hidden",
      }}
    >
      {sidebarArray.map((items) => {
        return (
          <div
            key={items.id}
            className={`${
              pathname !== items.url
                ? "sidebarListItemsActive"
                : "sidebarListItems"
            }`}
            onClick={() => {
              router.push(items.url);
             isMobile&& toggleidebar();
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
