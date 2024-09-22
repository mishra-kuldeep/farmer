"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../../app/admin/addProduct/addProduct.css"
import "../../../component/admin/adminpage.css";
import PendingOrder from "@/component/admin/OrderPending";
import OrderApproved from "@/component/admin/OrderApproved";
import OrderReject from "@/component/admin/OrderReject";
import AllOrders from "@/component/admin/AllOrders";
const FarmerProductLists = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  // useEffect(() => {
  //   if (state <= 1) {
  //     router.push(`/admin/farmerProductList`);
  //   }
  // }, [state]);
  return (
    <div className="adminPaperWrap addproductwrap p-2 position-relative">
      <div className="selectCat mb-2">
     
        <button
          className={`${state == 0 && "selectedCat"}`}
          onClick={() => setState(0)}
        >
          Pending list
        </button>
        <button
          className={`${state == 1 && "selectedCat"}`}
          onClick={() => setState(1)}
        >
         Aproved list
        </button>
        <button
          className={`${state == 2 && "selectedCat"}`}
          onClick={() => setState(2)}
        >
         Reajected list
        </button>
        <button
          className={`${state == 3 && "selectedCat"}`}
          onClick={() => setState(3)}
        >
          All List
        </button>
      </div>
      {state == 0 && <PendingOrder setState={setState} state={state}/>}
      {state == 1 && <OrderApproved setState={setState} state={state}/>}
      {state == 2 && <OrderReject setState={setState} state={state}/>}
      {state == 3 && <AllOrders setState={setState} state={state}/>}
    </div>
  );
};

export default FarmerProductLists;
