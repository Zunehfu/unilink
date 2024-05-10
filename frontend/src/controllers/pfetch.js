import Cookies from "js-cookie";

export default function pfetch(url, options) {
    console.log("yoo");
    const token = Cookies.get("token");
    if (token) options.headers["Authorization"] = token;

    return fetch("http://localhost:8080" + url, options);
}
