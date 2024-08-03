import { useContext } from "react";
import { TabContext } from "../contexts/TabContext";
import { motion } from "framer-motion";
export default function HorizontalNav() {
    const { tab, setTab } = useContext(TabContext);

    return (
        <div className="shadow-t-md md:hidden z-10 rounded-t-[24px] text-offwhite justify-around flex fixed bottom-0 left-0 bg-offwhite right-0 h-12">
            <button
                onClick={() => setTab(0)}
                className="flex justify-center items-center cursor-pointer"
            >
                {/* <i
                    style={{
                        color: tab == 0 ? "rgb(52, 211, 153)" : "#1E1F22",
                        textShadow:
                            tab == 0
                                ? "0 0 20px rgb(52, 211, 153), 0 0 30px rgb(45, 183, 132), 0 0 40px rgb(38, 155, 110), 0 0 50px rgb(31, 127, 89), 0 0 60px rgb(24, 99, 68), 0 0 70px rgb(17, 71, 47), 0 0 80px rgb(10, 43, 26)"
                                : null,
                    }}
                    className="fa-solid fa-house"
                ></i> */}
                <i
                    class={
                        tab == 0
                            ? "fa-solid fa-house text-emerald-500 scale-110"
                            : "fa-light fa-house text-[#1E1F22] scale-110"
                    }
                ></i>
            </button>
            <button
                onClick={() => setTab(1)}
                className="flex justify-center items-center cursor-pointer"
            >
                <i
                    class={
                        tab == 1
                            ? "fa-solid fa-magnifying-glass text-emerald-500 scale-110"
                            : "fa-light fa-magnifying-glass text-[#1E1F22] scale-110"
                    }
                ></i>
            </button>
            <button
                onClick={() => setTab(2)}
                className="flex justify-center items-center"
            >
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="rounded-xl flex items-center justify-center bg-emerald-400 h-8 w-8 bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500 "
                >
                    <i class="fa-regular fa-plus scale-110"></i>
                </motion.div>
            </button>
            <button
                onClick={() => setTab(3)}
                className="flex justify-center items-center cursor-pointer"
            >
                <i
                    class={
                        tab == 3
                            ? "fa-solid fa-comment text-emerald-500 scale-110"
                            : "fa-light fa-comment text-[#1E1F22] scale-110"
                    }
                ></i>
            </button>
            <button
                onClick={() => setTab(4)}
                className="flex justify-center items-center cursor-pointer"
            >
                <i
                    class={
                        tab == 4
                            ? "fa-solid fa-user text-emerald-500 scale-110"
                            : "fa-light fa-user text-[#1E1F22] scale-110"
                    }
                ></i>
            </button>
        </div>
    );
}
