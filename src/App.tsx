import { BrowserRouter, Routes, Route } from "react-router-dom";
import useHPApi from "./hooks/api";

import CharactersListPage from "pages/CharactersList";
import CharacterDetailsPage from "pages/CharacterDetails";
import useSearchbar from "hooks/search";

function App() {
	const { charactersList } = useHPApi();
	const { search, setSearch, getSearchedCharacters } = useSearchbar();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<CharactersListPage
							characters={getSearchedCharacters(charactersList)}
							search={search}
							setSearch={setSearch}
						/>
					}
				/>
				<Route
					path="/:characterId"
					element={<CharacterDetailsPage characters={charactersList} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
