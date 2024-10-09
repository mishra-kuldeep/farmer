"use client";
import AddVendor from "@/component/admin/AddVendor";
import EditVendor from "@/component/admin/EditVendor";
import ListVendor from "@/component/admin/ListVendor";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddedVendor = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("editId");
    const [state, setState] = useState(0);
    useEffect(() => {
        if (state <= 1) {
            router.push(`/admin/addVendor`);
        }
    }, [state, router]);
    return (
        <div className="adminPaperWrap addproductwrap p-2 position-relative">
            <div className="selectCat mb-2">
                <button
                    className={`${state == 0 && "selectedCat"}`}
                    onClick={() => setState(0)}
                >
                    Add Vendor
                </button>
                <button
                    className={`${state == 1 && "selectedCat"}`}
                    onClick={() => setState(1)}
                >
                    List Vendor
                </button>
                {editId && (
                    <button
                        className={`${state == 2 && "selectedCat"}`}
                        onClick={() => setState(2)}
                    >
                        Edit Vendor
                    </button>
                )}
            </div>
            {state == 0 && <AddVendor setState={setState} />}
            {state == 1 && <ListVendor setState={setState} />}
            {state == 2 && <EditVendor setState={setState} />}
        </div>
    );
};

export default AddedVendor;
