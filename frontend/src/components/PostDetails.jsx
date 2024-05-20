import { useContext } from "react";
import { toggleProfile_c } from "../contexts/ProfileContext";

export default function PostDetails({ user_id, created_at }) {
    const { setUserId_profile } = useContext(toggleProfile_c);
    return (
        <div className="h-6 flex justify-between">
            <div onClick={() => setUserId_profile(user_id)}>
                {user_id}
                <dfn>lomas</dfn>
            </div>
            <div>
                <small>{created_at}</small>
            </div>
        </div>
    );
}
