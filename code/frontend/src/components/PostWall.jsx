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
    const postWallRef = useRef();
    const postsRef = useRef();
    async function fetchPosts() {
        try {
            console.log({ ref: postsRef.current.length, state: posts });
            const data = await pfetch(
                "/posts?from=" + postsRef.current.length.toString(),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setPosts([...postsRef.current, ...data]);
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
    function handleScroll() {
        console.log("helo");
        //window.innerHeight = (header + margin)[56px] + (postwall)[postWallRef.current.offsetHeight]
        if (
            scrollref.current.scrollTop + 56 <
                postWallRef.current.offsetHeight - window.innerHeight ||
            loading
        )
            return;

        console.log("yooooo");
        setLoading(true);
        fetchPosts();
    }

    useEffect(() => {
        postsRef.current = posts;
    }, [posts]);

    useEffect(() => {
        if (postsRef.current.length == 0) {
            setLoading(true);
            fetchPosts();
        }
    }, []);

    useEffect(() => {
        scrollref.current.addEventListener("scroll", handleScroll);

        return () => {
            scrollref.current.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Header />
            <div
                ref={postWallRef}
                className="mx-auto md:ml-auto md:mr-[calc((100vw-256px-384px)/2)] lg:mx-auto flex flex-col w-fit"
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
