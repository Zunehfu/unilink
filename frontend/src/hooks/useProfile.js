import { useContext } from "react";
import { userData_c } from "../contexts/UserDataContext";
import { TabContext } from "../contexts/TabContext";

export default function useProfile(id) {
    const { userData } = useContext(userData_c);
    const { tab, setTab } = useContext(TabContext);
    if (userData.user_id == id) setTab(1);
    setTa;
    return <div>useProfile</div>;
}
