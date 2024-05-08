import Header from "./components/Header";
import PostWall from "./components/PostWall";
import AddPost from "./components/AddPost";
import AddPostPage from "./components/AddPostPage";
import { useState } from "react";

export default function App() {
    const [addPostVisibility, setAddPostVisibility] = useState(false);

    function toggleAddPostVisibility() {
        setAddPostVisibility(!addPostVisibility);
    }

    return (
        <div>
            <Header />
            <AddPost toggleAddPostVisibility={toggleAddPostVisibility} />
            <PostWall />
            {addPostVisibility && (
                <AddPostPage
                    toggleAddPostVisibility={toggleAddPostVisibility}
                />
            )}
        </div>
    );
}
