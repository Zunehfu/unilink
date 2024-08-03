import { useContext } from "react";
import ProfilePicture from "./ProfilePicture";
import { MentionContext } from "../contexts/MentionContext";

export default function MentionCard({ item }) {
    const { setMentionStatus } = useContext(MentionContext);
    function handleClick() {
        setMentionStatus({ user_id: item.user_id, username: item.username });
    }
    return (
        <>
            <div
                onClick={handleClick}
                className="rounded-xl hover:cursor-pointer hover:bg-dark p-1 flex flex-col items-center w-fit min-w-44 font-lexend"
            >
                <div className="flex mb-1">
                    <ProfilePicture size="47px" />
                </div>
                <span className="h-4 text-sm text-white">{item.name}</span>
                <span className="mb-1 h-5 text-xs underline text-gray-400">
                    (@{item.username})
                </span>
                <span className="bg-emerald-500 text-xs text-black rounded-md px-1">
                    {item.university}
                </span>
            </div>
        </>
    );
}
