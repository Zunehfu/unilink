import React, { useEffect } from "react";
import PostText from "./PostText";
import { useState } from "react";
import pfetch from "../controllers/pfetch";
import SmallSpinner from "./SmallSpinner";
import { useNavigate } from "react-router-dom";

export default function PostWall({ posts, setPosts }) {
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

            const data = await res.json();
            console.log("Response data:", data);
            if (data.hasOwnProperty("auth")) return navigate("/signin");
            setPosts([...posts, ...data]);
            console.log("posts print", posts);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleScroll() {
        console.log("listening", posts.length);
        console.log(
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight
        );

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

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="grid place-items-center mt-20">
            {posts.map((item) => (
                <PostText
                    key={item._id}
                    postData={item}
                    posts={posts}
                    setPosts={setPosts}
                />
            ))}
            {loading && <SmallSpinner />}
        </div>
    );
}
