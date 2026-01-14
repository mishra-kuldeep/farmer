"use client";
import AddBrand from "@/component/admin/AddBrand";
import EditBrand from "@/component/admin/EditBrand";
import ListBrand from "@/component/admin/ListBrand";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddBrands = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  // useEffect(() => {
  //   if (editId) {
  //     setState(2);
  //   } else if (state <= 1) {
  //     router.push(`/admin/addBrand`);
  //   }
  // }, [state, router, editId]);
    useEffect(() => {
      if (state <= 1) {
        router.push(`/admin/addBrand`);
      }
    }, [state,router]);
  return (
    <div className="adminPaperWrap addproductwrap p-2">
      <div className="selectCat mb-2">
        <button className={`${state==0&&"selectedCat"}`} onClick={()=>setState(0)}>Add Brands</button>
        <button className={`${state==1&&"selectedCat"}`} onClick={()=>setState(1)}>List Brands</button>
        {editId && (
          <button
            className={`${state == 2 && "selectedCat"}`}
          >
            Edit Brand
          </button>
        )}
      </div>
      {state == 0 && <AddBrand setState={setState} />}
      {state == 1 && <ListBrand setState={setState} />}
      {state == 2 && <EditBrand setState={setState} />}
    </div>
  );
};

export default AddBrands;

