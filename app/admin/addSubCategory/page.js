"use client";
import AddSubCategory from "@/component/admin/AddSubCategory";
import EditSubCategory from "@/component/admin/EditSubCategory";
import ListSubCategory from "@/component/admin/ListSubCategory";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddSubCategorys = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addSubCategory`);
    }
  }, [state,router]);
  return (
    <div className="adminPaperWrap addproductwrap p-2">
      <div className="selectCat mb-2">
        <button className={`${state==0&&"selectedCat"}`} onClick={()=>setState(0)}>Add SubCategory</button>
        <button className={`${state==1&&"selectedCat"}`} onClick={()=>setState(1)}>List SubCategory</button>
        {editId && (
          <button
            className={`${state == 2 && "selectedCat"}`}
          >
            Edit Sub Category
          </button>
        )}
      </div>
      {state == 0 && <AddSubCategory setState={setState} />}
      {state == 1 && <ListSubCategory setState={setState} />}
      {state == 2 && <EditSubCategory setState={setState} />}
    </div>
  );
};

export default AddSubCategorys;
