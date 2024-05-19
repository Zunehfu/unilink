import Cookies from "js-cookie";
import Err from "./errClass";

export default async function pfetch(url, options) {
    try {
        const token = Cookies.get("token");
        if (token) {
            options.headers = {
                ...options.headers,
                Authorization: token,
            };
        }

        const res = await fetch("http://localhost:8080" + url, options);

        if (!res.ok)
            throw new Err("BAD_RESPONSE", "Bad response from the server");

        const response = await res.json();

        console.log({ response });

        if (
            response.data.hasOwnProperty("auth_fail") &&
            response.data.auth_fail === true
        )
            throw new Err("AUTH_FAIL", "Please sign in");

        if (response.status === "ERROR")
            throw new Err(response.code, response.data.message);

        return response.data;
    } catch (err) {
        if (err instanceof Err) throw err;
        else throw new Err("UNEXPECTED_ERROR", err.message);
    }
}
