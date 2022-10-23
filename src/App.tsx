import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CharacterProvider } from "./hooks/api";

import CharactersListPage from "pages/CharactersList";
import CharacterDetailsPage from "pages/CharacterDetails";
import { SearchbarProvider } from "hooks/search";

function App() {
	return (
		<BrowserRouter>
			<CharacterProvider>
				<SearchbarProvider>
					<Routes>
						<Route path="/" element={<CharactersListPage />} />
						<Route path="/:characterId" element={<CharacterDetailsPage />} />
					</Routes>
				</SearchbarProvider>
			</CharacterProvider>
		</BrowserRouter>
	);
}

export default App;
