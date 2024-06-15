import { useContext, useEffect } from "react";
import { TabContext } from "../contexts/TabContext";
import { HistoryContext } from "../contexts/HistoryContext";

export function useHistory({ setPosts }) {
    const { tab } = useContext(TabContext);
    const { history } = useContext(HistoryContext);
    useEffect(() => {
        window.scrollTo(0, history.current[tab].scroll);

        switch (tab) {
            case 0:
                setPosts(history.current[tab].posts);
            case 1:
        }

        function handleScroll() {
            history.current[tab].scroll = window.scrollY;
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
}
