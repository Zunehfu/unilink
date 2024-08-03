import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../contexts/ProfileContext";
import { usePfetch } from "./usePfetch";
import { toast } from "sonner";
import Err from "../utils/errClass";

export function useProfileFetch() {
    const [loading, setLoading] = useState(true);
    const { activeProfile, setActiveProfileData } = useContext(ProfileContext);
    const pfetch = usePfetch();

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await pfetch("/users?user_id=" + activeProfile, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log(data);
                setActiveProfileData(data);
            } catch (err) {
                if (!(err instanceof Err)) {
                    console.error(err);
                    toast.error("Something went wrong.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);
    return { loading };
}
