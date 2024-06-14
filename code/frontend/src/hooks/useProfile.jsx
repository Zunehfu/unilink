import { useContext } from "react";
import { TabContext } from "../contexts/TabContext";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProfileContext } from "../contexts/ProfileContext";

export function useProfile() {
    const { userData } = useContext(UserDataContext);
    const { setTab } = useContext(TabContext);
    const { setActiveProfile } = useContext(ProfileContext);

    const setProfile = (id) => {
        if (id == userData.user_id) return setTab(4);
        else if (id == -1) return setActiveProfile(-1);
        return setActiveProfile(id);
    };

    return setProfile;
}
