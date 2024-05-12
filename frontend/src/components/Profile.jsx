import anime from "animejs";
import React, { useState } from "react";
import ProfileItem from "./ProfileItem";

export default function Profile({ toggleProfileVisibility }) {
    const [edit, setEdit] = useState("");
    const [msg, setMsg] = useState("");

    // useState(() => {
    //     console.log("fwfwafw");
    //     anime({
    //         targets: ".lmfao",
    //         opacity: 0,
    //         duration: 3000,
    //     });
    // }, [msg]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm ">
                <div className="relative rounded-md h-[90vh] w-[90vw] max-w-[900px] bg-white overflow-y-scroll">
                    <div className="absolute top-28 h-20 w-full bg-green-950 shadow-md hidden sm:block">
                        <div className=" absolute left-[calc(50%+92px)] right-0 flex justify-center h-full items-center text-4xl">
                            <div className="absolute w-fit h-fit text-white tracking-[10px] font-bold">
                                MORA
                            </div>
                        </div>
                    </div>
                    <i
                        onClick={toggleProfileVisibility}
                        className="fa-solid fa-xmark relative left-1.5 top-0 cursor-pointer transition-all hover:scale-150"
                    ></i>

                    <div className="h-9 bg-white rounded-md text-center">
                        Your profile
                    </div>

                    <div className="flex justify-center">
                        <div className="relative z-10 w-48 h-48 border-2 border-white rounded-full overflow-hidden">
                            <img src="../../public/profile.jpg" alt="img" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-evenly">
                        <div className="m-3 min-w-60">
                            <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                Account Info
                            </div>
                            <ProfileItem
                                field="Username"
                                value="@deneth.official"
                            />
                            <ProfileItem field="Member since" value="date" />
                        </div>

                        <div className="m-3 min-w-60">
                            <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                Basic Info
                            </div>
                            <ProfileItem
                                field="Name"
                                value="Deneth Priyadarshana"
                            />
                            <ProfileItem field="Age" value="20" />

                            <ProfileItem
                                field="University"
                                value="University of Moratuwa"
                            />
                            <ProfileItem
                                field="Major"
                                value="BSc. Engineering Honours"
                            />
                            <ProfileItem field="Batch" value="2023" />
                            <ProfileItem
                                field="Relationship status"
                                value="Single"
                            />
                            <ProfileItem field="Gender" value="Male" />
                        </div>

                        <div className="m-3 min-w-60">
                            <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                Additional Info
                            </div>
                            <ProfileItem
                                field="Contact No"
                                value="0721432218"
                            />
                            <ProfileItem
                                field="Uni email"
                                value="priyadarshanasad.23@uom.lk"
                            />
                            <ProfileItem
                                field="Personal email"
                                value="sadpriyadarshana@gmail.com"
                            />
                            <ProfileItem
                                field="Personal website"
                                value="uni.link"
                            />
                            <ProfileItem field="Interested in" value="Women" />
                            <ProfileItem
                                field="Date of birth"
                                value="2003-10-20"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="top-1 left-0 right-0 fixed h-10 flex justify-center items-center">
                <div className="lmfao drop-shadow-[0_0px_5px_rgba(0,0,0,0.2)] text-red-500 text-center w-fit p-1 text-sm font-bold bg-white h-10 rounded-md">
                    This username is already taken
                </div>
            </div>
        </>
    );
}
