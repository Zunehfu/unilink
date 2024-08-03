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
        <>
            <i
                onClick={() => setTab(0)}
                className="text-white hover:text-emerald-500 cursor-pointer fa-solid fa-arrow-left absolute left-3 top-3 scale-150"
            ></i>
            <SearchBar setSearchResults={setSearchResults} />
            <SearchResults searchResults={searchResults} />
        </>
    );
}
