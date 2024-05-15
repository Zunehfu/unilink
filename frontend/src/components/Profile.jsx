import React, { useEffect, useState } from "react";
import ProfileItemForProfile from "./ProfileItemForProfile";
import pfetch from "../controllers/pfetch";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Profile({ toggleProfile, userId_profile }) {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await pfetch("/users?user_id=" + userId_profile, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Request failed");
                }

                const response = await res.json();
                console.log("Response data:", response);
                if (response.data.hasOwnProperty("auth_fail"))
                    return navigate("/signin");

                setValues({
                    Username: response.data.username || "",
                    "Member since": response.data.created_at || "",
                    Name: response.data.name || "",
                    Age: response.data.age || "",
                    University: response.data.university || "",
                    Major: response.data.major || "",
                    Batch: response.data.batch || "",
                    "Relationship status":
                        response.data.relationship_status || "",
                    Gender: response.data.gender || "",
                    "Contact No": response.data.contact || "",
                    "Uni email": response.data.email || "",
                    "Personal email": response.data.personal_email || "",
                    "Personal website": response.data.website || "",
                    "Interested in": response.data.interested_in || "",
                    "Date of birth": response.data.birth_date || "",
                });
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm ">
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
                                onClick={() =>
                                    toggleProfile(false, "myprofile")
                                }
                                className="fa-solid fa-xmark relative left-1.5 top-0 cursor-pointer transition-all hover:scale-150"
                            ></i>

                            <div className="h-7 bg-white rounded-md text-center">
                                {values["Name"]}'s Profile [{" "}
                                {values["University"]} ]
                            </div>
                            <div className="mb-2 flex items-center justify-center">
                                <button className="rounded-md bg-green-300 text-white py-1 px-3">
                                    Be friends
                                </button>
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
