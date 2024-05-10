import Header from "../components/Header";
import PostWall from "../components/PostWall";
import AddPost from "../components/AddPost";
import AddPostPage from "../components/AddPostPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pfetch from "../controllers/pfetch";
import Loader from "../components/Loader";

export default function Home() {
    const navigate = useNavigate();

    const [addPostVisibility, setAddPostVisibility] = useState(false);
    const [loading, setLoading] = useState(true);

    function toggleAddPostVisibility() {
        setAddPostVisibility(!addPostVisibility);
    }

    useEffect(() => {
        async function checkValidity() {
            try {
                const res = await pfetch("/validate", {
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

                if (data.auth) navigate("/signin");
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        checkValidity();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <Header />
                    <AddPost
                        toggleAddPostVisibility={toggleAddPostVisibility}
                    />
                    <PostWall />
                    {addPostVisibility && (
                        <AddPostPage
                            toggleAddPostVisibility={toggleAddPostVisibility}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
