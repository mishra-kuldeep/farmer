"use client";
import AddCategory from "@/component/admin/AddCategory";
import EditCategory from "@/component/admin/EditCategory";
import ListCategory from "@/component/admin/ListCategory";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('editId');
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addCategory`);
    }
  }, [state]);
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
      {state == 0 && <AddCategory setState={setState} />}
      {state == 1 && <ListCategory setState={setState} />}
      {state == 2 && <EditCategory setState={setState} />}
    </div>
  );
};

export default page;
