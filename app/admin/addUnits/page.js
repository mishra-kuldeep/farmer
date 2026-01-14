"use client";
import AddUnit from "@/component/admin/AddUnit";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ListUnits from "@/component/admin/ListUnits";
import EditUnits from "@/component/admin/EditUnits";

const AddUnits = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addUnits`);
    }
  }, [state,router]);
  return (
    <div className="adminPaperWrap addproductwrap p-2">
      <div className="selectCat mb-2">
        <button className={`${state==0&&"selectedCat"}`} onClick={()=>setState(0)}>Add Unit</button>
        <button className={`${state==1&&"selectedCat"}`} onClick={()=>setState(1)}>List Units</button>
        {editId && (
          <button
            className={`${state == 2 && "selectedCat"}`}
          >
            Edit Unit
          </button>
        )}
      </div>
      {state == 0 && <AddUnit setState={setState} />}
      {state == 1 && <ListUnits setState={setState} />}
      {state == 2 && <EditUnits setState={setState} />}
    </div>
  );
};

export default AddUnits;

