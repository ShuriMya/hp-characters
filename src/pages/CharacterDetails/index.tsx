import { Link, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";

import { useHPApi } from "hooks/api";
import CharacterDetailsHeader from "./CharacterDetailsHeader";
import CharacterPortrait from "./CharacterPortrait";
import CharacterInfo from "./CharacterInfo";

const CharacterDetailsPage = () => {
	const { allCharacters } = useHPApi();
	const { characterId } = useParams();

	if (!allCharacters) {
		return (
			<div className="flex flex-col h-full">
				<PuffLoader className="m-auto" color="#fff" />
			</div>
		);
	}

	const character = allCharacters.find((char) => char.id === characterId);

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
