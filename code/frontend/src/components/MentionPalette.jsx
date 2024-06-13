import React, { useContext, useEffect, useState } from "react";
import MentionCard from "./MentionCard";
import { MentionContext } from "../contexts/MentionContext";
import Err from "../utils/errClass";
import { usePfetch } from "../hooks/usePfetch";
import { ThreeDots } from "react-loader-spinner";

export default function MentionPalette() {
    const { mention } = useContext(MentionContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const pfetch = usePfetch();

    useEffect(() => {
        setLoading(true);
        const fetchResults = async () => {
            try {
                const data = await pfetch("/search?q=" + mention, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setUsers(data);
            } catch (err) {
                if (!(err instanceof Err)) console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [mention]);
    return (
        <div className="bg-transparent z-20 fixed bottom-0 w-full">
            <div className="relative bg-black flex justify-center items-center w-full h-14 rounded-t-full">
                <span className="text-white font-mono">@{mention}</span>
                <div className="absolute top-2">
                    <span className="cursor-pointer border-8 w-2 border-transparent border-t-white"></span>
                </div>
            </div>
            <div className="px-1 bg-black  w-full h-32 flex justify-center items-center">
                {loading ? (
                    <ThreeDots
                        visible={true}
                        height="60"
                        width="60"
                        color="rgb(16, 185, 129)"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                ) : (
                    <div className="h-full flex flex-row overflow-x-scroll">
                        {users.map((item) => (
                            <MentionCard key={item.user_id} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
