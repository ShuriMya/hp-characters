import { useSearchbar } from "hooks/search";
import { ChangeEvent } from "react";

const Searchbar = () => {
	const { search: value, setSearch: onChange } = useSearchbar();

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="mb-6 flex items-center">
			<input
				className="bg-stone-900 py-2 px-4 rounded-md w-full md:w-1/2 lg:w-1/4"
				type="text"
				value={value}
				onChange={onSearchChange}
				placeholder="Search by name/alt name"
			/>
		</div>
	);
};

export default Searchbar;
