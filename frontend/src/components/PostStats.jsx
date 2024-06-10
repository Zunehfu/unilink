import { useEffect, useState } from "react";
import { usePfetch } from "../hooks/usePfetch";
import "../styles/like-btn.css";
import "../styles/comment-btn.css";
import Err from "../utils/errClass";
import { socket } from "../services/socket";
import SmallSpinner from "./SmallSpinner";
import { toast } from "sonner";

export default function PostStats({
    toggleCommentsVisibility,
    posts,
    post_index,
    setPosts,
}) {
    const pfetch = usePfetch();
    const [content, setContent] = useState("");
    const [liked, setLiked] = useState(posts[post_index].liked);
    const [loading, setLoading] = useState(false);

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
                        body: JSON.stringify({ content }),
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
                    toast.error("Something went wrong");
                }
            } finally {
                setContent("");
                setLoading(false);
            }
        }

        setLoading(true);
        postComment();
    }

    async function handleLikeButton(e) {
        const isChecked = e.target.checked;
        const updatedPosts = posts.map((post, i) => {
            if (i === post_index) {
                return {
                    ...post,
                    liked: isChecked,
                    like_count: isChecked
                        ? post.like_count + 1
                        : post.like_count - 1,
                };
            }
            return post;
        });

        setPosts(updatedPosts);

        try {
            await pfetch("/posts/" + posts[post_index].post_id + "/likes", {
                method: isChecked ? "POST" : "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            socket.emit(isChecked ? "on-add-like" : "on-remove-like", {
                post_id: posts[post_index].post_id,
            });
        } catch (err) {
            if (!(err instanceof Err)) {
                console.error(err);
                toast.error("Something went wrong");
                setPosts(posts);
            }
        }
    }

    return (
        <div className="h-9 flex justify-around items-center m-1">
            <div className="flex">
                <div>
                    <div title="Like" className="heart-container">
                        <input
                            id={"like_btn_" + posts[post_index].post_id}
                            className="checkbox"
                            type="checkbox"
                            checked={posts[post_index].liked}
                            onChange={(e) => handleLikeButton(e)}
                        />
                        <div className="svg-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg-outline"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg-filled"
                                viewBox="0 0 24 24"
                            >
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="100"
                                width="100"
                                className="svg-celebrate"
                            >
                                <polygon points="10,10 20,20"></polygon>
                                <polygon points="10,50 20,50"></polygon>
                                <polygon points="20,80 30,70"></polygon>
                                <polygon points="90,10 80,20"></polygon>
                                <polygon points="90,50 80,50"></polygon>
                                <polygon points="80,80 70,70"></polygon>
                            </svg>
                        </div>
                    </div>
                </div>
                <small>{posts[post_index].like_count}</small>
            </div>
            <div className="flex">
                <i
                    onClick={toggleCommentsVisibility}
                    className="mr-2 py-[2px] fa-regular fa-comment cursor-pointer scale-125"
                ></i>
                <small>{posts[post_index].comment_count}</small>
            </div>
            <div className="flex relative items-center">
                <input
                    id={"comment_input_" + posts[post_index].post_id}
                    className="p-1 pr-8 rounded bg-black w-56"
                    type="text"
                    value={content}
                    placeholder="Say something..."
                    onChange={(e) => setContent(e.target.value)}
                />
                {loading ? (
                    <div className="absolute right-0 scale-50">
                        <SmallSpinner />
                    </div>
                ) : (
                    <svg
                        onClick={handleSubmission}
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
                )}
            </div>
        </div>
    );
}
