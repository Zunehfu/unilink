export default function searchList(list, searchTerm) {
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/%/g, "");
    const calculateScore = (item, searchTerm) => {
        const normalizedItem = item.toLowerCase();

        if (normalizedItem === searchTerm) return 3;

        if (
            normalizedItem.startsWith(searchTerm) ||
            normalizedItem.endsWith(searchTerm)
        )
            return 2;

        if (normalizedItem.includes(searchTerm)) return 1;

        return 0;
    };
    const scoredList = list.map((item) => ({
        item,
        score: calculateScore(item, normalizedSearchTerm),
    }));
    const filteredList = scoredList.filter(
        (scoredItem) => scoredItem.score > 0
    );
    filteredList.sort((a, b) => b.score - a.score);
    return filteredList.map((scoredItem) => scoredItem.item);
}
