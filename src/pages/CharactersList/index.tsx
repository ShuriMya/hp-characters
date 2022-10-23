import CharactersGrid from "./CharactersGrid";
import Searchbar from "./Searchbar";

const CharactersListPage = () => {
	return (
		<div className="flex flex-col h-full">
			<h1 className="text-4xl font-bold mt-4 mb-12">All characters</h1>
			<Searchbar />
			<CharactersGrid />
		</div>
	);
};

export default CharactersListPage;
