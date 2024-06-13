import { useContext } from "react";
import Cookies from "js-cookie";
import Err from "../utils/errClass";
import { UserDataContext } from "../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import getErrorMessage from "../utils/errorMessages";

export const usePfetch = () => {
    const navigate = useNavigate();
    const { userData } = useContext(UserDataContext);

    const pfetch = async (url, options) => {
        try {
            const token = Cookies.get("token");
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: token,
                    "client-uid": userData ? userData.user_id : -1,
                };
            }
            const res = await fetch("http://localhost:8080" + url, options);
            if (!res.ok) throw new Err("BAD_RESPONSE");
            const response = await res.json();

            console.log({ response });

            if (
                response.data.hasOwnProperty("auth_fail") &&
                response.data.auth_fail === true
            )
                throw new Err("AUTH_FAIL");

            if (response.status === "ERROR") throw new Err(response.code);

            return response.data;
        } catch (err) {
            if (err instanceof Err) {
                if (err.message == "AUTH_FAIL") return navigate("/signin");
                toast.error(getErrorMessage(err.message), {
                    position: "top-center",
                });
                throw err;
            } else {
                toast.error(getErrorMessage("UNEXPECTED_ERROR_FRONTEND"), {
                    position: "top-center",
                });
                console.error(err);
                throw new Err("UNEXPECTED_ERROR_FRONTEND");
            }
        }
    };

    return pfetch;
};
