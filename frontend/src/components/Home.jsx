import { useContext } from "react";
import { TabContext } from "../contexts/TabContext";
import PostWall from "./PostWall";

export default function Home({ posts, setPosts, scrollref }) {
    const { tab, setTab } = useContext(TabContext);

    function handleClick(val) {
        if (val == 0) {
            setTab(0);
        } else if (val == 1) {
            setTab(1);
        } else if (val == 2) {
            setTab(2);
        } else if (val == 3) {
            setTab(3);
        } else if (val == 4) {
            setTab(4);
        }
    }
    return (
        <>
            <div className=" text-white h-screen bg-black fixed hidden md:block">
                <div className="flex flex-col h-full justify-between">
                    <div className="w-64 mt-16 flex flex-col">
                        <div className="h-12 w-full flex">
                            <div
                                onClick={(e) => handleClick(0)}
                                className="ml-2 flex justify-center items-center cursor-pointer"
                            >
                                <i
                                    style={{
                                        color:
                                            tab == 0
                                                ? "rgb(52, 211, 153)"
                                                : "#fff",
                                        textShadow:
                                            tab == 0
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-house"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
                                        Home
                                    </span>
                                </i>
                            </div>
                        </div>
                        <div className="h-12 w-full flex">
                            <div
                                onClick={(e) => handleClick(4)}
                                className="ml-2 flex justify-center items-center cursor-pointer"
                            >
                                <i
                                    style={{
                                        color:
                                            tab == 4
                                                ? "rgb(52, 211, 153)"
                                                : "#fff",
                                        textShadow:
                                            tab == 4
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-user"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
                                        Profile
                                    </span>
                                </i>
                            </div>
                        </div>

                        <div className="h-12 w-full flex">
                            <div
                                onClick={(e) => handleClick(3)}
                                className="ml-2 flex justify-center items-center cursor-pointer"
                            >
                                <i
                                    style={{
                                        color:
                                            tab == 3
                                                ? "rgb(52, 211, 153)"
                                                : "#fff",
                                        textShadow:
                                            tab == 3
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-comment"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
                                        Inbox
                                    </span>
                                </i>
                            </div>
                        </div>

                        <div className="h-12 w-full flex">
                            <div
                                onClick={(e) => handleClick(1)}
                                className="ml-2 flex justify-center items-center cursor-pointer"
                            >
                                <i
                                    style={{
                                        color:
                                            tab == 1
                                                ? "rgb(52, 211, 153)"
                                                : "#fff",
                                        textShadow:
                                            tab == 1
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-search"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
                                        Search
                                    </span>
                                </i>
                            </div>
                        </div>

                        <div className="h-12 w-full flex">
                            <div
                                onClick={(e) => handleClick(2)}
                                className="ml-2 flex justify-center items-center cursor-pointer"
                            >
                                <i
                                    style={{
                                        color:
                                            tab == 2
                                                ? "rgb(52, 211, 153)"
                                                : "#fff",
                                        textShadow:
                                            tab == 2
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-plus"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
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
                                                : "#fff",
                                        textShadow:
                                            tab == 5
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-bell"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
                                        Notifications
                                    </span>
                                </i>
                            </div>
                        </div>

                        <div className="h-12 w-full flex">
                            <div
                                onClick={(e) => handleClick(0)}
                                className="ml-2 flex justify-center items-center cursor-pointer"
                            >
                                <i
                                    style={{
                                        color:
                                            tab == 6
                                                ? "rgb(52, 211, 153)"
                                                : "#fff",
                                        textShadow:
                                            tab == 6
                                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                                : null,
                                    }}
                                    className="fa-solid fa-gear"
                                >
                                    <span className="ml-3 font-[Futura] tracking-widest">
                                        Settings
                                    </span>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex fixed h-full items-center right-0 mr-2">
                <div className=" top-14 bg-black w-64 h-3/4 rounded-xl"></div>
            </div>
            <PostWall posts={posts} setPosts={setPosts} scrollref={scrollref} />
        </>
    );
}
