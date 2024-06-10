import LocomotiveScroll from "locomotive-scroll";
import "../styles/profile.css";

export default function PhotosLayout({}) {
    new LocomotiveScroll();
    return (
        <div className="grid-wrapper">
            <div className="tall ">
                <img
                    data-scroll
                    data-scroll-speed="0.1"
                    src="../../public/post2.jpg"
                    alt=""
                />
            </div>
            <div className="wide">
                <img
                    data-scroll
                    data-scroll-speed="-0.1"
                    src="../../public/post3.jpg"
                    alt=""
                />
            </div>
            <div>
                <img
                    data-scroll
                    data-scroll-speed="-0.1"
                    src="../../public/post1.jpg"
                    alt=""
                />
            </div>
            <div>
                <img
                    data-scroll
                    data-scroll-speed="-0.1"
                    src="../../public/profile.jpg"
                    alt=""
                />
            </div>
            <div className="tall wide">
                <img
                    data-scroll
                    data-scroll-speed="-0.1"
                    src="../../public/post6.jpeg"
                    alt=""
                />
            </div>
            <div className="">
                <img
                    data-scroll
                    data-scroll-speed="0.1"
                    src="../../public/post4.jpeg"
                    alt=""
                />
            </div>
            <div className="">
                <img
                    data-scroll
                    data-scroll-speed="-0.1"
                    src="../../public/post5.jpeg"
                    alt=""
                />
            </div>
        </div>
    );
}
