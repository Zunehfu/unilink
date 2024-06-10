import React from "react";

export default function ShoutItem() {
    return (
        <div className="flex justify-between rounded-md bg-[rgb(26,27,29)] hover:bg-[rgb(26,27,29)] cursor-pointer">
            <div className="flex items-center w-full">
                <div className="leading-5 p-2">
                    Embrace the new week with a positive mindset! Every day is a
                    fresh start filled with endless possibilities...
                </div>
            </div>
            <div className="font-semibold w-40 flex items-center justify-center text-emerald-500">
                3 days ago
            </div>
        </div>
    );
}
