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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const characterNamesToId = (name: string, alternateNames: string[]) => {
	return [name, ...alternateNames].join("_").replaceAll(" ", "").toLowerCase();
};

const useHPApi = () => {
	const { data: characters = [] } = useSWR<CharacterAPI[]>(
		"https://hp-api.herokuapp.com/api/characters",
		fetcher
	);
	const charactersList = characters.map((char) => ({
		...char,
		id: characterNamesToId(char.name, char.alternate_names),
	}));

	return { charactersList };
};

export default useHPApi;
