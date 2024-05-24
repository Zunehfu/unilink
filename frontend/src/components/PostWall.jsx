import React, { useEffect } from "react";
import PostText from "./PostText";
import { useState } from "react";
import { usePfetch } from "../hooks/usePfetch";
import SmallSpinner from "./SmallSpinner";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function PostWall() {
    const pfetch = usePfetch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

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
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        } finally {
            setLoading(false);
        }
    }

    function handleScroll() {
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
        setLoading(true);
        fetchPosts();
    }, []);

    useEffect(() => {
        if (loading) window.removeEventListener("scroll", handleScroll);
        else window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    return (
        <>
            <Header />
            <div className="mx-auto flex flex-col w-fit">
                {posts.map((item) => (
                    <PostText
                        key={item.post_id}
                        postData={item}
                        posts={posts}
                        setPosts={setPosts}
                    />
                ))}
                {loading && <SmallSpinner />}
            </div>
        </>
    );
}
