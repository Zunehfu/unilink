import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { usePfetch } from "../hooks/usePfetch";
import userDataErrorHandler from "../utils/userDataErrorHandler";
import { toast } from "sonner";
import DropMenuForMyProfile from "./DropMenuForMyProfile";
import Err from "../utils/errClass";
import searchList from "../utils/searchList";
import getErrorMessage from "../utils/errorMessages";

export default function ProfileItemForMyProfile({
    editingField,
    setEditingField,
    field,
    values,
    setValues,
    editable,
    items,
}) {
    const pfetch = usePfetch();
    const [err, setErr] = useState(false);
    const [val, setVal] = useState(values[field]);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(items);

    async function handleDone(field) {
        try {
            const data = await pfetch("/betaresponse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    field: field,
                    value: val,
                }),
            });

            if (data.age_)
                setValues({ ...values, [field]: val, Age: data.age_ });
            else setValues({ ...values, [field]: val });

            toast.success("Profile updated successfully.", {
                position: "bottom-center",
            });
        } catch (err) {
            if (!(err instanceof Err)) {
                console.error(err.message);
            }
        } finally {
            setEditingField("");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (editingField == field) {
            if (items) {
                setList(searchList(items, val));
            }
            try {
                userDataErrorHandler(field, val);
                toast.success("Looks fine.", { position: "bottom-center" });
                setErr(false);
            } catch (err) {
                setErr(true);
                if (!(err instanceof Err)) {
                    console.error(err.message);
                    toast.error(err.message, { position: "bottom-center" });
                } else {
                    toast.error(getErrorMessage(err.message), {
                        position: "bottom-center",
                    });
                }
            }
        }
    }, [val]);

    return (
        <>
            <small>{field}</small>
            <div className="relative">
                {editingField == field ? (
                    <>
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
                <hr
                    style={{
                        height: editingField == field ? "3px" : "0px",
                        backgroundColor:
                            editingField == field && !err
                                ? "#bbf7d0"
                                : "#fb7185",
                    }}
                    className="transition-all"
                />
                {editingField == field && items && !items.includes(val) && (
                    <DropMenuForMyProfile items={list} setVal={setVal} />
                )}
            </div>
        </>
    );
}
