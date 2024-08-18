import React from "react";
import { IoMenu } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { isMobile } from "react-device-detect";

const sidebarArray = [
  {
    id: 1,
    title: "dashboard",
    url: "/admin",
    icon: <MdOutlineDashboard size={25} />,
  },
  {
    id: 2,
    title: "Farmer List",
    url: "/admin/farmerlist",
    icon: <FaRegListAlt size={25} />,
  },
];

const AdminSidebar = ({ sideOpen }) => {
  const pathname = usePathname();
  const router = useRouter()
  return (
    <div className="adminSIdebarWrapper"  style={{width:sideOpen?"200px":"55px"}}>
      {sidebarArray.map((items) => {
        return (
          <>
            <div
              className={`${
                pathname !== items.url
                  ? "sidebarListItemsActive"
                  : "sidebarListItems"
              }`}
              onClick={()=>router.push(items.url)}
            >
              {items.icon} {sideOpen && items.title}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
