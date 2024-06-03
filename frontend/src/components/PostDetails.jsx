import ProfilePicture from "./ProfilePicture";
import { useProfile } from "../hooks/useProfile";
import moment from "moment";

export default function PostDetails({ user_id, username, name, created_at }) {
    const setProfile = useProfile();
    return (
        <div className="relative h-10 flex items-center font-[Lexend]">
            <div className="mr-2 flex">
                <ProfilePicture size="30px" />
            </div>
            <div className="cursor-pointer" onClick={() => setProfile(user_id)}>
                <span>{name.split(" ")[0]}</span>
                <span className="mx-1 text-xs font-light underline text-gray-400">
                    (@{username})
                </span>
            </div>
            <div className="absolute right-0 font-extralight text-xs">
                {moment(created_at).format("D/M/YYYY")}
            </div>
        </div>
    );
}
