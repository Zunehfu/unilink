import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { toast } from "sonner";
import { TabContext } from "../contexts/TabContext";

export default function Search() {
    const { setTab } = useContext(TabContext);
    useEffect(() => {
        toast.info(
            "Only the top 10 results are displayed. Click the search icon to see all results.",
            { position: "bottom-center" }
        );
    }, []);
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div className="backdrop-blur-sm bg-opacity-50 fixed top-0 left-0 w-full h-full bg-black flex justify-center">
            <i
                onClick={() => setTab(0)}
                className="text-white hover:text-green-300 cursor-pointer fa-solid fa-arrow-left absolute left-3 top-3 scale-150"
            ></i>
            <SearchBar setSearchResults={setSearchResults} />
            <SearchResults searchResults={searchResults} />
        </div>
    );
}
