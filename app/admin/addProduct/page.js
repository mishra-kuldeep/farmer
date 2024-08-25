"use client";
import AddProduct from "@/component/admin/AddProduct";
import EditProduct from "@/component/admin/EditProduct";
import ListProduct from "@/component/admin/ListProduct";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addProduct`);
    }
  }, [state]);
  return (
    <div className="adminPaperWrap addproductwrap p-2 position-relative">
      <div className="selectCat mb-2">
        <button
          className={`${state == 0 && "selectedCat"}`}
          onClick={() => setState(0)}
        >
          Add Products
        </button>
        <button
          className={`${state == 1 && "selectedCat"}`}
          onClick={() => setState(1)}
        >
          List Products
        </button>
        {editId && (
          <button
            className={`${state == 2 && "selectedCat"}`}
            onClick={() => setState(2)}
          >
            Edit Product
          </button>
        )}
      </div>
      {state == 0 && <AddProduct setState={setState} />}
      {state == 1 && <ListProduct setState={setState} />}
      {state == 2 && <EditProduct setState={setState} />}
    </div>
  );
};

export default page;
