import { useEffect, useRef, useState } from "react";

import PostText from "./PostText";
import SmallSpinner from "./laoders/SmallSpinner";
import Header from "./Header";

import { usePfetch } from "../hooks/usePfetch";
import { socket } from "../services/socket";
import { toast } from "sonner";
import Err from "../utils/errClass";

export default function PostWall({ scrollref }) {
    const pfetch = usePfetch();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const lscroll = useRef(0);
    const postWallRef = useRef();

    function handleScroll() {
        // window.innerHeight = (header + margin)[56px] + (postwall)[postWallRef.current.offsetHeight]
        if (
            scrollref.current.scrollTop + 56 <
                postWallRef.current.offsetHeight - window.innerHeight ||
            loading
        )
            return;

        setLoading(true);
    }

    useEffect(() => {
        scrollref.current.addEventListener("scroll", handleScroll);

        return () => {
            if (scrollref.current)
                scrollref.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (posts.length == 0) setLoading(true);
        if (loading) {
            async function fetchPosts() {
                try {
                    const data = await pfetch("/posts?from=" + posts.length, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    setPosts((prevPosts) => [...prevPosts, ...data]);
                    socket.emit(
                        "on-posts-loaded",
                        data.map((post) => post.post_id)
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

            fetchPosts();
        }
    }, [loading, posts]);

    return (
        <>
            <Header />
            <div
                ref={postWallRef}
                className="mx-auto md:ml-auto md:mx-auto flex flex-col w-fit"
            >
                {posts.map((post, i) => (
                    <PostText
                        key={post.post_id}
                        post_index={i}
                        posts={posts}
                        setPosts={setPosts}
                    />
                ))}
                {loading && <SmallSpinner />}
            </div>
        </>
    );
}
