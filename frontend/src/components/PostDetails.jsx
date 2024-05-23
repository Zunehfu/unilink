import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import ProfilePicture from "./ProfilePicture";
import moment from "moment";

export default function PostDetails({ user_id, created_at }) {
    const { setUserId_profile } = useContext(ProfileContext);
    return (
        <div className="relative h-10 flex items-center font-[Lexend]">
            <div className="mr-2 flex">
                <ProfilePicture size="30px" />
            </div>
            <div
                className="cursor-pointer"
                onClick={() => setUserId_profile(user_id)}
            >
                <span>Deneth</span>
                {/*str.split(' ')[0]*/}
                <span className="mx-1 text-xs font-light underline text-gray-400">
                    (@deneth.official)
                </span>
            </div>
            <div className="absolute right-0 font-extralight text-xs">
                {moment(created_at).format("D/M/YYYY")}
            </div>
        </div>
    );
}
