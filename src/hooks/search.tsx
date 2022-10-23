import { useState } from "react";
import { Character } from "./api";

const useSearchbar = () => {
	const [search, setSearch] = useState("");

	const getSearchedCharacters = (characters: Character[]) => {
		let searchedCharacters = characters;
		if (search) {
			searchedCharacters = characters.filter((char) => {
				const allCharNames = [char.name, ...char.alternate_names].join(" ");
				return allCharNames.toLowerCase().includes(search.toLowerCase());
			});
		}
		return searchedCharacters;
	};

	return { search, setSearch, getSearchedCharacters };
};

export default useSearchbar;
