import SearchResultCard from "./SearchResultCard";

export default function SearchResults({ searchResults }) {
    return (
        <div className="bg-transparent absolute top-24 w-5/6 max-w-[728px]">
            {searchResults.map((item, index) => (
                <SearchResultCard
                    key={item.user_id}
                    roundTop={index === 0}
                    roundBottom={index === searchResults.length - 1}
                    item={item}
                />
            ))}
        </div>
    );
}
