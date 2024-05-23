import Profile from "./Profile";
import MyProfile from "./MyProfile";
import { useContext, useEffect } from "react";
import { TabContext } from "../contexts/TabContext";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProfileContext } from "../contexts/ProfileContext";

export default function TopLevelLayerProfile() {
    const { tab, setTab } = useContext(TabContext);
    const { userId_profile } = useContext(ProfileContext);
    const { userData } = useContext(UserDataContext);

    useEffect(() => {
        if (userId_profile == userData.user_id && tab != 4) setTab(4);
    }, []);
    return (
        <>{userId_profile == userData.user_id ? <MyProfile /> : <Profile />}</>
    );
}
