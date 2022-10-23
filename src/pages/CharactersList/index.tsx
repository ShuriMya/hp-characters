import CharactersGrid from "./CharactersGrid";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";

const CharactersListPage = () => {
	return (
		<div className="flex flex-col h-full">
			<h1 className="text-4xl font-bold mt-4 mb-12">
				All Harry Potter Characters
			</h1>
			<Searchbar />
			<CharactersGrid />
			<Pagination />
		</div>
	);
};

export default CharactersListPage;
