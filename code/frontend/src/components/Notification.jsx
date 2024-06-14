import ProfilePicture from "./ProfilePicture";
import { usePalInteractions } from "../hooks/usePalInteractions";
import { useProfile } from "../hooks/useProfile";

export default function Notification({ type, userData_from }) {
    const setProfile = useProfile();
    const { handleAcceptPalProposal, handleRejectPalProposal } =
        usePalInteractions(userData_from.user_id);
    return (
        <>
            {type == "RECIEVE_PAL_PROPOSAL" && (
                <div className="font-[Lexend]">
                    <div className="flex gap-1 mb-1">
                        <div
                            className="flex items-center w-fit"
                            onClick={() => setProfile(userData_from.user_id)}
                        >
                            <ProfilePicture size="40px" />
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                onClick={() =>
                                    setProfile(userData_from.user_id)
                                }
                            >
                                {userData_from.name}
                            </span>
                            <span
                                className="underline text-xs"
                                onClick={() =>
                                    setProfile(userData_from.user_id)
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
                            onClick={() => setProfile(userData_from.user_id)}
                        >
                            <ProfilePicture size="40px" />
                        </div>
                        <div>
                            <span
                                className="font-semibold"
                                onClick={() =>
                                    setProfile(userData_from.user_id)
                                }
                            >
                                {userData_from.name}
                            </span>
                            <span
                                className="underline text-xs"
                                onClick={() =>
                                    setProfile(userData_from.user_id)
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
