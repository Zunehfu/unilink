import Header from "../components/Header";
import PostWall from "../components/PostWall";
import AddPostPage from "../components/AddPostPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pfetch from "../controllers/pfetch";
import Loader from "../components/Loader";
import AddPostButton from "../components/AddPostButton";
import TopLevelLayerProfile from "../components/TopLevelLayerProfile";
import Search from "../components/Search";

export default function Home() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    const [addPostVisibility, setAddPostVisibility] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId_profile, setUserId_profile] = useState("myprofile");
    const [profileVisibility, setProfileVisibility] = useState(false);
    const [searchVisibility, setSearchVisibility] = useState(false);

    const toggleAddPostVisibility = () => {
        setAddPostVisibility(!addPostVisibility);
    };

    const toggleSearchVisibility = () => {
        setSearchVisibility(!searchVisibility);
    };

    const toggleProfile = (visibility, id) => {
        if (!visibility) return setProfileVisibility(false);
        setProfileVisibility(true);
        setUserId_profile(id);
    };

    useEffect(() => {
        const checkValidity = async () => {
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

                const response = await res.json();
                if (
                    response.status == "ERROR" &&
                    response.data.auth_fail == true
                )
                    return navigate("/signin");
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        checkValidity();
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <Header
                        toggleProfile={toggleProfile}
                        toggleSearchVisibility={toggleSearchVisibility}
                    />
                    <AddPostButton
                        toggleAddPostVisibility={toggleAddPostVisibility}
                    />
                    <PostWall
                        toggleProfile={toggleProfile}
                        posts={posts}
                        setPosts={setPosts}
                    />
                    {addPostVisibility && (
                        <AddPostPage
                            toggleAddPostVisibility={toggleAddPostVisibility}
                            posts={posts}
                            setPosts={setPosts}
                        />
                    )}
                    {profileVisibility && (
                        <TopLevelLayerProfile
                            toggleProfile={toggleProfile}
                            userId_profile={userId_profile}
                        />
                    )}
                    {searchVisibility && (
                        <Search
                            toggleProfile={toggleProfile}
                            toggleSearchVisibility={toggleSearchVisibility}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
