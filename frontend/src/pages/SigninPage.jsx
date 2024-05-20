import { useState } from "react";
import Logo from "../components/Logo";
import { usePfetch } from "../hooks/usePfetch";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function SigninPage() {
    const pfetch = usePfetch();
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
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
        <div className="flex items-center justify-center h-screen w-screen bg-green-200">
            <div className="w-96 h-96 bg-white rounded-lg">
                <div className="w-full text-center mt-24">Username</div>
                <div className="w-full flex justify-center">
                    <input
                        className="bg-gray-200 w-64 rounded-sm"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className="w-full text-center">Password</div>
                <div className="w-full flex justify-center rounded-sm">
                    <input
                        className="bg-gray-200 w-64"
                        type="password"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                    />
                </div>
                <div className="w-full mt-10">
                    <button
                        onClick={handleSignin}
                        className="font-bold bg-green-200 text-green-500 w-full h-10"
                    >
                        Sign in
                    </button>
                </div>
                <div className="flex justify-center mt-7">
                    <Logo />
                </div>
                <div className="text-center bottom text-green-200">
                    <small>All rights reserved ©</small>
                </div>
            </div>
        </div>
    );
}
