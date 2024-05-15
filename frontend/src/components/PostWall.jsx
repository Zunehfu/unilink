import React, { useEffect } from "react";
import PostText from "./PostText";
import { useState } from "react";
import pfetch from "../controllers/pfetch";
import SmallSpinner from "./SmallSpinner";
import { useNavigate } from "react-router-dom";

export default function PostWall({ posts, setPosts, toggleProfile }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchPosts() {
        try {
            const res = await pfetch("/posts?from=" + posts.length.toString(), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const response = await res.json();
            console.log("Response data:", response);
            if (response.data.hasOwnProperty("auth_fail"))
                return navigate("/signin");
            setPosts([...posts, ...response.data]);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleScroll() {
        console.log(
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight
        );
        console.log("loading", loading);
        if (
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight ||
            loading
        ) {
            return;
        }

        console.log("calling fetch posts");
        setLoading(true);
        fetchPosts();
    }

    useEffect(() => {
        setLoading(true);
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log("this is updated!");
        console.log(posts);
    }, [posts]);

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
