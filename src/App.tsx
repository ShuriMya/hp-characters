import { BrowserRouter, Routes, Route } from "react-router-dom";
import useHPApi from "./api";

import CharactersListPage from "pages/CharactersList";
import CharacterDetailsPage from "pages/CharacterDetails";

function App() {
	const { charactersList } = useHPApi();
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<CharactersListPage characters={charactersList} />}
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
