import React, { useEffect, useRef, useState } from "react";

import ProfilePicture from "./ProfilePicture";
import PhotosLayout from "./PhotosLayout";
import MutualList from "./MutualList";

import "../styles/profile.css";
import "../styles/profile-uni.css";

import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ShoutsList from "./ShoutsList";
import AdditionalInfo from "./AdditionalInfo";

export default function NewProfile() {
    const lscroll = useRef(new LocomotiveScroll());
    const [at, sat] = useState(1);

    useGSAP(() => {
        gsap.from(".number", {
            innerText: 0,
            duration: 3,
            snap: {
                innerText: 1,
            },
        });
    });
    useEffect(() => {
        if (at === 0) {
            gsap.to(".bottom-line", {
                x: -49,
                width: 35,
                duration: 0.2,
            });
        } else if (at === 2) {
            gsap.to(".bottom-line", {
                x: 116,
                width: 46,
                duration: 0.2,
            });
        } else if (at === 3) {
            gsap.to(".bottom-line", {
                x: 204,
                width: 49,
                duration: 0.2,
            });
        } else {
            gsap.to(".bottom-line", {
                x: 30,
                width: 45,
                duration: 0.2,
            });
        }
    }, [at]);

    return (
        //bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
        <div className="font-[Futura] text-white h-screen">
            <div className="h-[30%]">
                <div className="w-full fixed top-8">
                    <div className="flex justify-center">
                        <span className="metallic-shine overflow-hidden">
                            University of Moratuwa
                        </span>
                    </div>
                    <div className="flex justify-center font-mono">
                        <span className="bg-black px-4 rounded-b-full">
                            3rd year
                        </span>
                    </div>
                    <div className="mt-4 flex justify-center font-mono">
                        <span className="bg-black px-4 rounded-full">
                            Computer science and Engineering
                        </span>
                    </div>
                </div>
            </div>
            <div className="min-h-[70%] relative rounded-t-[60px] bg-dark flex flex-col">
                <div className="absolute left-[calc(50%-58px)] -top-[58px] bg-dark rounded-full">
                    <div className="m-2 flex">
                        <ProfilePicture size="100px" />
                    </div>
                </div>
                <div className="py-1 flex justify-around items-center">
                    <div className="text-center">
                        <b className="number">152</b>
                        <br />
                        Friends
                    </div>
                    <div className="text-center">
                        <b className="number">7</b>
                        <br />
                        Posts
                    </div>
                </div>
                <div className="py-2 text-center font-[Lexend] font-semibold">
                    @deneth.official
                </div>
                <div className="py-2 text-center">Deneth Priydarshana</div>
                <div className="mx-auto max-w-[628px] text-center">
                    A scenic landscape with a winding road stretching into the
                    horizon, flanked by lush greenery and majestic mountains.
                </div>

                <div className="h-10 my-4 flex bg-transparent">
                    <div className="w-1/2 relative">
                        <button className="bg-gradient-to-tr  from-indigo-500 via-20% via-sky-500 to-emerald-500  py-1 px-5 absolute right-1/3 rounded-full">
                            Be Pals
                        </button>
                    </div>
                    <div className="w-1/2 relative">
                        <button className="bg-white text-black py-1 px-5 absolute left-1/3 rounded-full">
                            Message
                        </button>
                    </div>
                </div>

                <div className=" flex justify-center gap-10">
                    <button onClick={() => sat(0)}>Stalk</button>
                    <button onClick={() => sat(1)}>Photos</button>
                    <button onClick={() => sat(2)}>Shouts</button>
                    <button className="relative" onClick={() => sat(3)}>
                        Mutual
                        <span className="ml-1 left-full leading-5 font-sans px-1 top-0.5 text-xs font-medium rounded-full absolute bg-sky-500 ">
                            1.2k
                        </span>
                    </button>
                </div>
                <div className="mb-2 flex justify-center">
                    <div
                        style={{ right: 81, width: 46 }}
                        className=" bottom-line relative bg-white h-[2px] "
                    ></div>
                </div>

                {at === 0 && <AdditionalInfo />}
                {at === 1 && <PhotosLayout />}
                {at === 2 && <ShoutsList />}
                {at === 3 && <MutualList />}
            </div>
        </div>
    );
}
