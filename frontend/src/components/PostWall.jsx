import React, { useEffect } from "react";
import PostText from "./PostText";
import { useState } from "react";
import pfetch from "../utils/pfetch";
import SmallSpinner from "./SmallSpinner";
import { useNavigate } from "react-router-dom";

export default function PostWall({ posts, setPosts, toggleProfile }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        <div className="grid place-items-center mt-20">
            {posts.map((item) => (
                <PostText
                    key={item.post_id}
                    postData={item}
                    posts={posts}
                    setPosts={setPosts}
                    toggleProfile={toggleProfile}
                />
            ))}
            {loading && <SmallSpinner />}
        </div>
    );
}
