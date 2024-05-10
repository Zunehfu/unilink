import React, { createElement, useEffect } from "react";
import anime from "animejs";
import Logo from "./Logo";

export default function Loader() {
    useEffect(() => {
        anime({
            targets: ".box",
            keyframes: [{ scale: 0 }, { scale: 1 }, { scale: 0 }],
            easing: "easeInOutQuad",
            duration: 1000,
            loop: true,
            delay: anime.stagger(100),
            direction: "alternate",
        });

        anime({
            targets: ".ball",
            translateX: [
                { value: 250, duration: 1000, delay: 500 },
                { value: 0, duration: 1000, delay: 500 },
            ],
            translateY: [
                { value: -40, duration: 500 },
                { value: 40, duration: 500, delay: 1000 },
                { value: 0, duration: 500, delay: 1000 },
            ],
            scaleX: [
                { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
                { value: 1, duration: 900 },
                { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
                { value: 1, duration: 900 },
            ],
            scaleY: [
                { value: [1.75, 1], duration: 500 },
                { value: 2, duration: 50, delay: 1000, easing: "easeOutExpo" },
                { value: 1, duration: 450 },
                {
                    value: 1.75,
                    duration: 50,
                    delay: 1000,
                    easing: "easeOutExpo",
                },
                { value: 1, duration: 450 },
            ],
            easing: "easeOutElastic(1, .8)",
            loop: true,
        });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-screen overflow-hidden">
            <div className="top-[calc(50%-15px)] left-[calc(50%-130px)] absolute ball bg-green-400 h-4 w-4 rounded-full"></div>
            <div className="absolute top-[calc(50%-30px)]">
                <Logo />
            </div>
            <div className="top-0 left-0 h-5 w-5 absolute box bg-green-300 "></div>
            <div className="top-0 right-0 h-20 w-10 absolute box bg-green-300 "></div>
            <div className="bottom-0 left-0 h-10 w-20 absolute box bg-green-300 "></div>
            <div className="top-40 left-48 h-5 w-5 absolute box bg-green-300 "></div>
            <div className="bottom-0 right-0 h-24 w-8 absolute box bg-green-300 "></div>
            <div className="bottom-40 right-48 h-5 w-5 absolute box bg-green-300 "></div>
            <div className="bottom-48 left-48 h-5 w-5 absolute box bg-green-300 "></div>
            <div className="bottom-36 right-64 h-24 w-8 absolute box bg-green-300 "></div>
            <div className="top-64 right-28 h-5 w-5 absolute box bg-green-300 "></div>
            <div className="top-28 left-36 h-5 w-5 absolute box bg-green-300 "></div>
        </div>
    );
}
