import anime from "animejs";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import pfetch from "../controllers/pfetch";
import { useNavigate } from "react-router-dom";

export default function ProfileItem({
    edit,
    setEdit,
    field,
    values,
    setValues,
}) {
    const navigate = useNavigate();
    const [msg, setMsg] = useState({ type: "", msg: "" });
    const [val, setVal] = useState(values[field]);
    const [loading, setLoading] = useState(false);

    function handleEdit(field) {
        setEdit(field);
    }

    async function handleDone(field) {
        setLoading(true);

        try {
            const res = await pfetch("/betaresponse", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const data = await res.json();
            console.log("Response data:", data);
            if (data.hasOwnProperty("auth")) return navigate("/signin");
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
            setEdit("");
            setValues({ ...values, [field]: val });
        }
    }

    useEffect(() => {
        console.log(val);
        if (val.length < 1 || val.length > 14) {
            setMsg({
                type: "err",
                msg: "Use a character length between 1-14",
            });
        } else {
            setMsg({
                type: "ok",
                msg: "This looks ok!",
            });
        }

        anime.set(".msg", {
            scale: 0.7,
        });

        anime({
            targets: ".msg",
            scale: 1,
        });
    }, [val]);

    return (
        <>
            <small>{field}</small>
            <div className="relative">
                {edit == field ? (
                    <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                            loading ? null : setVal(e.target.value)
                        }
                        className="w-[calc(100%-30px)]"
                    />
                ) : (
                    values[field]
                )}
                <i
                    onClick={() => handleEdit(field)}
                    style={{
                        display: edit == "" ? "block" : "none",
                    }}
                    className="absolute right-0 bottom-1 scale-75 fa-regular fa-pen-to-square transition-all hover:scale-100 cursor-pointer"
                ></i>
                <i
                    onClick={() => handleDone(field)}
                    style={{
                        display:
                            edit == field && msg.type == "ok" && !loading
                                ? "block"
                                : "none",
                    }}
                    className="absolute right-0 bottom-1 scale-75 fa-solid fa-circle-check transition-all hover:scale-100 cursor-pointer"
                ></i>
                {loading && (
                    <div className="absolute right-0 bottom-[1px]">
                        <Bars
                            height="25"
                            width="25"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                )}
            </div>
            <hr
                style={{
                    height: edit == field ? "3px" : "0px",
                    backgroundColor:
                        edit == field && msg.type == "ok"
                            ? "#bbf7d0"
                            : "#fb7185",
                }}
                className="transition-all bg-gre"
            />
            {edit == field &&
                (msg.type == "ok" ? (
                    <div className="msg z-50 top-1 left-0 right-0 fixed h-10 flex justify-center items-center">
                        <div className="font-medium bg-green-100 text-green-500 text-center w-fit px-4 py-1.5 text-sm h-10 rounded-md">
                            {msg.msg}
                        </div>
                    </div>
                ) : (
                    <div className="msg z-50 top-1 left-0 right-0 fixed h-10 flex justify-center items-center">
                        <div className="font-medium bg-red-100 text-red-500 text-center w-fit px-4 py-1.5 text-sm h-10 rounded-md">
                            {msg.msg}
                        </div>
                    </div>
                ))}
        </>
    );
}
