// react
import { useEffect, useState, useRef, useContext } from "react";
// components
import Home from "./Home";
import AddPostPage from "./AddPostPage";
import Search from "./Search";
import Loader from "./Loader";
import Notification from "./Notification";
import Footer from "./Footer";
import MyProfile from "./MyProfile";
import Inbox from "./Inbox";
import MentionPalette from "./MentionPalette";
import Profile from "./Profile";

// libraries
import Cookies from "js-cookie";
import { Toaster, toast } from "sonner";

// contexts
import { ProfileContext } from "../contexts/ProfileContext";
import { TabContext } from "../contexts/TabContext";
import { UserDataContext } from "../contexts/UserDataContext";
import { MentionContext } from "../contexts/MentionContext";

// custom hooks
import { usePfetch } from "../hooks/usePfetch";

//classes
import Err from "../utils/errClass";

// socket
import { socket } from "../services/socket";
import Editor from "./editor/Editor";

export default function MainComponent() {
    const pfetch = usePfetch();

    const { tab } = useContext(TabContext);
    const { userId_profile, setPalStatus } = useContext(ProfileContext);
    const { setUserData } = useContext(UserDataContext);
    const { mentionStatus } = useContext(MentionContext);

    const [loading, setLoading] = useState(true);

    const userIdProfileRef = useRef(userId_profile);
    const scrollref = useRef(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const checkValidity = async () => {
            try {
                const data = await pfetch("/validate", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setUserData({
                    user_id: data.user_id,
                    username: data.username,
                    name: data.name,
                });

                socket.connect();
            } catch (err) {
                if (!(err instanceof Err)) {
                    console.error(err);
                }
                setLoading(false);
            }
        };

        checkValidity();
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        userIdProfileRef.current = userId_profile;
    }, [userId_profile]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("socket connection successful!");
            socket.emit("userid-safe-map", { token: Cookies.get("token") });
            setLoading(false);
        });

        const handlePalProposalReceive = (data) => {
            console.log(userIdProfileRef.current, data.userData_from.user_id);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setPalStatus(2);
            toast(
                <Notification
                    type="RECIEVE_PAL_PROPOSAL"
                    userData_from={data.userData_from}
                />,
                {
                    position: "top-center",
                }
            );
        };
        const handleWithdrawReceivedPalProposal = (data) => {
            console.log(data);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setPalStatus(0);
        };
        const handleBeingUnpaled = (data) => {
            console.log(data);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setPalStatus(0);
        };
        const handleAcceptSentPalProposal = (data) => {
            console.log(data);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setPalStatus(1);
            toast(
                <Notification
                    type="ACCEPT_PAL_PROPOSAL"
                    userData_from={data.userData_from}
                />,
                {
                    position: "top-center",
                }
            );
        };
        const handleRejectSentPalProposal = (data) => {
            console.log(data);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setPalStatus(0);
        };

        socket.on("on-palproposal-recieve", handlePalProposalReceive);
        socket.on(
            "on-withdraw-recieved-palproposal",
            handleWithdrawReceivedPalProposal
        );
        socket.on("on-being-unpaled", handleBeingUnpaled);
        socket.on("on-accept-sent-palproposal", handleAcceptSentPalProposal);
        socket.on("on-reject-sent-palproposal", handleRejectSentPalProposal);

        return () => {
            socket.off("on-palproposal-recieve", handlePalProposalReceive);
            socket.off(
                "on-withdraw-recieved-palproposal",
                handleWithdrawReceivedPalProposal
            );
            socket.off("on-being-unpaled", handleBeingUnpaled);
            socket.off(
                "on-accept-sent-palproposal",
                handleAcceptSentPalProposal
            );
            socket.off(
                "on-reject-sent-palproposal",
                handleRejectSentPalProposal
            );
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <Toaster richColors />
                    {/* <Editor /> */}
                    <Footer />
                    {tab == 0 && (
                        <Home
                            posts={posts}
                            setPosts={setPosts}
                            scrollref={scrollref}
                        />
                    )}
                    {tab == 1 && <Search />}
                    {tab == 2 && <AddPostPage />}
                    {tab == 3 && <Inbox />}
                    {tab == 4 && <MyProfile />}
                    {mentionStatus == -1 && <MentionPalette />}
                    {userId_profile != -1 && <Profile />}
                </div>
            )}
        </div>
    );
}
Profile;
