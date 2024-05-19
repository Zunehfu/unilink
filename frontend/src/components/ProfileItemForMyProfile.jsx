import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import pfetch from "../utils/pfetch";
import userDataErrorHandler from "../utils/userDataErrorHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DropMenuForMyProfile from "./DropMenuForMyProfile";

function searchList(list, searchTerm) {
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/%/g, "");
    const calculateScore = (item, searchTerm) => {
        const normalizedItem = item.toLowerCase();

        if (normalizedItem === searchTerm) return 3;

        if (
            normalizedItem.startsWith(searchTerm) ||
            normalizedItem.endsWith(searchTerm)
        )
            return 2;

        if (normalizedItem.includes(searchTerm)) return 1;

        return 0;
    };
    const scoredList = list.map((item) => ({
        item,
        score: calculateScore(item, normalizedSearchTerm),
    }));
    const filteredList = scoredList.filter(
        (scoredItem) => scoredItem.score > 0
    );
    filteredList.sort((a, b) => b.score - a.score);
    return filteredList.map((scoredItem) => scoredItem.item);
}

export default function ProfileItemForMyProfile({
    editingField,
    setEditingField,
    field,
    values,
    setValues,
    editable,
    items,
}) {
    const navigate = useNavigate();
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
            toast.success(data.message);
        } catch (err) {
            if (err.code === "AUTH_FAIL") return navigate("/signin");
            toast.error(err.message);
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
                toast.success("This looks ok!");
                setErr(false);
            } catch (err) {
                toast.error(err.message);
                setErr(true);
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
