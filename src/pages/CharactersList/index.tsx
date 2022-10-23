import { Character } from "hooks/api";
import CharactersGrid from "./CharactersGrid";
import Searchbar from "./Searchbar";

interface CharactersListPageProps {
	characters: Character[];
	search: string;
	setSearch: (value: string) => void;
}

const CharactersListPage = ({
	characters,
	search,
	setSearch,
}: CharactersListPageProps) => {
	return (
		<div>
			<h1 className="text-4xl font-bold mt-4 mb-12">All characters</h1>
			<Searchbar value={search} onChange={setSearch} />
			<CharactersGrid characters={characters} />
		</div>
	);
};

export default CharactersListPage;
