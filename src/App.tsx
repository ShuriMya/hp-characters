import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterProvider } from "./hooks/api";

import CharactersListPage from "pages/CharactersList";
import CharacterDetailsPage from "pages/CharacterDetails";
import { FilterProvider } from "hooks/filter";

function App() {
	return (
		<BrowserRouter>
			<CharacterProvider>
				<FilterProvider>
					<Routes>
						<Route path="/" element={<CharactersListPage />} />
						<Route path="/:characterId" element={<CharacterDetailsPage />} />
					</Routes>
				</FilterProvider>
			</CharacterProvider>
		</BrowserRouter>
	);
}

export default App;
