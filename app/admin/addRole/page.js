
"use client";
import AddRole from "@/component/admin/AddRole";
import EditRole from "@/component/admin/EditRole";
import ListRole from "@/component/admin/ListRole";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const AdddRole = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("editId");
  const [state, setState] = useState(0);
  useEffect(() => {
    if (state <= 1) {
      router.push(`/admin/addRole`);
    }
  }, [state,router]);
  return (
    <div className="adminPaperWrap addproductwrap p-2">
      <div className="selectCat mb-2">
        <button className={`${state==0&&"selectedCat"}`} onClick={()=>setState(0)}>Add Role</button>
        <button className={`${state==1&&"selectedCat"}`} onClick={()=>setState(1)}>List Role</button>
        {editId && (
          <button
            className={`${state == 2 && "selectedCat"}`}
          >
            Edit Role
          </button>
        )}
      </div>
      {state == 0 && <AddRole setState={setState} />}
      {state == 1 && <ListRole setState={setState} />}
      {state == 2 && <EditRole setState={setState} />}
    </div>
  );
};

export default AdddRole;

