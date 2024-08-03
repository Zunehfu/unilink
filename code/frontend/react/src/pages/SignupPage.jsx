import { useState } from "react";
import Logo from "../components/Logo";
import { Toaster } from "sonner";

import Step1Form from "../components/Step1Form";
import Step2Form from "../components/Step2Form";
import Step3Form from "../components/Step3Form";
import Step4Form from "../components/Step4Form";

export default function SignupPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [university, setUniversity] = useState("");

    return (
        <>
            <Toaster richColors />
            <div className="bg-dark md:bg-gray-200 w-screen h-screen flex">
                <button
                    onClick={() => {
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth",
                        });
                    }}
                    className="right-2 fixed text-gray-400 cursor-pointer hover:underline underline-offset-2"
                >
                    Learn more
                </button>
                <div className="px-4 bg-white hidden md:flex flex-col justify-center items-center w-[32vw] gap-3">
                    <div>
                        <Logo />
                    </div>
                    <div className="text-center text-gray-400">
                        UniLink helps you connect and share with students and
                        faculty at universities across Sri Lanka.
                    </div>
                </div>
                <div className=" flex flex-col gap-10  items-center justify-center md:w-[68vw] w-screen">
                    <div className="md:hidden flex flex-col justify-center items-center w-[32vw] gap-3">
                        <div>
                            <Logo />
                        </div>
                        <div className="text-center text-gray-300 w-96">
                            UniLink helps you connect and share with students
                            and faculty at universities across Sri Lanka.
                        </div>
                    </div>
                    {step == 3 && (
                        <div className="gradient-text leading-[40px] text-center px-10 text-[25px]">
                            We are glad to have more people from the{" "}
                            <span className="inline-block font-semibold">
                                {university}
                            </span>{" "}
                            on board.
                        </div>
                    )}
                    <div className="shadow-md p-4 gap-4 flex flex-col w-96 bg-white rounded-xl">
                        {step == 4 && (
                            <Step1Form
                                setStep={setStep}
                                email={email}
                                setEmail={setEmail}
                            />
                        )}
                        {step == 2 && (
                            <Step2Form
                                setStep={setStep}
                                setEmail={setEmail}
                                setUniversity={setUniversity}
                                setToken={setToken}
                                token={token}
                            />
                        )}
                        {step == 3 && (
                            <Step3Form
                                email={email}
                                token={token}
                                setStep={setStep}
                            />
                        )}
                        {step == 1 && <Step4Form />}
                    </div>
                </div>
            </div>
            <div className="justify-center flex flex-col h-32 bg-dark text-white">
                <div className="text-center">
                    <button className="hover:underline underline-offset-2">
                        Privacy
                    </button>{" "}
                    &#x2022;{" "}
                    <button className="hover:underline underline-offset-2">
                        Terms & Conditions
                    </button>{" "}
                    &#x2022;{" "}
                    <button className="hover:underline underline-offset-2">
                        Cookies
                    </button>
                </div>
                <div className="text-center">&copy; 2024 UniLink</div>
            </div>
        </>
    );
}
