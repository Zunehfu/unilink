import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import pfetch from "../controllers/pfetch";
import { Bars } from "react-loader-spinner";

export default function PostText({ postData, toggleProfile }) {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentsVisibility, setCommentsVisibility] = useState(false);

    function toggleCommentsVisibility() {
        setCommentsVisibility(!commentsVisibility);
    }

    async function fetchComments() {
        try {
            const res = await pfetch(
                "/posts/" +
                    postData.post_id +
                    "/comments?from=" +
                    comments.length,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const response = await res.json();
            console.log("Response data:", response);

            if (response.data.hasOwnProperty("auth_fail"))
                return navigate("/signin");

            setComments([...comments, ...response.data]);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoadingComments(false);
        }
    }

    useEffect(() => {
        if (comments.length == 0 && commentsVisibility) {
            setLoadingComments(true);
            fetchComments();
        }
    }, [commentsVisibility]);

    return (
        <>
            <div className="border-2 w-96 m-2 rounded">
                <PostContent content={postData.content} />
                <hr />
                <PostDetails
                    user_id={postData.user_id}
                    created_at={postData.created_at}
                    toggleProfile={toggleProfile}
                />
                <PostStats
                    post_id={postData.post_id}
                    comments={comments}
                    toggleCommentsVisibility={toggleCommentsVisibility}
                />
            </div>
            <Comments
                comments={comments}
                commentsVisibility={commentsVisibility}
                toggleCommentsVisibility={toggleCommentsVisibility}
            />
            {!loadingComments && commentsVisibility && (
                <span
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                        setLoadingComments(true);
                        fetchComments();
                    }}
                >
                    Show more comments
                </span>
            )}
            {loadingComments && (
                <Bars
                    height="20"
                    width="20"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            )}
        </>
    );
}
