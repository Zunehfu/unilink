import { useEffect, useState } from "react";
import LazyLoader from "./laoders/LazyLoader";

const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export default function Step3Form({ token, email, setStep }) {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [repass, setRepass] = useState("");
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uloading, setUloading] = useState(false);
    const [umsg, setUmsg] = useState(null);

    async function checkUsername() {
        const res = await fetch(
            "http://localhost:8080/checkusername?username=" + username,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) throw new Err("BAD_RESPONSE");
        const response = await res.json();

        if (response.status == "ERROR") {
            setUmsg("This username isn't available.");
        } else {
            setUmsg(null);
        }
        setUloading(false);
    }

    async function verifySignup() {
        const res = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                username,
                pass,
            }),
        });

        if (!res.ok) throw new Err("BAD_RESPONSE");
        const response = await res.json();
        //handle errors
        if (response.status == "ERROR") {
            alert("Something went wrong!");
        } else {
            setStep(4);
        }
        setLoading(false);
    }

    function handleClick() {
        if (loading) return;
        if (umsg || !PASSWORD_REGEX.test(pass) || pass != repass) return;
        setLoading(true);
        verifySignup();
    }

    useEffect(() => {
        if (username.length == 0) return;
        if (!USERNAME_REGEX.test(username))
            return setUmsg(
                "Username must be 8-20 characters long, consisting of letters, numbers, underscore or dot, but cannot start/end with them, have them next to each other, or be used repeatedly."
            );

        setUloading(true);
        checkUsername();
    }, [username]);

    return (
        <>
            <div className="h-12 border-2 rounded-md bg-gray-100 text-gray-400 px-4 flex items-center">
                {email}
            </div>
            <div className="relative">
                <input
                    className="w-full pl-4 pr-10 border-2 rounded-md h-12 focus:border-emerald-300"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    spellCheck={false}
                ></input>
                {uloading && (
                    <div className="absolute top-4 right-3.5 text-emerald-500">
                        <LazyLoader />
                    </div>
                )}
            </div>

            {username.length > 0 && umsg && (
                <div className="text-xs text-red-500 font-medium">{umsg}</div>
            )}
            {username.length > 0 && !umsg && (
                <div className="text-xs text-green-300 font-medium">
                    This username is available. Signup soon before its gone.
                </div>
            )}
            <div className="relative">
                <input
                    className="w-full pl-4 pr-10 border-2 rounded-md h-12 focus:border-emerald-300"
                    type={visibility ? "text" : "password"}
                    placeholder="Enter a password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    spellCheck={false}
                />
                <button
                    onClick={() => setVisibility(!visibility)}
                    className="absolute top-3 right-3 text-gray-400"
                >
                    {visibility ? (
                        <i className="mr-[1px] fa-light fa-eye"></i>
                    ) : (
                        <i className="fa-light fa-eye-slash"></i>
                    )}
                </button>
            </div>

            {pass.length > 0 && !PASSWORD_REGEX.test(pass) && (
                <div className="text-xs text-red-500 font-medium">
                    Your password must be at least 8 characters long and include
                    a mix of uppercase and lowercase letters and numbers.
                </div>
            )}

            <input
                className="px-4 border-2 rounded-md h-12 focus:border-emerald-300"
                type="password"
                placeholder="Re-enter the password"
                value={repass}
                onChange={(e) => setRepass(e.target.value)}
                spellCheck={false}
            />
            {repass != pass && repass.length > 0 && pass.length > 0 && (
                <div className="text-xs text-red-500 font-medium">
                    Passwords do not match.
                </div>
            )}
            <button
                onClick={handleClick}
                className={
                    umsg || !PASSWORD_REGEX.test(pass) || repass != pass
                        ? "cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white opacity-50"
                        : "cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white"
                }
            >
                {loading ? (
                    <div className="py-1">
                        <LazyLoader />
                    </div>
                ) : (
                    "Signup"
                )}
            </button>
        </>
    );
}
