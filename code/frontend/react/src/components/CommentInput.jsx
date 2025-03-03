import { useState } from "react";
import SmallSpinner from "./laoders/SmallSpinner";
import Editor from "./editor/Editor";
import { toast } from "sonner";
import { usePfetch } from "../hooks/usePfetch";
import "../styles/comment-btn.css";
import Err from "../utils/errClass";
import { socket } from "../services/socket";
import { $getRoot } from "lexical";

export default function CommentInput({ posts, post_index, setPosts }) {
    const pfetch = usePfetch();
    const [editorState, setEditorState] = useState();
    const [loading, setLoading] = useState(false);
    const [len, setLen] = useState(0);

    function OnEditorStateChange(editorState) {
        setEditorState(editorState);
        editorState.read(() => {
            setLen($getRoot().getTextContent().length);
        });
    }

    function handleSubmission() {
        async function postComment() {
            try {
                await pfetch(
                    "/posts/" + posts[post_index].post_id + "/comments",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            content: JSON.stringify(editorState),
                        }),
                    }
                );
                socket.emit("on-add-comment", {
                    post_id: posts[post_index].post_id,
                });
                setPosts(
                    posts.map((post, i) =>
                        i === post_index
                            ? { ...post, comment_count: post.comment_count + 1 }
                            : post
                    )
                );
            } catch (err) {
                if (!(err instanceof Err)) {
                    console.error(err);
                    toast.error("Something went wrong.");
                }
            } finally {
                setLoading(false);
            }
        }

        setLoading(true);
        postComment();
    }

    return (
        <div className="relative w-full my-2 z-0">
            <Editor
                placeholder="Say something..."
                className={
                    len > 0
                        ? "py-1 pl-1 pr-8 rounded-md bg-gray-100  w-full outline-none max-h-28 overflow-y-scroll"
                        : "py-1 pl-1 pr-8 rounded-md w-full outline-none max-h-28 overflow-y-scroll"
                }
                placeholderClassName="absolute top-1 left-1 text-gray-400 pointer-events-none"
                topLevelEditorStateAccess={OnEditorStateChange}
            />

            {loading && (
                <div className="absolute -bottom-1 right-0 scale-50">
                    <SmallSpinner />
                </div>
            )}
            {!loading && len > 0 && (
                <button
                    className="comment-btn-container"
                    onClick={handleSubmission}
                >
                    <svg
                        className="comment-btn"
                        height="20"
                        width="20"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <linearGradient
                            id="linear-gradient"
                            gradientUnits="userSpaceOnUse"
                            x1="5.382"
                            x2="27.27"
                            y1="27.1"
                            y2="3.148"
                        >
                            <stop offset="0" stopColor="#00a1e2" />
                            <stop offset="1" stopColor="#00e0a5" />
                        </linearGradient>
                        <path
                            d="m30.707 1.293a1 1 0 0 0 -1.073-.224l-28 11a1 1 0 0 0 -.164 1.779l8 5a1 1 0 0 0 .977.047l5.317-2.659-2.659 5.317a1 1 0 0 0 .047.977l5 8a1 1 0 0 0 .848.47h.092a1 1 0 0 0 .839-.631l11-28a1 1 0 0 0 -.224-1.076z"
                            fill="url(#linear-gradient)"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}
