import { useEffect, useState } from "react";

import PostText from "./PostText";
import SmallSpinner from "./laoders/SmallSpinner";
import Header from "./Header";

import { usePfetch } from "../hooks/usePfetch";
import { socket } from "../services/socket";
import { toast } from "sonner";
import Err from "../utils/errClass";

export default function PostWall({ posts, setPosts, scrollref }) {
    const pfetch = usePfetch();
    const [loading, setLoading] = useState(false);

    async function fetchPosts() {
        try {
            const data = await pfetch(
                "/posts?from=" + posts.length.toString(),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setPosts([...posts, ...data]);
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
        scrollref.current = window.scrollY;

        if (
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight ||
            loading
        ) {
            return;
        }

        setLoading(true);
        fetchPosts();
    }

    useEffect(() => {
        if (posts.length == 0) {
            setLoading(true);
            fetchPosts();
        } else window.scrollTo(0, scrollref.current);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    return (
        <>
            <Header />
            <div className="mx-auto md:ml-auto md:mr-[calc((100vw-256px-384px)/2)] lg:mx-auto flex flex-col w-fit">
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
