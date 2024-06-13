import React from "react";
import MutualItem from "./MutualItem";

export default function MutualList() {
    return (
        <div className="p-1 mb-4 flex flex-col gap-3 overflow-scroll">
            <MutualItem />
            <MutualItem />
            <MutualItem />
            <MutualItem />
            <MutualItem />
            <MutualItem />
        </div>
    );
}
