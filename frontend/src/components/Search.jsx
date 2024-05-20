import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Toaster, toast } from "sonner";

export default function Search({ toggleSearchVisibility }) {
    useEffect(() => {
        toast.info(
            "Only the top 10 results are displayed. Click the search icon to see all results."
        );
    }, []);
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div className="backdrop-blur-sm bg-opacity-50 fixed top-0 left-0 w-full h-full bg-black flex justify-center">
            <i
                onClick={toggleSearchVisibility}
                className="text-white hover:text-green-300 cursor-pointer fa-solid fa-arrow-left absolute left-3 top-3 scale-150"
            ></i>
            <SearchBar setSearchResults={setSearchResults} />
            <SearchResults searchResults={searchResults} />
            <Toaster position="bottom-center" richColors />
        </div>
    );
}
