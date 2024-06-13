import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SmallSpinner() {
    return (
        <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="rgb(16, 185, 129)"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
}
