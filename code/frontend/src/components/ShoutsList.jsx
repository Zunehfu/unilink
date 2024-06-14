import { useContext, useEffect, useRef, useState } from "react";
import ShoutItem from "./ShoutItem";
import { usePfetch } from "../hooks/usePfetch";
import Err from "../utils/errClass";
import { ProfileContext } from "../contexts/ProfileContext";
import SmallSpinner from "./laoders/SmallSpinner";
export default function ShoutsList() {
    const { activeProfile } = useContext(ProfileContext);
    const scrollRefShouts = useRef();
    const [loading, setLoading] = useState(false);
    const [shoutList, setShoutList] = useState([]);
    const pfetch = usePfetch();

    async function fetchShouts() {
        try {
            const data = await pfetch(
                "/shouts?user_id=" +
                    activeProfile +
                    "&from=" +
                    shoutList.length.toString(),
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setShoutList([...shoutList, ...data]);
        } catch (err) {
            if (!(err instanceof Err)) {
                console.error(err);
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    function handleScroll() {
        scrollRefShouts.current = window.scrollY;

        if (
            window.innerHeight + document.documentElement.scrollTop <
                document.documentElement.offsetHeight ||
            loading
        ) {
            return;
        }

        setLoading(true);
        fetchShouts();
    }

    useEffect(() => {
        if (shoutList.length == 0) {
            setLoading(true);
            fetchShouts();
        } else window.scrollTo(0, scrollRefShouts.current);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    return (
        <div className="flex flex-col p-2 gap-1">
            {shoutList.map((shout) => (
                <ShoutItem key={shout.post_id} shout={shout} />
            ))}
            {loading && (
                <div className="flex justify-center">
                    <SmallSpinner size />
                </div>
            )}
        </div>
    );
}
