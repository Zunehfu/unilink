import Header from "../components/Header";
import PostWall from "../components/PostWall";
import AddPostPage from "../components/AddPostPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePfetch } from "../hooks/usePfetch";
import Loader from "../components/Loader";
import AddPostButton from "../components/AddPostButton";
import TopLevelLayerProfile from "../components/TopLevelLayerProfile";
import Search from "../components/Search";
import io from "socket.io-client";
import { toggleProfile_c } from "../contexts/ProfileContext";
const socket = io.connect("http://localhost:8080");
import { uid_c } from "../contexts/uidContext";

export default function MainPage() {
    const navigate = useNavigate();
    const pfetch = usePfetch();

    const [posts, setPosts] = useState([]);
    const [v, sv] = useState("");

    const [addPostVisibility, setAddPostVisibility] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userId_profile, setUserId_profile] = useState(-1);
    const [uid, setUid] = useState(-1);

    const [searchVisibility, setSearchVisibility] = useState(false);

    const toggleAddPostVisibility = () => {
        setAddPostVisibility(!addPostVisibility);
    };

    const toggleSearchVisibility = () => {
        setSearchVisibility(!searchVisibility);
    };

    useEffect(() => {
        const checkValidity = async () => {
            try {
                const data = await pfetch("/validate", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setUid(data.user_id);
            } catch (err) {
                if (err.code === "AUTH_FAIL") return navigate("/signin");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        checkValidity();
    }, []);

    useEffect(() => {
        socket.emit("send_message", { message: v });
    }, [v]);

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            alert(data.message);
        });
    }, [socket]);

    return (
        <toggleProfile_c.Provider value={{ userId_profile, setUserId_profile }}>
            <uid_c.Provider value={uid}>
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            <input
                                className="mt-20 border-2"
                                value={v}
                                onChange={(e) => sv(e.target.value)}
                            />
                            <Header
                                toggleSearchVisibility={toggleSearchVisibility}
                            />
                            <AddPostButton
                                toggleAddPostVisibility={
                                    toggleAddPostVisibility
                                }
                            />
                            <PostWall posts={posts} setPosts={setPosts} />
                            {addPostVisibility && (
                                <AddPostPage
                                    toggleAddPostVisibility={
                                        toggleAddPostVisibility
                                    }
                                    posts={posts}
                                    setPosts={setPosts}
                                />
                            )}
                            {userId_profile != -1 && <TopLevelLayerProfile />}
                            {searchVisibility && (
                                <Search
                                    toggleSearchVisibility={
                                        toggleSearchVisibility
                                    }
                                />
                            )}
                        </div>
                    )}
                </div>
            </uid_c.Provider>
        </toggleProfile_c.Provider>
    );
}
