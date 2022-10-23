import { Link, useParams } from "react-router-dom";

import { Character } from "hooks/api";
import CharacterDetailsHeader from "./CharacterDetailsHeader";
import CharacterPortrait from "./CharacterPortrait";
import CharacterInfo from "./CharacterInfo";

interface CharacterDetailsPageProps {
	characters: Character[];
}

const CharacterDetailsPage = ({ characters }: CharacterDetailsPageProps) => {
	const { characterId } = useParams();
	const character = characters.find((char) => char.id === characterId);

	if (!character) return <div>Character not found</div>;

	return (
		<div>
			<Link to={"/"} className="flex hover:underline mb-16">
				← Back to all characters
			</Link>
			<CharacterDetailsHeader character={character} />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div className="flex items-center col-span-1">
					<CharacterPortrait
						src={character.image}
						className="w-full max-h-[400px] object-contain"
					/>
				</div>
				<div className="col-span-1">
					<CharacterInfo character={character} />
				</div>
			</div>
		</div>
	);
};

export default CharacterDetailsPage;
