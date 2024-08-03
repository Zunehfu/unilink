import { useContext } from "react";
import { usePfetch } from "./usePfetch";
import { ProfileContext } from "../contexts/ProfileContext";
import { socket } from "../services/socket";
import { UserDataContext } from "../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";

export function usePalInteractions(user_id) {
    const pfetch = usePfetch();
    const { setActiveProfileData, activeProfile } = useContext(ProfileContext);
    const { userData } = useContext(UserDataContext);
    const navigate = useNavigate();

    const handleSendPalProposal = async () => {
        try {
            const data = await pfetch("/palproposals?user_id=" + user_id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log({ activeProfile });
            if (activeProfile == user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: data.pal_status,
                }));
            console.log(userData);
            socket.emit("handle-send-palproposal", {
                userData,
                user_id_to: user_id,
            });
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleWithdrawPalProposal = async () => {
        try {
            const data = await pfetch("/palproposals?user_id=" + user_id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (activeProfile == user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: data.pal_status,
                }));
            socket.emit("handle-withdraw-palproposal", {
                userData,
                user_id_to: user_id,
            });
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleUnpal = async () => {
        try {
            const data = await pfetch("/pals?user_id=" + user_id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (activeProfile == user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: data.pal_status,
                }));
            socket.emit("handle-unpal", {
                userData,
                user_id_to: user_id,
            });
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleAcceptPalProposal = async () => {
        try {
            const data = await pfetch(
                "/mypalproposals?accept=true&user_id=" + user_id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (activeProfile == user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: data.pal_status,
                }));
            socket.emit("handle-accept-palproposal", {
                userData,
                user_id_to: user_id,
            });
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleRejectPalProposal = async () => {
        try {
            const data = await pfetch(
                "/mypalproposals?accept=false&user_id=" + user_id,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (activeProfile == user_id)
                setActiveProfileData((prevState) => ({
                    ...prevState,
                    pal_status: data.pal_status,
                }));
            socket.emit("handle-reject-palproposal", {
                userData,
                user_id_to: user_id,
            });
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    return {
        handleAcceptPalProposal,
        handleRejectPalProposal,
        handleSendPalProposal,
        handleUnpal,
        handleWithdrawPalProposal,
    };
}
