import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import pfetch from "../controllers/pfetch";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function ProfileItemForMyProfile({
    editingField,
    setEditingField,
    field,
    values,
    setValues,
    editable,
}) {
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [val, setVal] = useState(values[field]);
    const [loading, setLoading] = useState(false);

    async function handleDone(field) {
        try {
            const res = await pfetch("/betaresponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    field: field,
                    value: val,
                }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const response = await res.json();
            console.log("Response data:", response);
            if (response.data.hasOwnProperty("auth"))
                return navigate("/signin");

            if (response.status == "ERROR") {
                return toast.error(response.data.message);
            }
            toast.success(response.data.message);
            setValues({ ...values, [field]: val });
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setEditingField("");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (val.length < 1 || val.length > 26) {
            toast.error("Character length should be in between 1-26");
            setErr(true);
        } else {
            toast.success("This looks ok!");
            setErr(false);
        }
    }, [val]);

    return (
        <>
            <small>{field}</small>
            <div className="relative">
                {editingField == field ? (
                    <>
                        <Toaster position="bottom-center" richColors />
                        <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                                loading ? null : setVal(e.target.value)
                            }
                            className="w-[calc(100%-30px)]"
                        />
                    </>
                ) : (
                    values[field]
                )}
                <i
                    onClick={() => setEditingField(field)}
                    style={{
                        display:
                            editingField == "" && editable == true
                                ? "block"
                                : "none",
                    }}
                    className="absolute right-0 bottom-1 scale-75 fa-regular fa-pen-to-square transition-all hover:scale-100 cursor-pointer"
                ></i>
                <i
                    onClick={() => {
                        setLoading(true);
                        handleDone(field);
                    }}
                    style={{
                        display:
                            editingField == field && !err && !loading
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
                    height: editingField == field ? "3px" : "0px",
                    backgroundColor:
                        editingField == field && !err ? "#bbf7d0" : "#fb7185",
                }}
                className="transition-all bg-gre"
            />
        </>
    );
}
