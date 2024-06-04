import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Comments from "./Comments";
import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";

export default function PostText({ postData }) {
    const [liked, setLiked] = useState(postData.liked);
    const [like_count, setLike_count] = useState(postData.like_count);
    const [comment_count, setComment_count] = useState(postData.comment_count);
    const [commentsVisibility, setCommentsVisibility] = useState(false);
    const [comments, setComments] = useState([]);

    const lref = useRef(like_count);
    const cref = useRef(comment_count);

    function toggleCommentsVisibility() {
        setCommentsVisibility(!commentsVisibility);
    }

    useEffect(() => {
        lref.current = like_count;
    }, [like_count]);

    useEffect(() => {
        cref.current = comment_count;
    }, [comment_count]);

    useEffect(() => {
        function handleOnUserAddLike(data) {
            if (postData.post_id == data.post_id)
                setLike_count(lref.current + 1);
        }
        function handleOnUserRemoveLike(data) {
            if (postData.post_id == data.post_id)
                setLike_count(lref.current - 1);
        }
        function handleOnUserAddComment(data) {
            if (postData.post_id == data.post_id)
                setComment_count(cref.current + 1);
        }
        function handleOnUserRemoveComment(data) {
            if (postData.post_id == data.post_id)
                setComment_count(cref.current - 1);
        }

        socket.on("on-user-add-like", handleOnUserAddLike);
        socket.on("on-user-remove-like", handleOnUserRemoveLike);
        socket.on("on-user-add-comment", handleOnUserAddComment);
        socket.on("on-user-remove-comment", handleOnUserRemoveComment);
        return () => {
            socket.off("on-user-add-like", handleOnUserAddLike);
            socket.off("on-user-remove-like", handleOnUserRemoveLike);
            socket.off("on-user-add-comment", handleOnUserAddComment);
            socket.off("on-user-remove-comment", handleOnUserRemoveComment);
        };
    }, []);

    return (
        <>
            <div className="w-96 my-2 rounded-xl bg-dark text-white px-1">
                <PostDetails
                    user_id={postData.user_id}
                    username={postData.username}
                    name={postData.name}
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
                    setComment_count={setComment_count}
                    comment_count={comment_count}
                    toggleCommentsVisibility={toggleCommentsVisibility}
                />
            </div>
            {commentsVisibility && (
                <Comments
                    comments={comments}
                    post_id={postData.post_id}
                    setComments={setComments}
                    comment_count={comment_count}
                />
            )}
        </>
    );
}
