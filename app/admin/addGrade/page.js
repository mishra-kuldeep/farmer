
"use client";
import AddGrade from "@/component/admin/AddGrade";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ListUnits from "@/component/admin/ListUnits";
import EditUnits from "@/component/admin/EditUnits";
import ListGrade from "@/component/admin/ListGrade";
import EditGrade from "@/component/admin/EditGrade";

const AdddGrade = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addGrade`);
    }
  }, [state,router]);
  return (
    <div className="adminPaperWrap addproductwrap p-2">
      <div className="selectCat mb-2">
        <button className={`${state==0&&"selectedCat"}`} onClick={()=>setState(0)}>Add Grade</button>
        <button className={`${state==1&&"selectedCat"}`} onClick={()=>setState(1)}>List Grade</button>
        {editId && (
          <button
            className={`${state == 2 && "selectedCat"}`}
          >
            Edit Grade
          </button>
        )}
      </div>
      {state == 0 && <AddGrade setState={setState} />}
      {state == 1 && <ListGrade setState={setState} />}
      {state == 2 && <EditGrade setState={setState} />}
    </div>
  );
};

export default AdddGrade;

