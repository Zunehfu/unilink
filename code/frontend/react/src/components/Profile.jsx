import { useContext, useEffect, useState } from "react";

import ProfilePicture from "./ProfilePicture";
import PhotosLayout from "./PhotosLayout";
import MutualList from "./MutualList";
import "../styles/profile.css";
import "../styles/profile-uni.css";
import ShoutsList from "./ShoutsList";
import AdditionalInfo from "./AdditionalInfo";
import { useProfileFetch } from "../hooks/useProfileFetch";
import { ThreeDots } from "react-loader-spinner";
import PalButton from "./PalButton";
import { useProfile } from "../hooks/useProfile";
import { ProfileContext } from "../contexts/ProfileContext";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Profile() {
    const [section, setSection] = useState(2);
    const setProfile = useProfile();
    const { loading } = useProfileFetch();
    const { activeProfileData } = useContext(ProfileContext);
    const [animationProps, setAnimationProps] = useState({
        translateX: 0,
        width: 46,
    });

    useEffect(() => {
        switch (section) {
            case 0:
                setAnimationProps({ translateX: -173, width: 35 });
                break;
            case 1:
                setAnimationProps({ translateX: -90, width: 45 });
                break;
            case 3:
                setAnimationProps({ translateX: 90, width: 49 });
                break;
            default:
                setAnimationProps({ translateX: 0, width: 46 });
        }
    }, [section]);

    return (
        //bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
        <>
            <button
                onClick={() => setProfile(-1)}
                className="fixed z-10 bg-gray-400 rounded-full w-6 text-white hover:text-emerald-500 cursor-pointer left-3 top-3 scale-150"
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            {loading ? (
                <div className=" bg-dark h-screen w-screen flex items-center justify-center">
                    <ThreeDots
                        visible={true}
                        height="60"
                        width="60"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className="bg-body bg-dot-texture font-light text-dark md:text-lg lg:text-xl h-screen w-screen overflow-y-scroll">
                    <div className="h-[30%]">
                        <div className="w-full fixed top-8">
                            <div className="flex justify-center">
                                <span className="metallic-shine overflow-hidden">
                                    {activeProfileData.university}
                                </span>
                            </div>
                            <div className="flex justify-center font-mono">
                                <span className="bg-black text-offwhite px-4 rounded-b-full">
                                    3rd year
                                </span>
                            </div>
                            <div className="mt-4 flex justify-center font-mono">
                                <span className="bg-black px-4 rounded-full">
                                    {activeProfileData.major}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[70%] relative rounded-t-[60px] bg-offwhite shadow-topshadow flex flex-col">
                        <div className="absolute left-[calc(50%-58px)] -top-[58px] bg-offwhite rounded-full">
                            <div className="m-2 flex">
                                <ProfilePicture size="100px" />
                            </div>
                        </div>
                        <div className="py-1 flex justify-around items-center">
                            <div className="text-center">
                                <b>{activeProfileData.pal_count}</b>
                                <br />
                                Friends
                            </div>
                            <div className="text-center">
                                <b>{activeProfileData.post_count}</b>
                                <br />
                                Posts
                            </div>
                        </div>
                        <div className="py-2 text-center font-lexend font-semibold">
                            @{activeProfileData.username}
                        </div>
                        <div className="py-2 text-center">
                            {activeProfileData.name}
                        </div>
                        <div className="mx-auto max-w-[628px] text-center">
                            A scenic landscape with a winding road stretching
                            into the horizon, flanked by lush greenery and
                            majestic mountains.
                        </div>

                        <div className="h-10 my-4 flex bg-transparent">
                            <div className="w-1/2 relative">
                                <PalButton />
                            </div>
                            <div className="w-1/2 relative">
                                <button
                                    onClick={() => {
                                        toast.info(
                                            "This feature is yet to be implemented."
                                        );
                                    }}
                                    className="bg-white shadow-md text-black py-1 px-5 absolute left-1/3 rounded-full"
                                >
                                    Message
                                </button>
                            </div>
                        </div>

                        <div className=" flex justify-center gap-11">
                            <button onClick={() => setSection(0)}>Stalk</button>
                            <button
                                className="relative"
                                onClick={() => setSection(1)}
                            >
                                Photos
                                <span className="text-offwhite ml-1 left-full leading-5 font-sans px-1 top-0.5 text-xs font-medium rounded-full absolute bg-sky-500 ">
                                    12
                                </span>
                            </button>
                            <button
                                className="relative"
                                onClick={() => setSection(2)}
                            >
                                Shouts
                                <span className="text-offwhite ml-1 text-offwhiteml-1 left-full leading-5 px-1 top-0.5 text-xs font-medium rounded-full absolute bg-sky-500 ">
                                    {activeProfileData.post_count}
                                </span>
                            </button>
                            <button
                                className="relative"
                                onClick={() => setSection(3)}
                            >
                                Mutual
                                <span className="text-offwhite ml-1 left-full leading-5 px-1 top-0.5 text-xs font-medium rounded-full absolute bg-sky-500 ">
                                    {activeProfileData.mutual_pals_count}
                                </span>
                            </button>
                        </div>
                        <div className="mb-2 flex justify-center">
                            <motion.div
                                style={{ left: 38, width: 46 }}
                                initial={{ translateX: 0, width: 46 }}
                                animate={animationProps}
                                transition={{ duration: 0.2 }}
                                className=" relative bg-dark h-[2px] rounded-sm"
                            ></motion.div>
                        </div>

                        {section === 0 && <AdditionalInfo />}
                        {section === 1 && <PhotosLayout />}
                        {section === 2 && <ShoutsList />}
                        {section === 3 && <MutualList />}
                    </div>
                </div>
            )}
        </>
    );
}
