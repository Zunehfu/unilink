import { useEffect, useState } from "react";
import LazyLoader from "../components/laoders/LazyLoader";
import { toast } from "sonner";

const EMAIL_REGEX =
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const UOM_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@uom\.lk$/;

export default function Step1Form({ setStep, setEmail, email }) {
    const [msg, setMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!EMAIL_REGEX.test(email)) {
            return setMsg("There is an issue with this email.");
        }
        if (!UOM_REGEX.test(email)) {
            return setMsg("Please enter your university email.");
        }
        setMsg(null);
    }, [email]);

    async function sendMail() {
        const res = await fetch(
            "http://localhost:8080/sendemailverificationtoken",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            }
        );

        if (!res.ok) throw new Err("BAD_RESPONSE");

        const response = await res.json();
        console.log({ response });
        if (response.status == "ERROR") {
            if (response.code == "EMAIL_EXISTS") {
                toast.error(
                    "The email address you entered is already in use. Would you like to try logging in instead?"
                );
            } else {
                toast.error(
                    "Whoops! Looks like there's a typo in the email address. Try again?"
                );
            }
        } else {
            setStep(2);
        }

        setLoading(false);
    }

    function handleClick() {
        if (loading) return;
        if (!EMAIL_REGEX.test(email) || !UOM_REGEX.test(email)) return;
        setLoading(true);
        sendMail();
    }
    return (
        <>
            <input
                className="px-4 border-2 rounded-md h-12 focus:border-emerald-300"
                type="text"
                placeholder="University email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                spellCheck={false}
            />
            {email.length > 0 && (
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
                    msg
                        ? "cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white opacity-50"
                        : "cursor-default flex justify-center bg-gradient-to-tr from-sky-500 to-emerald-500 p-3 rounded-md text-white"
                }
            >
                {loading ? (
                    <div className="py-1">
                        <LazyLoader />
                    </div>
                ) : (
                    "Send activation code"
                )}
            </button>
        </>
    );
}
