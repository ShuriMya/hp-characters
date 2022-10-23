import { Character, useHPApi } from "hooks/api";
import { Link } from "react-router-dom";
import { PuffLoader } from "react-spinners";

import CharacterPortrait from "pages/CharacterDetails/CharacterPortrait";
import { useFilter } from "hooks/filter";

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
	const { getSearchedCharacters, paginate } = useFilter();
	const { allCharacters } = useHPApi();

	if (!allCharacters) {
		return <PuffLoader className="m-auto" color="#fff" />;
	}

	const characters = getSearchedCharacters(allCharacters);

	if (!characters.length) {
		return <div>No characters found</div>;
	}

	return (
		<div>
			<div className="flex text-sm mb-2 justify-end">
				{characters.length} character{characters.length > 1 && "s"}
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-[1fr]">
				{paginate(characters).map((char) => (
					<CharacterGridCard character={char} key={char.id} />
				))}
			</div>
		</div>
	);
};

export default CharactersGrid;
