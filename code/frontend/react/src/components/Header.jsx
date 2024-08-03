import { useContext } from "react";
import Logo from "./Logo";
import { SettingsContext } from "../contexts/SettingsContext.jsx";

export default function Header() {
    const { setSettings } = useContext(SettingsContext);
    return (
        <div className="h-14 bg-offwhite sticky flex justify-between shadow-md">
            <div className="ml-1 my-auto">
                <Logo />
            </div>
            <div className="text-dark md:hidden mr-2 flex items-center text-sm">
                <i className=" cursor-pointer fa-solid fa-bell mr-5 scale-125"></i>
                <i
                    onClick={() => setSettings(true)}
                    className="cursor-pointer fa-solid fa-gear scale-125"
                ></i>
            </div>
        </div>
    );
}
