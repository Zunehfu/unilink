import React from "react";
import Logo from "./Logo";
export default function Headern() {
    return (
        <div className="h-14 bg-dark sticky text-white flex justify-between">
            <div className="ml-1 flex justify-center items-center">
                <Logo />
            </div>
            <div className="mr-2 flex items-center font-normal font-[Lexend] text-sm tracking-wider">
                <span className="mr-2 hover:underline hover:text-green-300 cursor-pointer">
                    Privacy policy
                </span>
                <span>&#x2022;</span>
                <span className="mx-2 hover:underline hover:text-green-300 cursor-pointer">
                    About
                </span>
                <span>&#x2022;</span>
                <span className="ml-2 hover:underline hover:text-green-300 cursor-pointer">
                    Settings
                </span>
            </div>
        </div>
    );
}
