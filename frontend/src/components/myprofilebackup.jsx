import React, { useState } from "react";
import ProfileItem from "./ProfileItem";

export default function MyProfile({ toggleProfileVisibility }) {
    const [values, setValues] = useState({
        "Account Info": {
            Username: {
                value: "@deneth.official",
                editable: true,
                editing: false,
                saving: false,
            },
            "Member since": {
                value: "date",
                editable: false,
                editing: false,
                saving: false,
            },
        },
        "Basic Info": {
            Name: {
                value: "Deneth Priyadarshana",
                editable: true,
                editing: false,
                saving: false,
            },
            Age: {
                value: "20",
                editable: false,
                editing: false,
                saving: false,
            },
            University: {
                value: "University of Moratuwa",
                editable: false,
                editing: false,
                saving: false,
            },
            Major: {
                value: "Engineering",
                editable: true,
                editing: false,
                saving: false,
            },
            Batch: {
                value: "2023",
                editable: true,
                editing: false,
                saving: false,
            },
            "Relationship status": {
                value: "Single",
                editable: true,
                editing: false,
                saving: false,
            },
            Gender: {
                value: "Male",
                editable: true,
                editing: false,
                saving: false,
            },
        },
        "Additional Info": {
            "Contact No": {
                value: "0721432218",
                editable: true,
                editing: false,
                saving: false,
            },
            "Uni email": {
                value: "priyadarshanasad.23@uom.lk",
                editable: true,
                editing: false,
                saving: false,
            },
            "Personal email": {
                value: "sadpriyadarshana@gmail.com",
                editable: true,
                editing: false,
                saving: false,
            },
            "Personal website": {
                value: "uni.link",
                editable: true,
                editing: false,
                saving: false,
            },
            "Interested in": {
                value: "Women",
                editable: true,
                editing: false,
                saving: false,
            },
            "Date of birth": {
                value: "2003-10-20",
                editable: true,
                editing: false,
                saving: false,
            },
        },
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
                        {Object.entries(values).map(
                            ([category, categoryValue]) => (
                                <div key={category} className="m-3 min-w-60">
                                    <div className="rounded-md text-center bg-white text-green-900 font-bold">
                                        {category}
                                    </div>
                                    {Object.entries(categoryValue).map(
                                        ([key, value]) => (
                                            <ProfileItem
                                                key={key}
                                                editable={value.editable}
                                                field={key}
                                                value={value.value}
                                                saving={value.saving}
                                                setValues={setValues}
                                            />
                                        )
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
