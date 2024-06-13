import Logo from "../Logo";
export default function Loader() {
    return (
        <div className="w-screen h-screen bg-white flex justify-center items-center">
            <div className=" relative">
                <div className="absolute top-44 left-[142px]">
                    <Logo />
                </div>
                <svg
                    className="relative"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    height={400}
                    width={400}
                >
                    <circle
                        fill="none"
                        strokeOpacity="1"
                        stroke="#10B981"
                        strokeWidth=".5"
                        cx="100"
                        cy="100"
                        r="0"
                    >
                        <animate
                            attributeName="r"
                            calcMode="spline"
                            dur="2"
                            values="1;80"
                            keyTimes="0;1"
                            keySplines="0 .2 .5 1"
                            repeatCount="indefinite"
                        ></animate>
                        <animate
                            attributeName="stroke-width"
                            calcMode="spline"
                            dur="2"
                            values="0;25"
                            keyTimes="0;1"
                            keySplines="0 .2 .5 1"
                            repeatCount="indefinite"
                        ></animate>
                        <animate
                            attributeName="stroke-opacity"
                            calcMode="spline"
                            dur="2"
                            values="1;0"
                            keyTimes="0;1"
                            keySplines="0 .2 .5 1"
                            repeatCount="indefinite"
                        ></animate>
                    </circle>
                </svg>
            </div>
        </div>
    );
}
