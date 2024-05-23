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
                setValues({
                    Username: data.username,
                    "Member since": data.created_at,
                    Name: data.name || "Remains unchanged",
                    Age: data.age || "Remains unchanged",
                    University: data.university,
                    Major: data.major || "Remains unchanged",
                    Batch: data.batch || "Remains unchanged",
                    "Relationship status":
                        data.relationship_status || "Remains unchanged",
                    Gender: data.gender || "Remains unchanged",
                    "Contact No": data.contact || "Remains unchanged",
                    "Uni email": data.email,
                    "Personal email":
                        data.personal_email || "Remains unchanged",
                    "Personal website": data.website || "Remains unchanged",
                    "Interested in": data.interested_in || "Remains unchanged",
                    "Date of birth": data.birth_date || "Remains unchanged",
                });
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
