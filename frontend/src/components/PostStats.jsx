import { useState } from "react";
import { usePfetch } from "../hooks/usePfetch";
import { useNavigate } from "react-router-dom";

export default function PostStats({
    comments,
    post_id,
    toggleCommentsVisibility,
}) {
    const pfetch = usePfetch();
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function handleSubmission() {
        try {
            await pfetch("/posts/" + post_id + "/comments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
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
