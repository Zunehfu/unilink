import { useContext, useEffect, useState } from "react";
import ProfileItemForProfile from "./ProfileItemForProfile";
import { usePfetch } from "../hooks/usePfetch";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import "../styles/profile-uni.css";
import { toggleProfile_c } from "../contexts/ProfileContext";

export default function Profile() {
    const pfetch = usePfetch();
    const { setUserId_profile, userId_profile } = useContext(toggleProfile_c);
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    const navigate = useNavigate();
    const [palStatus, setPalStatus] = useState(0);

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

    const handleSendPalProposal = async () => {
        try {
            const data = await pfetch(
                "/palproposals?user_id=" + userId_profile,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setPalStatus(data.pal_status);
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleUnpal = async () => {
        try {
            const data = await pfetch("/pals?user_id=" + userId_profile, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setPalStatus(data.pal_status);
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleWithdrawPalProposal = async () => {
        try {
            const data = await pfetch(
                "/palproposals?user_id=" + userId_profile,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setPalStatus(data.pal_status);
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleAcceptPalProposal = async () => {
        try {
            const data = await pfetch(
                "/mypalproposals?accept=true&user_id=" + userId_profile,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setPalStatus(data.pal_status);
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    const handleRejectPalProposal = async () => {
        try {
            const data = await pfetch(
                "/mypalproposals?accept=false&user_id=" + userId_profile,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setPalStatus(data.pal_status);
        } catch (err) {
            if (err.code == "AUTH_FAIL") return navigate("/signin");
        }
    };

    return (
        <>
            <div className="z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm ">
                <div className="relative rounded-md h-[90vh] w-[90vw] max-w-[900px] bg-white overflow-y-scroll">
                    {loading ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <ThreeDots
                                visible={true}
                                height="60"
                                width="60"
                                color="#4fa94d"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <>
                            <i
                                onClick={() => setUserId_profile(-1)}
                                className="fa-solid fa-xmark relative left-1.5 top-0 cursor-pointer transition-all hover:scale-150"
                            ></i>

                            <div className="flex justify-center overflow-hidden">
                                <div className="relative">
                                    <div className="inline-block m-1 relative z-10">
                                        {values["Name"]}'s Profile
                                    </div>
                                    <div className="metallic-shine">
                                        Moratuwa
                                    </div>
                                    <div className="year-label">
                                        3<sup>rd</sup> year
                                    </div>
                                </div>
                            </div>
                            <div className="mb-2 mt-2">
                                {palStatus == 0 && (
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleSendPalProposal}
                                            className=" rounded-md bg-green-300 text-white py-1 px-3"
                                        >
                                            Send pal proposal
                                        </button>
                                    </div>
                                )}
                                {palStatus == 1 && (
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleUnpal}
                                            className="rounded-md bg-green-300 text-white py-1 px-3"
                                        >
                                            Unpal
                                        </button>
                                    </div>
                                )}
                                {palStatus == 2 && (
                                    <>
                                        <div className="text-center text-sm font-semibold">
                                            Incoming pal proposal...
                                        </div>
                                        <div className="font-[Lexend] flex justify-center mt-1">
                                            <button
                                                onClick={
                                                    handleAcceptPalProposal
                                                }
                                                className="active:text-white hover:text-green-700 hover:border-green-700 transition-all border-l-2 border-t-2 border-b-2 rounded-l-md border-green-300 bg-green-300 text-white py-1 px-3"
                                            >
                                                Accept{" "}
                                                <i class="fa-solid fa-check"></i>
                                            </button>
                                            <button
                                                onClick={
                                                    handleRejectPalProposal
                                                }
                                                className="active:text-white hover:text-red-700 hover:border-red-700 transition-all border-r-2 border-t-2 border-b-2  rounded-r-md border-red-300 bg-red-300 text-white py-1 px-3"
                                            >
                                                Reject{" "}
                                                <i class="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>
                                    </>
                                )}
                                {palStatus == 3 && (
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleWithdrawPalProposal}
                                            className="rounded-md bg-green-300 text-white py-1 px-3"
                                        >
                                            Withdraw pal proposal
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <div className="relative z-10 w-48 h-48 border-2 border-white rounded-full overflow-hidden">
                                    <img
                                        src="../../public/profile.jpg"
                                        alt="img"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-evenly">
                                <div className="m-3 min-w-60">
                                    <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                        Account Info
                                    </div>
                                    <ProfileItemForProfile
                                        field="Username"
                                        value={values["Username"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Member since"
                                        value={values["Member since"]}
                                    />
                                </div>

                                <div className="m-3 min-w-60">
                                    <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                        Basic Info
                                    </div>
                                    <ProfileItemForProfile
                                        field="Name"
                                        value={values["Name"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Age"
                                        value="20"
                                    />

                                    <ProfileItemForProfile
                                        field="University"
                                        value={values["University"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Major"
                                        value={values["Major"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Batch"
                                        value="2023"
                                    />
                                    <ProfileItemForProfile
                                        field="Relationship status"
                                        value={values["Relationship status"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Gender"
                                        value={values["Gender"]}
                                    />
                                </div>

                                <div className="m-3 min-w-60">
                                    <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                        Additional Info
                                    </div>
                                    <ProfileItemForProfile
                                        field="Contact No"
                                        value={values["Contact No"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Uni email"
                                        value={values["Uni email"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Personal email"
                                        value={values["Personal email"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Personal website"
                                        value={values["Personal website"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Interested in"
                                        value={values["Interested in"]}
                                    />
                                    <ProfileItemForProfile
                                        field="Date of birth"
                                        value={values["Date of birth"]}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
