import { useContext, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { ProfileContext } from "../contexts/ProfileContext";
import { usePalInteractions } from "../hooks/usePalInteractions";

export default function Notification({ type, userData_from }) {
    const { setUserId_profile } = useContext(ProfileContext);
    const { handleAcceptPalProposal, handleRejectPalProposal } =
        usePalInteractions(userData_from.user_id);
    return (
        <>
            {type == "RECIEVE_PAL_PROPOSAL" && (
                <div className="font-[Lexend]">
                    <div className="flex gap-1 mb-1">
                        <div
                            className="flex items-center w-fit"
                            onClick={() =>
                                setUserId_profile(userData_from.user_id)
                            }
                        >
                            <ProfilePicture size="40px" />
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                onClick={() =>
                                    setUserId_profile(userData_from.user_id)
                                }
                            >
                                {userData_from.name}
                            </span>
                            <span
                                className="underline text-xs"
                                onClick={() =>
                                    setUserId_profile(userData_from.user_id)
                                }
                            >
                                (@{userData_from.username})
                            </span>
                            <span> just sent a pal proposal for you</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleAcceptPalProposal}
                            className="text-green-500 bg-green-900 w-1/2 rounded-l-md active:text-white"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleRejectPalProposal}
                            className="text-red-500 bg-red-900 w-1/2 rounded-r-md active:text-white"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            )}
            {type == "ACCEPT_PAL_PROPOSAL" && (
                <div className="font-[Lexend]">
                    <div className="flex gap-1 mb-1">
                        <div
                            className="flex items-center w-fit"
                            onClick={() =>
                                setUserId_profile(userData_from.user_id)
                            }
                        >
                            <ProfilePicture size="40px" />
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                onClick={() =>
                                    setUserId_profile(userData_from.user_id)
                                }
                            >
                                {userData_from.name}
                            </span>
                            <span
                                className="underline text-xs"
                                onClick={() =>
                                    setUserId_profile(userData_from.user_id)
                                }
                            >
                                (@{userData_from.username})
                            </span>
                            <span> accepted your pal proposal</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
