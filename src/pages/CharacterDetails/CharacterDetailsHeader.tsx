import { Character } from "hooks/api";

interface CharacterDetailsHeaderProps {
	character: Character;
}

const CharacterDetailsHeader = ({ character }: CharacterDetailsHeaderProps) => {
	const { name, alternate_names: altNames } = character;

	return (
		<div className="mb-4 py-4 border-solid border-b-2 border-stone-600">
			<h1 className="text-3xl font-bold">{name}</h1>
			{!!altNames.length && <div>(Also known as: {altNames.join(", ")})</div>}
		</div>
	);
};

export default CharacterDetailsHeader;
