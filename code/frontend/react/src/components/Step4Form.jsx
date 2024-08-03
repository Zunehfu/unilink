import { useNavigate } from "react-router-dom";
import ConnectAPI from "./ConnectAPI";

export default function Step4Form() {
    const navigate = useNavigate();
    return (
        <>
            <div className="font-futura text-dark tracking-wide text-center font-bold">
                Welcome aboard! Your account is now active.
            </div>
            <hr />
            <button
                onClick={() => navigate("/")}
                className="text-white bg-emerald-300 p-2 rounded-md"
            >
                Proceed to site
            </button>
            <ConnectAPI />
        </>
    );
}
