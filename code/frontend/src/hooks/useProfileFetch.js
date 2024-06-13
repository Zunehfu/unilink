import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../contexts/ProfileContext";
import { usePfetch } from "./usePfetch";

export function useProfileFetch() {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    const navigate = useNavigate();
    const pfetch = usePfetch();
    const { userId_profile, setPalStatus } = useContext(ProfileContext);

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await pfetch("/users?user_id=" + userId_profile, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setPalStatus(data.pal_status);
                setValues(data);
            } catch (err) {
                if (err.code == "AUTH_FAIL") return navigate("/signin");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);
    return { loading, values };
}
