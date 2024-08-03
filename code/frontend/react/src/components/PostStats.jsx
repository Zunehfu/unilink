import { usePfetch } from "../hooks/usePfetch";
import "../styles/like-btn.css";

import Err from "../utils/errClass";
import { socket } from "../services/socket";
import { toast } from "sonner";

export default function PostStats({
    toggleCommentsVisibility,
    posts,
    post_index,
    setPosts,
}) {
    const pfetch = usePfetch();

    function handleShare() {
        toast.info("Link copied to clipbaord.", { position: "top-center" });
        navigator.clipboard.writeText(
            "https://youtu.be/LtIWE4CCX5M?si=1Aj5kLFbfi2enLbc"
        );
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
                toast.error("Something went wrong.");
                setPosts(posts);
            }
        }
    }

    return (
        <div className="flex justify-between mx-1 my-1.5">
            <div className="flex gap-4 items-center">
                <div className="flex gap-1.5">
                    <div className="heart-container">
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
                    <small>{posts[post_index].like_count}</small>
                </div>
                <div className="flex gap-1.5">
                    <div className="h-5 w-5 flex items-center justify-center">
                        <i
                            onClick={toggleCommentsVisibility}
                            className="fa-thin fa-comment cursor-pointer scale-125"
                        ></i>
                    </div>
                    <small>{posts[post_index].comment_count}</small>
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={handleShare}>
                    <i className="fa-thin fa-share cursor-pointer scale-110"></i>
                </button>
                <button
                    onClick={() => {
                        toast.info("This feature is yet to be implemented.", {
                            position: "top-center",
                        });
                    }}
                >
                    <i className="fa-thin fa-bookmark cursor-pointer scale-110"></i>
                </button>
            </div>
        </div>
    );
}
