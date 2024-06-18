import { useState } from "react";
import Logo from "../components/Logo";
import { usePfetch } from "../hooks/usePfetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
    const pfetch = usePfetch();
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSignin() {
        try {
            const data = await pfetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    pass,
                }),
            });

            Cookies.set("token", data.token, {
                expires: data.expires,
            });
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
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
                    <div className="shadow-md p-4 gap-3 flex flex-col w-96 bg-white rounded-xl">
                        <div className="text-gray-300 text-sm font-medium text-center">
                            Skip sign-in by syncing your favourite account.
                        </div>
                        <button className="p-2 flex bg-gray-200 rounded-md">
                            <div className="h-6 w-6 overflow-hidden flex items-center justify-center">
                                <img
                                    className="h-7 block object-cover"
                                    src="google.png"
                                    alt=""
                                />
                            </div>
                            <div className="w-full items-center flex justify-center">
                                Connect with Google
                            </div>
                        </button>
                        <button className="p-2 text-white flex bg-black rounded-md">
                            <div className=" h-6 w-6 overflow-hidden flex items-center justify-center">
                                <img
                                    className="h-6 block object-cover"
                                    src="apple-64.png"
                                    alt=""
                                />
                            </div>
                            <div className="w-full items-center flex justify-center">
                                Connect with Apple
                            </div>
                        </button>
                        <button className="p-2 text-white flex bg-[#1877F2] rounded-md">
                            <div className="h-6 w-6 overflow-hidden flex items-center justify-center">
                                <img
                                    className="h-6 block object-cover"
                                    src="facebook.png"
                                    alt=""
                                />
                            </div>
                            <div className="w-full items-center flex justify-center">
                                Connect with Facebook
                            </div>
                        </button>
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
