import { useHPApi } from "hooks/api";
import { PAGE_SIZE, useFilter } from "hooks/filter";

interface PageButtonProps {
	pageNum: number;
	isLast: boolean;
}

const PageButton = ({ pageNum, isLast }: PageButtonProps) => {
	const { page: currentPage, setPage } = useFilter();

	let classNames = "px-4 py-2 border border-[#10141b]";
	if (pageNum === 1) classNames += " rounded-l-lg";
	if (isLast) classNames += " rounded-r-lg";

	if (pageNum === currentPage) classNames += " bg-orange-800";
	else classNames += " bg-stone-900";

	const onPageChange = () => {
		setPage(pageNum);
		window.scrollTo(0, 0);
	};

	return (
		<button className={classNames} onClick={onPageChange}>
			{pageNum}
		</button>
	);
};

const Pagination = () => {
	const { page: currentPage, getSearchedCharacters } = useFilter();
	const { allCharacters } = useHPApi();

	const nbPages = Math.ceil(
		getSearchedCharacters(allCharacters).length / PAGE_SIZE
	);
	if (!nbPages) return null;

	const pageWindow = [currentPage - 1, currentPage, currentPage + 1].filter(
		(page) => page > 0 && page <= nbPages
	);
	return (
		<div className="mt-4">
			{!pageWindow.includes(1) && (
				<>
					<PageButton pageNum={1} isLast={false} />
					{!pageWindow.includes(2) && <span className="px-2">...</span>}
				</>
			)}
			{pageWindow.map((page) => (
				<PageButton key={page} pageNum={page} isLast={page === nbPages} />
			))}
			{!pageWindow.includes(nbPages) && (
				<>
					{!pageWindow.includes(nbPages - 1) && (
						<span className="px-2">...</span>
					)}
					<PageButton pageNum={nbPages} isLast={true} />
				</>
			)}
		</div>
	);
};

export default Pagination;
