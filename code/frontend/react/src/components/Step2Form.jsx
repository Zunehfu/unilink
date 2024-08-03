import { useEffect, useState } from "react";
import LazyLoader from "./laoders/LazyLoader";
import { toast } from "sonner";

export default function Step2Form({
    setStep,
    setEmail,
    setToken,
    setUniversity,
    token,
}) {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    async function verifyToken() {
        const res = await fetch(
            "http://localhost:8080/verifyemailverificationtoken",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                }),
            }
        );
        if (!res.ok) throw new Err("BAD_RESPONSE");
        const response = await res.json();
        console.log({ response });

        if (response.status == "ERROR") {
            setMsg("This activation code is invalid.");
            toast.error(
                "The activation code you entered might have expired. If you received the code a while ago, please request a new one."
            );
        } else {
            setStep(3);
            setUniversity(response.data.university);
            setEmail(response.data.email);
            setToken(response.data.token);
        }
        setLoading(false);
    }

    function handleClick() {
        if (loading) return;
        if (token.length == 0) return;
        setLoading(true);
        verifyToken();
    }
    useEffect(() => {
        setMsg(null);
    }, [token]);

    return (
        <>
            <input
                className="text-center px-4 border-2 rounded-md h-12 focus:border-emerald-300"
                type="text"
                placeholder="Activation code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            {token.length > 0 && (
                <div className="text-xs text-red-500 font-medium">
                    {msg ? (
                        msg
                    ) : (
                        <span className="text-emerald-300">
                            You are good to go.
                        </span>
                    )}
                </div>
            )}
            <button
                onClick={handleClick}
                className={
                    token.length == 0
                        ? "cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white opacity-50"
                        : "cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white"
                }
            >
                {loading ? (
                    <div className="py-1">
                        <LazyLoader />
                    </div>
                ) : (
                    "Verify"
                )}
            </button>
        </>
    );
}
