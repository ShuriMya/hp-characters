import { createContext, ReactNode, useContext } from "react";
import useSWR from "swr";

interface CharacterAPI {
	name: string;
	alternate_names: string[];
	species: string;
	gender: string;
	house: string;
	dateOfBirth: string;
	yearOfBirth: number;
	wizard: number;
	ancestry: string;
	eyeColour: string;
	hairColour: string;
	wand: {
		wood: string;
		core: string;
		length: number;
	};
	patronus: string;
	hogwartsStudent: boolean;
	hogwartsStaff: boolean;
	actor: string;
	alternate_actors: string[];
	alive: boolean;
	image: string;
}

export interface Character extends CharacterAPI {
	id: string;
}

interface CharactersContextT {
	allCharacters: Character[] | undefined;
}

const CharactersContext = createContext<CharactersContextT>({
	allCharacters: undefined,
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const characterNamesToId = (name: string, alternateNames: string[]) => {
	return [name, ...alternateNames].join("_").replaceAll(" ", "").toLowerCase();
};

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
	const { data } = useSWR<CharacterAPI[]>(
		"https://hp-api.herokuapp.com/api/characters",
		fetcher
	);

	let allCharacters = undefined;
	if (data) {
		allCharacters = data.map((char) => ({
			...char,
			id: characterNamesToId(char.name, char.alternate_names),
		}));
	}

	return (
		<CharactersContext.Provider value={{ allCharacters }}>
			{children}
		</CharactersContext.Provider>
	);
};

export const useHPApi = () => useContext(CharactersContext);
