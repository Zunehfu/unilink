import React, { useEffect, useLayoutEffect, useRef } from "react";
import Logo from "../components/Logo";
import "../styles/signup.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LocomotiveScroll from "locomotive-scroll";

export default function Signup() {
    //initializing locomotive scroll
    const locomotiveScroll = useRef(new LocomotiveScroll());

    const lcontainer = useRef(null);
    const row1 = useRef(null);
    const row2 = useRef(null);
    const sel = useRef(null);
    const uel = useRef(null);
    const lel = useRef(null);

    useEffect(() => {
        locomotiveScroll.current.removeScrollElements(uel.current);
        locomotiveScroll.current.removeScrollElements(lel.current);
        locomotiveScroll.current.removeScrollElements(sel.current);
    }, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(lcontainer.current, {
            scale: 2,

            scrollTrigger: {
                trigger: row1.current,
                start: "top top",
                end: "bottom top",
                markers: true,
                pin: true,
                scrub: true,
                onEnter: ({ progress, direction, isActive }) => {
                    console.log(progress, direction, isActive);
                },

                onLeave: ({ progress, direction, isActive }) => {
                    locomotiveScroll.current.addScrollElements(uel.current);
                    locomotiveScroll.current.addScrollElements(lel.current);
                    locomotiveScroll.current.addScrollElements(sel.current);
                    console.log(progress, direction, isActive);
                },
            },
        });
    });

    return (
        <>
            <div
                ref={row1}
                className="row1 h-screen flex items-center justify-center"
            >
                <div
                    ref={lcontainer}
                    className="lcontainer font-[Futura] inline-block text-6xl bg-transparent"
                >
                    <div
                        data-scroll
                        data-scroll-speed="0.3"
                        ref={uel}
                        className="gradient-text inline-block"
                    >
                        uni
                    </div>
                    <div
                        data-scroll
                        data-scroll-speed="-0.1"
                        ref={sel}
                        className="text-emerald-500 inline-block"
                    >
                        |
                    </div>
                    <div
                        data-scroll
                        data-scroll-speed="0.3"
                        ref={lel}
                        className="gradient-text inline-block"
                    >
                        ink
                    </div>
                </div>
            </div>
            <div
                ref={row2}
                className="row2 h-screen flex items-center justify-center"
            ></div>
            <div className=" h-screen flex items-center justify-center">
                <div className="font-[Futura] inline-block text-6xl bg-transparent">
                    <span className="gradient-text">uni</span>
                    <span className="gradient-text">|</span>
                    <span className="gradient-text">ink</span>
                </div>
            </div>
        </>
    );
}
