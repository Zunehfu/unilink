import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import CommentInput from "./CommentInput";

export default function PostText({ posts, setPosts, post_index }) {
    const [commentsVisibility, setCommentsVisibility] = useState(false);
    const [comments, setComments] = useState([]);

    function toggleCommentsVisibility() {
        setCommentsVisibility(!commentsVisibility);
    }

    useEffect(() => {
        function handleOnUserAddLike(data) {
            if (posts[post_index].post_id == data.post_id) {
                setPosts(
                    posts.map((post, i) =>
                        i === post_index
                            ? { ...post, like_count: post.like_count + 1 }
                            : post
                    )
                );
            }
        }
        function handleOnUserRemoveLike(data) {
            if (posts[post_index].post_id == data.post_id) {
                setPosts(
                    posts.map((post, i) =>
                        i === post_index
                            ? { ...post, like_count: post.like_count - 1 }
                            : post
                    )
                );
            }
        }
        function handleOnUserAddComment(data) {
            if (posts[post_index].post_id == data.post_id) {
                setPosts(
                    posts.map((post, i) =>
                        i === post_index
                            ? { ...post, comment_count: post.comment_count + 1 }
                            : post
                    )
                );
            }
        }
        function handleOnUserRemoveComment(data) {
            if (posts[post_index].post_id == data.post_id) {
                setPosts(
                    posts.map((post, i) =>
                        i === post_index
                            ? { ...post, comment_count: post.comment_count - 1 }
                            : post
                    )
                );
            }
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
                    user_id={posts[post_index].user_id}
                    username={posts[post_index].username}
                    name={posts[post_index].name}
                    created_at={posts[post_index].created_at}
                />
                <PostContent content={posts[post_index].content} />
                <PostStats
                    posts={posts}
                    post_index={post_index}
                    setPosts={setPosts}
                    toggleCommentsVisibility={toggleCommentsVisibility}
                />
                <CommentInput posts={posts} post_index={post_index} />
            </div>
            {commentsVisibility && (
                <Comments
                    post_id={posts[post_index].post_id}
                    comments={comments}
                    setComments={setComments}
                    comment_count={posts[post_index].comment_count}
                />
            )}
        </>
    );
}
