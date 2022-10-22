interface CharacterPortraitProps {
	src: string;
	className?: string;
}

const PLACEHOLDER_PORTRAIT_SRC =
	"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

const CharacterPortrait = ({ src, className }: CharacterPortraitProps) => {
	return <img className={className} src={src || PLACEHOLDER_PORTRAIT_SRC} />;
};

export default CharacterPortrait;
