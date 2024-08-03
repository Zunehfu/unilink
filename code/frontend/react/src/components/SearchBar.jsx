import { useEffect, useState } from "react";
import { usePfetch } from "../hooks/usePfetch";
import { Bars } from "react-loader-spinner";
import Err from "../utils/errClass";

export default function SearchBar({ setSearchResults }) {
    const pfetch = usePfetch();
    const [searchTerm, setSearchTerm] = useState("");
    const [prevTerm, setPrevTerm] = useState("");
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchResutls = async () => {
            try {
                const data = await pfetch("/search?q=" + searchTerm, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                setSearchResults(data);
            } catch (err) {
                if (!(err instanceof Err)) console.err(err);
            } finally {
                setSearching(false);
            }
        };
        if (!searching && searchTerm != prevTerm) {
            console.log(prevTerm, searchTerm);
            setSearching(true);
            fetchResutls(searchTerm);
            setPrevTerm(searchTerm);
        }
    }, [searching, searchTerm]);

    return (
        <div className="absolute font-lexend justify-between search-bar flex rounded-2xl bg-offwhite top-10 h-10 w-5/6 max-w-[728px]">
            <div className="w-10 z-10 search-icon flex items-center justify-center">
                <i className=" fa-solid fa-magnifying-glass cursor-pointer hover:text-green-300"></i>
            </div>
            <input
                placeholder="Network with people"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-offwhite search-input rounded-2xl px-3 w-full"
                type="text"
            />

            <div className="flex justify-center items-center mr-2 h-full w-6">
                {searching && (
                    <Bars
                        height="20"
                        width="20"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                )}
            </div>
        </div>
    );
}
