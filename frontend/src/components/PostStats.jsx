import { useState } from "react";
import pfetch from "../controllers/pfetch";

export default function PostStats({ replies, setReplies, postId, navigate }) {
    const [content, setContent] = useState("");

    async function handleSubmission() {
        try {
            const res = await pfetch("/posts/" + postId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content, hideme: false }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const data = await res.json();
            console.log("Response data:", data);
            if (data.hasOwnProperty("auth")) return navigate("/signin");
            setReplies(data);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setContent("");
        }
    }

    return (
        <div className="h-9 flex justify-around items-center">
            <div>
                <small>991</small> <i className="fa-regular fa-heart"></i> |{" "}
                <small>{replies.length}</small>{" "}
                <i className="fa-regular fa-comment"></i>
            </div>
            <div>
                <input
                    className="border-2 rounded"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <button
                    className="bg-red-400 rounded p-0.5"
                    onClick={handleSubmission}
                >
                    comment
                </button>
            </div>
        </div>
    );
}
