import React, { useState } from "react";
import ProfileItem from "./ProfileItem";

export default function MyProfile({ toggleProfileVisibility }) {
    const [edit, setEdit] = useState("");
    const [values, setValues] = useState({
        Username: "@deneth.official",
        "Member since": "date",
        Name: "Deneth Priyadarshana",
        Age: "20",
        University: "University of Moratuwa",
        Major: "BSc. Engineering Honours",
        Batch: "2023",
        "Relationship status": "Single",
        Gender: "Male",
        "Contact No": "0721432218",
        "Uni email": "priyadarshanasad.23@uom.lk",
        "Personal email": "sadpriyadarshana@gmail.com",
        "Personal website": "uni.link",
        "Interested in": "Women",
        "Date of birth": "2003-10-20",
    });

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm ">
                <div className="relative rounded-md h-[90vh] w-[90vw] max-w-[900px] bg-white overflow-y-scroll">
                    <div className="absolute top-28 h-20 w-full bg-green-950 shadow-md hidden sm:block">
                        <div className=" absolute left-[calc(50%+92px)] right-0 flex justify-center h-full items-center text-4xl">
                            <div className="absolute w-fit h-fit text-white tracking-[10px] font-bold">
                                MORA
                            </div>
                        </div>
                    </div>
                    <i
                        onClick={toggleProfileVisibility}
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
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Username"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Member since"
                                values={values}
                                setValues={setValues}
                            />
                        </div>

                        <div className="m-3 min-w-60">
                            <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                Basic Info
                            </div>
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Name"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Age"
                                values={values}
                                setValues={setValues}
                            />

                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="University"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Major"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Batch"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Relationship status"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Gender"
                                values={values}
                                setValues={setValues}
                            />
                        </div>

                        <div className="m-3 min-w-60">
                            <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                Additional Info
                            </div>
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Contact No"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Uni email"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Personal email"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Personal website"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Interested in"
                                values={values}
                                setValues={setValues}
                            />
                            <ProfileItem
                                edit={edit}
                                setEdit={setEdit}
                                field="Date of birth"
                                values={values}
                                setValues={setValues}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
