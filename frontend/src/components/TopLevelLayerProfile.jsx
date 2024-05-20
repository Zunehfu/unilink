import Profile from "./Profile";
import MyProfile from "./MyProfile";
import { toggleProfile_c } from "../contexts/ProfileContext";
import { uid_c } from "../contexts/uidContext";
import { useContext } from "react";

export default function TopLevelLayerProfile() {
    const { userId_profile } = useContext(toggleProfile_c);
    const uid = useContext(uid_c);
    return <>{userId_profile == uid ? <MyProfile /> : <Profile />}</>;
}
