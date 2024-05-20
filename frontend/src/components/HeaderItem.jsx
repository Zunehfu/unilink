import { useContext } from "react";
import { toggleProfile_c } from "../contexts/ProfileContext";
import { uid_c } from "../contexts/uidContext";

export default function HeaderItem({ item, toggleSearchVisibility }) {
    const { setUserId_profile } = useContext(toggleProfile_c);
    const uid = useContext(uid_c);
    const handleClick = () => {
        if (item == "Profile") setUserId_profile(uid);
        else toggleSearchVisibility();
    };
    return (
        <div
            onClick={handleClick}
            className="inline-flex hover:underline items-end cursor-pointer"
        >
            {item}
        </div>
    );
}
