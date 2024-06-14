// react
import { useEffect, useState, useRef, useContext } from "react";
// components
//-- navigation
import HorizontalNav from "./HorizontalNav";
import VerticalNav from "./VerticalNav";
//-- main tabs
import Home from "./Home";
import Search from "./Search";
import AddPostPage from "./AddPostPage";
import Inbox from "./Inbox";
import MyProfile from "./MyProfile";

//-- misc
import Loader from "./laoders/Loader";
import Notification from "./Notification";
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

export default function MainComponent() {
    const pfetch = usePfetch();

    const { tab } = useContext(TabContext);
    const { activeProfile, setActiveProfileData } = useContext(ProfileContext);
    const { setUserData } = useContext(UserDataContext);
    const { mentionStatus } = useContext(MentionContext);
    const userIdProfileRef = useRef(activeProfile);
    const scrollref = useRef(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            } catch (err) {
                if (!(err instanceof Err)) {
                    console.error(err);
                }
            }
        };

        checkValidity();
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        userIdProfileRef.current = activeProfile;
    }, [activeProfile]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("socket connection successful!");
            socket.emit("userid-safe-map", { token: Cookies.get("token") });
            setLoading(false);
        });

        const handlePalProposalReceive = (data) => {
            console.log(userIdProfileRef.current, data.userData_from.user_id);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: 2,
                }));

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
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: 0,
                }));
        };
        const handleBeingUnpaled = (data) => {
            console.log(data);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: 0,
                }));
        };
        const handleAcceptSentPalProposal = (data) => {
            console.log(data);
            if (userIdProfileRef.current === data.userData_from.user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: 1,
                }));
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
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: 0,
                }));
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
                    <HorizontalNav />
                    <VerticalNav />
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
                    {activeProfile != -1 && <Profile />}
                </div>
            )}
        </div>
    );
}
Profile;
