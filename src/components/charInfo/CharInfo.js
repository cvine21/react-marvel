import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./charInfo.scss";
import useMarvelSrevice from "../../services/useMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelSrevice();

	useEffect(() => updateChar(), [charId]);

	const updateChar = () => {
		if (!charId) return;

		clearError();
		getCharacter(charId).then(onCharLoaded);
	};

	const onCharLoaded = (char) => setChar(char);

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	const imgStyle =
		thumbnail ===
		"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
			? { objectFit: "unset" }
			: { objectFit: "cover" };

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "No comics"}
				{comics.slice(0, 9).map((item, i) => (
					<li className="char__comics-item" key={i}>
						{item.name}
					</li>
				))}
			</ul>
		</>
	);
};

CharInfo.propTypes = { charId: PropTypes.number };

export default CharInfo;
