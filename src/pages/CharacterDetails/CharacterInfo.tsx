import { ReactNode } from "react";
import { capitalize } from "lodash";

import { Character } from "api";

interface CharacterInfoProps {
	character: Character;
}

const renderWandInfo = (wand: Character["wand"]) => {
	if (!wand.core && !wand.core && !wand.length) return undefined;

	return (
		<ul>
			<li>Wood: {capitalize(wand.wood) || "Unknown"} </li>
			<li>Core: {capitalize(wand.core) || "Unknown"} </li>
			<li>Length: {wand.length || "Unknown"} </li>
		</ul>
	);
};

const renderAltActorsInfo = (altActors: string[]) => {
	if (!altActors.length) return undefined;

	return (
		<ul>
			{altActors.map((altActor) => (
				<li key={altActor}>{altActor}</li>
			))}
		</ul>
	);
};

const CharacterInfo = ({ character }: CharacterInfoProps) => {
	const {
		gender,
		species,
		house,
		dateOfBirth,
		ancestry,
		wand,
		actor,
		alternate_actors,
		alive,
		wizard,
		hogwartsStaff,
		hogwartsStudent,
	} = character;

	const tableRows: Array<[string, ReactNode]> = [
		["Gender", capitalize(gender)],
		["Species", capitalize(species)],
		["House", house],
		["Date of Birth", dateOfBirth],
		["Ancestry", capitalize(ancestry)],
		["Wand", renderWandInfo(wand)],
		["Actor", actor],
		["Alternate actors", renderAltActorsInfo(alternate_actors)],
		["Status", alive ? "Alive" : "Deceased"],
		["Wizard", wizard ? "Yes" : "No"],
		["Hogwarts Student", hogwartsStudent ? "Yes" : "No"],
		["Hogwarts Staff", hogwartsStaff ? "Yes" : "No"],
	];

	return (
		<table>
			<tbody>
				{tableRows.map(
					(row) =>
						!!row[1] && (
							<tr key={row[0]} className="m-2">
								<td className="font-bold">{row[0]}</td>
								<td className="p-2">{row[1]}</td>
							</tr>
						)
				)}
			</tbody>
		</table>
	);
};

export default CharacterInfo;
