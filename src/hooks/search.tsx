import { createContext, ReactNode, useContext, useState } from "react";
import { Character } from "./api";

interface SearchbarContextT {
	search: string;
	setSearch: (value: string) => void;
	getSearchedCharacters: (characters: Character[]) => Character[];
}

const SearchbarContext = createContext<SearchbarContextT>({
	search: "",
	setSearch: () => {},
	getSearchedCharacters: () => [],
});

export const SearchbarProvider = ({ children }: { children: ReactNode }) => {
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

	return (
		<SearchbarContext.Provider
			value={{ search, setSearch, getSearchedCharacters }}
		>
			{children}
		</SearchbarContext.Provider>
	);
};

export const useSearchbar = () => useContext(SearchbarContext);
