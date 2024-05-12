import Cookies from "js-cookie";

export default function pfetch(url, options) {
    const token = Cookies.get("token");
    if (token) options.headers["Authorization"] = token;

    return fetch("http://localhost:8080" + url, options);
}
