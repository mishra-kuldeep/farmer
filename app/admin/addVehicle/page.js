"use client";
import AddVehicle from "@/component/admin/AddVehicle";
import EditVehicle from "@/component/admin/EditVehicle";
import ListVehicle from "@/component/admin/ListVehicle";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdddVehicle = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("editId");
    const [state, setState] = useState(0);
    useEffect(() => {
        if (state <= 1) {
            router.push(`/admin/addVehicle`);
        }
    }, [state, router]);
    return (
        <div className="adminPaperWrap addproductwrap p-2 position-relative">
            <div className="selectCat mb-2">
                <button
                    className={`${state == 0 && "selectedCat"}`}
                    onClick={() => setState(0)}
                >
                    Add Vehicle
                </button>
                <button
                    className={`${state == 1 && "selectedCat"}`}
                    onClick={() => setState(1)}
                >
                    List Vehicles
                </button>
                {editId && (
                    <button
                        className={`${state == 2 && "selectedCat"}`}
                        onClick={() => setState(2)}
                    >
                        Edit Vehicle
                    </button>
                )}
            </div>
            {state == 0 && <AddVehicle setState={setState} />}
            {state == 1 && <ListVehicle setState={setState} />}
            {state == 2 && <EditVehicle setState={setState} />}
        </div>
    );
};

export default AdddVehicle;
