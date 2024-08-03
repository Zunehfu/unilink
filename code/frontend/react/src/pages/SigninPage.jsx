import { useState } from "react";
import Logo from "../components/Logo";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ConnectAPI from "../components/ConnectAPI";
import LazyLoader from "../components/laoders/LazyLoader";
import { Toaster, toast } from "sonner";

export default function SigninPage() {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function performSignin() {
        const res = await fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                pass,
            }),
        });

        if (!res.ok) throw new Err("BAD_RESPONSE");
        const response = await res.json();

        setLoading(false);
        if (response.status == "ERROR")
            return toast.error("Username or password is incorrect.");

        Cookies.set("token", response.data.token, {
            expires: response.data.expires,
        });
        navigate("/");
    }

    function handleSignin() {
        setLoading(true);
        performSignin();
    }

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
                        faculty at universities across{" "}
                        <div className="inline-block">Sri Lanka</div>.
                    </div>
                </div>
                <div className=" flex flex-col gap-10  items-center justify-center md:w-[68vw] w-screen">
                    <div className="md:hidden flex flex-col justify-center items-center w-[32vw] gap-3">
                        <div>
                            <Logo />
                        </div>
                        <div className="text-center text-gray-300 w-96">
                            UniLink helps you connect and share with students
                            and faculty at universities across{" "}
                            <div className="inline-block">Sri Lanka</div>.
                        </div>
                    </div>
                    <div className="shadow-md p-4 gap-4 flex flex-col w-96 bg-white rounded-xl">
                        <input
                            className="px-4 border-2 rounded-md h-12 focus:border-emerald-300"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            spellCheck={false}
                        />
                        <input
                            className="px-4 border-2 rounded-md h-12 focus:border-emerald-300"
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            spellCheck={false}
                        />

                        <button
                            onClick={handleSignin}
                            className="cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white"
                        >
                            {loading ? (
                                <div className="py-1">
                                    <LazyLoader />
                                </div>
                            ) : (
                                "Signin"
                            )}
                        </button>
                    </div>
                    <div className="w-96">
                        <ConnectAPI />
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
