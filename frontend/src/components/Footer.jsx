import { useContext } from "react";
import { TabContext } from "../contexts/TabContext";
export default function Footer() {
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
            <div className="md:hidden z-10 rounded-t-[24px] text-white justify-around flex fixed bottom-0 left-0 bg-dark right-0 h-12">
                <div
                    onClick={(e) => handleClick(0)}
                    className="flex justify-center items-center cursor-pointer"
                >
                    <div>
                        <i
                            style={{
                                color: tab == 0 ? "rgb(52, 211, 153)" : "#fff",
                                textShadow:
                                    tab == 0
                                        ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                        : null,
                            }}
                            className="fa-solid fa-house"
                        ></i>
                    </div>
                </div>
                <div
                    onClick={(e) => handleClick(1)}
                    className="flex justify-center items-center cursor-pointer"
                >
                    <i
                        style={{
                            color: tab == 1 ? "rgb(52, 211, 153)" : "#fff",
                            textShadow:
                                tab == 1
                                    ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                    : null,
                        }}
                        className=" fa-solid fa-magnifying-glass"
                    ></i>
                </div>
                <div
                    onClick={(e) => handleClick(2)}
                    className="flex justify-center items-center cursor-pointer"
                >
                    <div className="rounded-[10px] relative bg-emerald-400 h-8 w-8 flex justify-center bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500 hover:scale-125 active:scale-100 transition-all">
                        <span className="relative -top-1.5 text-3xl">+</span>
                    </div>
                </div>
                <div
                    onClick={(e) => handleClick(3)}
                    className="flex justify-center items-center cursor-pointer"
                >
                    <i
                        style={{
                            color: tab == 3 ? "rgb(52, 211, 153)" : "#fff",
                            textShadow:
                                tab == 3
                                    ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26) "
                                    : null,
                        }}
                        className="fa-solid fa-comments"
                    ></i>
                </div>
                <div
                    onClick={(e) => handleClick(4)}
                    className="flex justify-center items-center cursor-pointer"
                >
                    <i
                        style={{
                            color: tab == 4 ? "rgb(52, 211, 153)" : "#fff",
                            textShadow:
                                tab == 4
                                    ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                    : null,
                        }}
                        className="fa-solid fa-user"
                    ></i>
                </div>
            </div>
        </>
    );
}
