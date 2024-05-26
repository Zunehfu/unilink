import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Comments from "./Comments";
import { useEffect, useRef, useState } from "react";
import { usePfetch } from "../hooks/usePfetch";
import { Bars } from "react-loader-spinner";
import { socket } from "../services/socket";

export default function PostText({ postData }) {
    const pfetch = usePfetch();
    const [liked, setLiked] = useState(postData.liked);
    const [like_count, setLike_count] = useState(postData.like_count);
    const [comment_count, setComment_count] = useState(postData.comment_count);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [commentsVisibility, setCommentsVisibility] = useState(false);
    const lref = useRef(like_count);

    function toggleCommentsVisibility() {
        setCommentsVisibility(!commentsVisibility);
    }

    async function fetchComments() {
        try {
            const data = await pfetch(
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

            setComments([...comments, ...data]);
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        } finally {
            setLoadingComments(false);
        }
    }

    useEffect(() => {
        lref.current = like_count;
    }, [like_count]);

    useEffect(() => {
        function handleOnUserAddLike(data) {
            if (postData.post_id == data.post_id)
                setLike_count(lref.current + 1);
        }
        function handleOnUserRemoveLike(data) {
            if (postData.post_id == data.post_id)
                setLike_count(lref.current - 1);
        }
        socket.on("on-user-add-like", handleOnUserAddLike);
        socket.on("on-user-remove-like", handleOnUserRemoveLike);
        return () => {
            socket.off("on-user-add-like", handleOnUserAddLike);
            socket.off("on-user-remove-like", handleOnUserRemoveLike);
        };
    }, []);

    useEffect(() => {
        if (comments.length == 0 && commentsVisibility) {
            setLoadingComments(true);
            fetchComments();
        }
    }, [commentsVisibility]);

    return (
        <>
            <div className="w-96 my-2 rounded-xl bg-dark text-white px-1">
                <PostDetails
                    user_id={postData.user_id}
                    created_at={postData.created_at}
                />
                <hr />
                <PostContent content={postData.content} />
                <hr />
                <PostStats
                    post_id={postData.post_id}
                    setLiked={setLiked}
                    comments={comments}
                    liked={liked}
                    like_count={like_count}
                    setLike_count={setLike_count}
                    comment_count={comment_count}
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
