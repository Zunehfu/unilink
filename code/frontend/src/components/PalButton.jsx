import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { usePalInteractions } from "../hooks/usePalInteractions";

export default function PalButton() {
    const { palStatus, userId_profile } = useContext(ProfileContext);

    const {
        handleAcceptPalProposal,
        handleRejectPalProposal,
        handleWithdrawPalProposal,
        handleUnpal,
        handleSendPalProposal,
    } = usePalInteractions(userId_profile);

    <button className="bg-gradient-to-tr  from-indigo-500 via-20% via-sky-500 to-emerald-500  py-1 px-5 absolute right-1/3 rounded-full">
        Be Pals
    </button>;

    return (
        <>
            {palStatus == 0 && (
                <button
                    onClick={handleSendPalProposal}
                    className="bg-gradient-to-tr  from-indigo-500 via-20% via-sky-500 to-emerald-500  py-1 px-5 absolute right-1/3 rounded-full"
                >
                    Be Pals
                </button>
            )}
            {palStatus == 1 && (
                <button
                    onClick={handleUnpal}
                    className="bg-gradient-to-tr  from-indigo-500 via-20% via-sky-500 to-emerald-500  py-1 px-5 absolute right-1/3 rounded-full"
                >
                    Unpal
                </button>
            )}
            {palStatus == 2 && (
                <div className="absolute right-1/3 ">
                    <button
                        onClick={handleAcceptPalProposal}
                        className="bg-gradient-to-tr from-indigo-500 via-20% via-sky-500 to-emerald-500  py-1 px-5  rounded-l-full"
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleRejectPalProposal}
                        className="bg-black text-red-500 font-sans font-semibold py-1 px-5 rounded-r-full"
                    >
                        X
                    </button>
                </div>
            )}
            {palStatus == 3 && (
                <button
                    onClick={handleWithdrawPalProposal}
                    className="bg-gradient-to-tr  from-indigo-500 via-20% via-sky-500 to-emerald-500  py-1 px-5 absolute right-1/3 rounded-full"
                >
                    Withdraw
                </button>
            )}
        </>
    );
}
