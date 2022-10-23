import { BrowserRouter, Routes, Route } from "react-router-dom";
import useHPApi from "./hooks/api";

import CharactersListPage from "pages/CharactersList";
import CharacterDetailsPage from "pages/CharacterDetails";
import { SearchbarProvider } from "hooks/search";

function App() {
	const { charactersList } = useHPApi();
	console.log("aaa");

	return (
		<BrowserRouter>
			<SearchbarProvider>
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
			</SearchbarProvider>
		</BrowserRouter>
	);
}

export default App;
