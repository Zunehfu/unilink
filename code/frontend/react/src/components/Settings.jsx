import { useContext, useState } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import ProfilePicture from "./ProfilePicture";
import ProfileSettings from "./ProfileSettings";
export default function Settings() {
    const { setSettings } = useContext(SettingsContext);
    const [sps, setSps] = useState(false);

    function handleClick() {
        setSps(true);
    }

    return (
        <>
            <div className="bg-offwhite bg-dot-texture text-dark fixed z-10 top-0 w-screen h-screen overflow-y-scroll">
                <button
                    className="z-10 fixed left-3 top-3 text-dark hover:text-emerald-500"
                    onClick={() => {
                        setSettings(false);
                    }}
                >
                    <i className="fa-solid fa-arrow-left scale-150"></i>
                </button>
                <div className="h-[175px]">
                    <div className="h-[175px] w-full fixed flex flex-col items-center justify-center">
                        <ProfilePicture size="65px" />
                        <span>Deneth Priyadarshana</span>
                        <span>sadpriyadarshana@gmail.com</span>
                    </div>
                </div>
                <div className="flex flex-col gap-5 bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500 rounded-t-[20px] p-5">
                    <div>
                        <button className="w-full hover:opacity-60 transition-all px-5 gap-5 bg-white opacity-50 text-black h-16 rounded-t-xl flex items-center">
                            <i class="scale-150 fa-thin fa-address-card"></i>
                            Account
                        </button>
                        <button className="w-full hover:opacity-60 transition-all px-5 gap-5 bg-white opacity-50 text-black h-16 rounded-b-xl flex items-center">
                            <i class="fa-light fa-desktop"></i>
                            Devices
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleClick}
                            className="w-full hover:opacity-60 transition-all px-5 gap-5 bg-white opacity-50 text-black  h-16 rounded-t-xl flex items-center"
                        >
                            <i class="fa-light fa-user"></i>Profile
                        </button>
                        <button className="w-full hover:opacity-60 transition-all px-5 gap-5 bg-white opacity-50 text-black   h-16 flex items-center">
                            <i class="fa-light fa-lock"></i>Privacy
                        </button>
                        <button className="w-full hover:opacity-60 transition-all px-5 gap-5 bg-white opacity-50 text-black h-16 flex items-center">
                            <i class="fa-light fa-volume"></i>Sound
                        </button>
                        <button className="w-full hover:opacity-60 transition-all px-5 gap-5 bg-white opacity-50 text-black h-16 flex items-center">
                            <i class="fa-light fa-display"></i>Display
                        </button>
                        <button className="w-full hover:opacity-60 px-5 gap-5 bg-white opacity-50 text-black h-16 rounded-b-xl flex items-center">
                            <i class="fa-light fa-bell"></i>
                            Notifications
                        </button>
                    </div>
                    <div>
                        <button className="w-full hover:opacity-60 px-5 gap-5 bg-white opacity-50 text-black h-16 rounded-xl flex items-center">
                            <i class="fa-light fa-handshake"></i>
                            Terms & Conditions
                        </button>
                    </div>
                    <div className="opacity-50 text-justify text-xs leading-[14px]">
                        By modifying your settings on this page, you agree to
                        comply with UniLink's Terms of Service and Privacy
                        Policy. Any changes made are your responsibility and may
                        impact your account's security and functionality.
                        UniLink reserves the right to monitor changes and take
                        appropriate action if misuse or violation of policies is
                        detected. Unauthorized use of these settings may result
                        in account suspension or termination.
                    </div>
                </div>
            </div>
            {sps && <ProfileSettings />}
        </>
    );
}
