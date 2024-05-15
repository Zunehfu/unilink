import { useState } from "react";
import pfetch from "../controllers/pfetch";
import { useNavigate } from "react-router-dom";

export default function PostStats({
    comments,
    post_id,
    toggleCommentsVisibility,
}) {
    console.log({ post_id });
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function handleSubmission() {
        try {
            const res = await pfetch("/posts/" + post_id + "/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const response = await res.json();
            console.log("Response data:", response);
            if (response.data.hasOwnProperty("auth_fail"))
                return navigate("/signin");
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
                <small>{comments.length}</small>{" "}
                <i
                    onClick={toggleCommentsVisibility}
                    className="fa-regular fa-comment cursor-pointer"
                ></i>
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
