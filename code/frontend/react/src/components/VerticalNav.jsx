import { useContext, useState } from "react";
import { TabContext } from "../contexts/TabContext";

export default function VerticalNav() {
    const { tab, setTab } = useContext(TabContext);
    return (
        <div className="text-dark h-screen bg-offwhite fixed hidden md:block">
            <div className="flex flex-col h-full justify-between">
                <div className="w-64 mt-16 flex flex-col">
                    <div className="h-12 w-full flex">
                        <div
                            onClick={() => setTab(0)}
                            className="ml-2 flex justify-center items-center cursor-pointer"
                        >
                            <i
                                style={{
                                    color:
                                        tab == 0
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 0
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-house"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Home
                                </span>
                            </i>
                        </div>
                    </div>
                    <div className="h-12 w-full flex">
                        <div
                            onClick={() => setTab(4)}
                            className="ml-2 flex justify-center items-center cursor-pointer"
                        >
                            <i
                                style={{
                                    color:
                                        tab == 4
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 4
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-user"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Profile
                                </span>
                            </i>
                        </div>
                    </div>

                    <div className="h-12 w-full flex">
                        <div
                            onClick={() => setTab(3)}
                            className="ml-2 flex justify-center items-center cursor-pointer"
                        >
                            <i
                                style={{
                                    color:
                                        tab == 3
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 3
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-comment"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Inbox
                                </span>
                            </i>
                        </div>
                    </div>

                    <div className="h-12 w-full flex">
                        <div
                            onClick={() => setTab(1)}
                            className="ml-2 flex justify-center items-center cursor-pointer"
                        >
                            <i
                                style={{
                                    color:
                                        tab == 1
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 1
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-search"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Search
                                </span>
                            </i>
                        </div>
                    </div>

                    <div className="h-12 w-full flex">
                        <div
                            onClick={() => setTab(2)}
                            className="ml-2 flex justify-center items-center cursor-pointer"
                        >
                            <i
                                style={{
                                    color:
                                        tab == 2
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 2
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-plus"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Add post
                                </span>
                            </i>
                        </div>
                    </div>
                </div>
                <div className="text-white w-64 mb-14 flex flex-col">
                    <div className="lg:hidden h-12 w-full flex">
                        <div className="ml-2 flex justify-center items-center cursor-pointer">
                            <i
                                style={{
                                    color:
                                        tab == 5
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 5
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-bell"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Notifications
                                </span>
                            </i>
                        </div>
                    </div>

                    <div className="h-12 w-full flex">
                        <div
                            onClick={() => setTab(0)}
                            className="ml-2 flex justify-center items-center cursor-pointer"
                        >
                            <i
                                style={{
                                    color:
                                        tab == 6
                                            ? "rgb(52, 211, 153)"
                                            : "#1E1F22",
                                    textShadow:
                                        tab == 6
                                            ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                            : null,
                                }}
                                className="fa-solid fa-gear"
                            >
                                <span className="ml-3 font-[Inter] font-semibold tracking-widest">
                                    Settings
                                </span>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
