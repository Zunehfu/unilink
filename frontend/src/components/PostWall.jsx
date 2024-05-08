import React from "react";
import PostImage from "./PostImage";
import PostText from "./PostText";

export default function PostWall() {
    return (
        <div className="grid place-items-center">
            <PostText />
            <PostImage />
            <PostImage />
            <PostImage />
            <PostImage />
        </div>
    );
}
