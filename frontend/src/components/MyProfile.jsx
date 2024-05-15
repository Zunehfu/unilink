import React, { useEffect, useState } from "react";
import ProfileItemForMyProfile from "./ProfileItemForMyProfile";
import { useNavigate } from "react-router-dom";
import pfetch from "../controllers/pfetch";
import { ThreeDots } from "react-loader-spinner";

export default function MyProfile({ toggleProfile }) {
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState("");
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await pfetch("/users?id=myprofile", {
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
                if (response.data.hasOwnProperty("auth"))
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
                        <div className="absolute top-28 h-20 w-full bg-green-950 shadow-md hidden sm:block">
                            <div className=" absolute left-[calc(50%+92px)] right-0 flex justify-center h-full items-center text-4xl">
                                <div className="absolute w-fit h-fit text-white tracking-[10px] font-bold">
                                    MORA
                                </div>
                            </div>
                        </div>
                        <i
                            onClick={() => toggleProfile(false, "myprofile")}
                            className="fa-solid fa-xmark relative left-1.5 top-0 cursor-pointer transition-all hover:scale-150"
                        ></i>

                        <div className="h-9 bg-white rounded-md text-center">
                            Your profile
                        </div>

                        <div className="flex justify-center">
                            <div className="relative z-10 w-48 h-48 border-2 border-white rounded-full overflow-hidden">
                                <img src="../../public/profile.jpg" alt="img" />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-evenly">
                            <div className="m-3 min-w-60">
                                <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                    Account Info
                                </div>
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Username"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Member since"
                                    values={values}
                                    setValues={setValues}
                                    editable={false}
                                />
                            </div>

                            <div className="m-3 min-w-60">
                                <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                    Basic Info
                                </div>
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Name"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Age"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />

                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="University"
                                    values={values}
                                    setValues={setValues}
                                    editable={false}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Major"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Batch"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Relationship status"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Gender"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                            </div>

                            <div className="m-3 min-w-60">
                                <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                    Additional Info
                                </div>
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Contact No"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Uni email"
                                    values={values}
                                    setValues={setValues}
                                    editable={false}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Personal email"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Personal website"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Interested in"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Date of birth"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                />
                            </div>
                        </div>
                        <div className="text-xs text-green-400 text-center py-2 px-3">
                            If you think we are lacking any privacy option,
                            please do let us know! Contact Us
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
