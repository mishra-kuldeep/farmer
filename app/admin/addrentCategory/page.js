"use client";
import AddRentCategory from "@/component/admin/AddRentCategory";
import EditRentCategory from "@/component/admin/EditRentCategory";
import ListRentCategory from "@/component/admin/ListRentCategory";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddCategorys = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('editId');
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addrentCategory`);
    }
  }, [state,router]);
  return (
    <div className="adminPaperWrap addproductwrap p-2 position-relative">
      <div className="selectCat mb-2">
        <button
          className={`${state == 0 && "selectedCat"}`}
          onClick={() => setState(0)}
        >
          Add Category
        </button>
        <button
          className={`${state == 1 && "selectedCat"}`}
          onClick={() => setState(1)}
        >
          List Category
        </button>
     {editId&&   <button
          className={`${state == 2 && "selectedCat"}`}
          onClick={() => setState(2)}
        >
          Edit Category
        </button>}
      </div>
      {state == 0 && <AddRentCategory setState={setState} />}
       {state == 1 && <ListRentCategory setState={setState} />}
      {state == 2 && <EditRentCategory setState={setState} />}

    </div>
  );
};

export default AddCategorys;
