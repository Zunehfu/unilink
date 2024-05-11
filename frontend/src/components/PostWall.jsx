import React, { useEffect } from "react";
import PostText from "./PostText";
import { useState } from "react";
import pfetch from "../controllers/pfetch";
import SmallSpinner from "./SmallSpinner";

export default function PostWall({ posts, setPosts, navigate }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPosts() {
            try {
                const res = await pfetch("/posts", {
                    method: "GET",
                    headers: {},
                });

                if (!res.ok) {
                    throw new Error("Request failed");
                }

                const data = await res.json();
                console.log("Response data:", data);
                if (data.hasOwnProperty("auth")) return navigate("/signin");
                setPosts(data);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    return loading ? (
        <SmallSpinner />
    ) : (
        <div className="grid place-items-center mt-20">
            {posts.map((item) => (
                <PostText
                    key={item._id}
                    postData={item}
                    posts={posts}
                    setPosts={setPosts}
                    navigate={navigate}
                />
            ))}
        </div>
    );
}
