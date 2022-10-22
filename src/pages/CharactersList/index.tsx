import { Character } from "api";
import CharactersGrid from "./CharactersGrid";

interface CharactersListPageProps {
	characters: Character[];
}

const CharactersListPage = ({ characters }: CharactersListPageProps) => {
	return (
		<div>
			<h1 className="text-4xl font-bold mt-4 mb-12">All characters</h1>
			<CharactersGrid characters={characters} />
		</div>
	);
};

export default CharactersListPage;
