import { createContext, ReactNode, useContext, useState } from "react";
import { Character } from "./api";

export const PAGE_SIZE = 20;

interface FilterContextT {
	page: number;
	search: string;
	setSearch: (value: string) => void;
	setPage: (value: number) => void;
	getSearchedCharacters: (characters: Character[] | undefined) => Character[];
	paginate: (characters: Character[]) => Character[];
}

const FilterContext = createContext<FilterContextT>({
	page: 1,
	search: "",
	setSearch: () => {},
	setPage: () => {},
	getSearchedCharacters: () => [],
	paginate: () => [],
});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
	const [{ page, search }, setFilter] = useState({
		search: "",
		page: 1,
	});

	const setSearch = (value: string) => {
		setFilter({ search: value, page: 1 });
	};

	const setPage = (page: number) => {
		setFilter((oldFilter) => ({ ...oldFilter, page }));
	};

	const paginate = (characters: Character[]) => {
		const endIndex = Math.min(characters.length, page * PAGE_SIZE);
		const startIndex = Math.max(0, (page - 1) * PAGE_SIZE);

		return characters.slice(startIndex, endIndex);
	};

	const getSearchedCharacters = (characters: Character[] | undefined) => {
		if (!characters) return [];

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
		<FilterContext.Provider
			value={{
				page,
				search,
				setPage,
				setSearch,
				paginate,
				getSearchedCharacters,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilter = () => useContext(FilterContext);
