import React, { useEffect, useState } from "react";
import ProfileItemForMyProfile from "./ProfileItemForMyProfile";
import { useNavigate } from "react-router-dom";
import pfetch from "../utils/pfetch";
import { ThreeDots } from "react-loader-spinner";
import svalues from "../utils/currentlySupportedValues";
import { Toaster, toast } from "sonner";

export default function MyProfile({ toggleProfile }) {
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState("");
    const [values, setValues] = useState({});
    const navigate = useNavigate();

    const handleProfilePictureEdit = () => {};

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await pfetch("/users?id=myprofile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setValues({
                    Username: data.username || "",
                    "Member since": data.created_at || "",
                    Name: data.name || "",
                    Age: data.age || "",
                    University: data.university || "",
                    Major: data.major || "",
                    Batch: data.batch || "",
                    "Relationship status": data.relationship_status || "",
                    Gender: data.gender || "",
                    "Contact No": data.contact || "",
                    "Uni email": data.email || "",
                    "Personal email": data.personal_email || "",
                    "Personal website": data.website || "",
                    "Interested in": data.interested_in || "",
                    "Date of birth": data.birth_date || "",
                });
            } catch (err) {
                console.error("Fetch error:", err);
                if (err.code === "AUTH_FAIL") return navigate("/signin");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
        toast.info(
            "You can adjust what details to display or not in settings under 'privacy'"
        );
    }, []);

    // const handleProfilePictureEdit = () => {};

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm ">
            <Toaster position="bottom-center" richColors />
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
                        {/* <div className="absolute top-28 h-20 w-full bg-green-950 shadow-md hidden sm:block">
                            <div className=" absolute left-[calc(50%+92px)] right-0 flex justify-center h-full items-center text-4xl">
                                <div className="absolute w-fit h-fit text-white tracking-[10px] font-bold">
                                    MORA
                                </div>
                            </div>
                        </div> */}
                        <i
                            onClick={() => toggleProfile(false, "myprofile")}
                            className="fa-solid fa-xmark relative left-1.5 top-0 cursor-pointer transition-all hover:scale-150"
                        ></i>

                        <div className="h-9 bg-white rounded-md text-center">
                            Your profile
                        </div>

                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 border-2 border-white rounded-full overflow-hidden">
                                    <img
                                        src="../../public/profile.jpg"
                                        alt="img"
                                    />
                                </div>
                                <div
                                    onClick={handleProfilePictureEdit}
                                    className="bg-green-100 hover:bg-white hover:border-2 hover:border-green-500 transition-all cursor-pointer rounded-full h-10 w-10 flex justify-center items-center absolute right-1 bottom-4"
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </div>
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
                                    editable={false}
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
                                    items={svalues.major_l}
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
                                    items={svalues.relationship_status_l}
                                />
                                <ProfileItemForMyProfile
                                    editingField={editingField}
                                    setEditingField={setEditingField}
                                    field="Gender"
                                    values={values}
                                    setValues={setValues}
                                    editable={true}
                                    items={svalues.gender_l}
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
                                    items={svalues.interested_in_l}
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
