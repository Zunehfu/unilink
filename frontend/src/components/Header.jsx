import React from "react";
import Logo from "./Logo";
export default function Headern() {
    return (
        <div className="h-14 bg-dark sticky text-white flex justify-between">
            <div className="ml-1 my-auto">
                <Logo />
            </div>
            <div className="tracking-tight my-auto font-[Futura] after:border-[1px]  after:flex after:transition-[width] hover:after:w-full after:w-0 text-yellow-500  cursor-pointer ">
                Uni List
            </div>
            <div className="mr-2 flex items-center font-normal font-[Lexend] text-sm tracking-wider">
                <i class="fa-solid fa-bell mr-5 scale-125"></i>
                <i class="fa-solid fa-gear scale-125"></i>
            </div>
        </div>
    );
}
