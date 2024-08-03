import { useContext, useEffect, useState } from "react";

import ProfilePicture from "./ProfilePicture";
import PhotosLayout from "./PhotosLayout";
import "../styles/profile.css";
import "../styles/profile-uni.css";
import ShoutsList from "./ShoutsList";
import AdditionalInfo from "./AdditionalInfo";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Err from "../utils/errClass";
import { usePfetch } from "../hooks/usePfetch";
import { ProfileContext } from "../contexts/ProfileContext";

export default function Profile() {
    const [section, setSection] = useState(2);
    const pfetch = usePfetch();
    const [loading, setLoading] = useState(true);
    const { activeProfileData, setActiveProfileData } =
        useContext(ProfileContext);
    const [animationProps, setAnimationProps] = useState({
        translateX: 0,
        width: 46,
    });
    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await pfetch("/users?user_id=myprofile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setActiveProfileData(data);
            } catch (err) {
                if (!(err instanceof Err)) {
                    console.error(err);
                    toast.error("Something went wrong.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        switch (section) {
            case 0:
                setAnimationProps({ translateX: -181, width: 48 });
                break;
            case 1:
                setAnimationProps({ translateX: -90, width: 45 });
                break;

            default:
                setAnimationProps({ translateX: 0, width: 46 });
        }
    }, [section]);

    return (
        <>
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
                <div className="fixed top-0 bg-body bg-dot-texture font-ight text-[14px] md:text-[17px] text-dark h-screen w-screen overflow-y-scroll">
                    <div className="h-[30%]">
                        <div className="w-full fixed top-8">
                            <div className="flex justify-center">
                                <span className="metallic-shine overflow-hidden">
                                    {activeProfileData.university}
                                </span>
                            </div>
                            <div className="flex justify-center font-mono">
                                <span className="bg-dark text-offwhite px-4 rounded-b-full">
                                    3rd year
                                </span>
                            </div>
                            <div className="mt-4 flex justify-center font-mono">
                                <span className="bg-dark text-offwhite px-4 rounded-full">
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
                        <div className="md:py-2 mx-auto max-w-[628px] text-center">
                            A scenic landscape with a winding road stretching
                            into the horizon, flanked by lush greenery and
                            majestic mountains.
                        </div>
                        <div className="flex justify-center my-5 text-offwhite rounded-full">
                            <div className="rounded-md bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-500 inline-block">
                                <button className="bg-offwhite text-dark opacity-30 rounded-md py-1 px-5">
                                    Profile settings
                                </button>
                            </div>
                        </div>
                        <div className=" flex justify-center gap-11">
                            <button onClick={() => setSection(0)}>
                                Details
                            </button>
                            <button
                                className="relative"
                                onClick={() => setSection(1)}
                            >
                                Photos
                                <span className="text-offwhite ml-1 left-full leading-5 px-1 top-0.5 text-xs font-medium rounded-full absolute bg-sky-500 ">
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
                        </div>
                        <div className="mb-2 flex justify-center">
                            <motion.div
                                initial={{ translateX: 0, width: 46 }}
                                animate={animationProps}
                                transition={{ duration: 0.2 }}
                                className="left-[91px] w-[46px] relative bg-dark h-[2px] rounded-sm"
                            ></motion.div>
                        </div>

                        {section === 0 && <AdditionalInfo />}
                        {section === 1 && <PhotosLayout />}
                        {section === 2 && <ShoutsList />}
                    </div>
                </div>
            )}
        </>
    );
}
