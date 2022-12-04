import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./charInfo.scss";
import useMarvelSrevice from "../../services/useMarvelService";
import setContent from "../../utils/setContent";

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);

	const { process, setProcess, getCharacterById, clearError } =
		useMarvelSrevice();

	useEffect(() => updateChar(), [charId]);

	const updateChar = () => {
		if (!charId) return;

		clearError();
		getCharacterById(charId)
			.then(onCharLoaded)
			.then(() => setProcess("success"));
	};

	const onCharLoaded = (char) => setChar(char);

	const content = setContent(process, View, char);

	return <div className="char__info">{content}</div>;
};

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;
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
