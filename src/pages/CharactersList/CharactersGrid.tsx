import { Character, useHPApi } from "hooks/api";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";

import CharacterPortrait from "pages/CharacterDetails/CharacterPortrait";
import { useSearchbar } from "hooks/search";

interface CharacterGridCardProps {
	character: Character;
}

const CharacterGridCard = ({ character }: CharacterGridCardProps) => {
	return (
		<Link
			to={character.id}
			className="flex flex-col bg-stone-900 rounded-md cursor-pointer hover:underline h-[400px] max-h-[50vh]"
		>
			<CharacterPortrait
				src={character.image}
				className="flex h-5/6 w-full rounded-t-md object-cover object-top"
			/>
			<div className="flex grow justify-center items-center">
				{character.name}
			</div>
		</Link>
	);
};

const CharactersGrid = () => {
	const { getSearchedCharacters } = useSearchbar();
	const { charactersList } = useHPApi();

	if (!charactersList) {
		return <PuffLoader className="m-auto" color="#fff" />;
	}

	const searchedCharacters = getSearchedCharacters(charactersList);

	if (!searchedCharacters.length) {
		return <div>No characters found</div>;
	}

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-[1fr]">
			{searchedCharacters.map((char) => (
				<CharacterGridCard character={char} key={char.id} />
			))}
		</div>
	);
};

export default CharactersGrid;
