import { Character } from "api";
import { Link } from "react-router-dom";

import CharacterPortrait from "pages/CharacterDetails/CharacterPortrait";

interface CharacterGridCardProps {
	character: Character;
}

interface CharactersGridProps {
	characters: Character[];
}

const CharacterGridCard = ({ character }: CharacterGridCardProps) => {
	return (
		<Link
			to={character.id}
			className="flex flex-col bg-stone-900 rounded-md cursor-pointer hover:underline"
		>
			<CharacterPortrait
				src={character.image}
				className="flex h-5/6 max-h-[50vh] w-full rounded-t-md object-cover object-top"
			/>
			<div className="flex grow justify-center items-center">
				{character.name}
			</div>
		</Link>
	);
};

const CharactersGrid = ({ characters }: CharactersGridProps) => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-[1fr]">
			{characters.map((char) => (
				<CharacterGridCard character={char} key={char.id} />
			))}
		</div>
	);
};

export default CharactersGrid;
