import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./charList.scss";

import useMarvelService from "../../services/useMarvelService";
import setListContent from "../../utils/setListContent";

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { process, setProcess, getAllCharacters } = useMarvelService();

	useEffect(() => onRequest(offset, true), []);

	const onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}
		setCharList((charList) => [...charList, ...newCharList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 9);
		setCharEnded(ended);
	};

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllCharacters(offset)
			.then(onCharListLoaded)
			.then(() => setProcess("success"));
	};

	const itemRefs = useRef([]);

	const focusOnItem = (id) => {
		itemRefs.current.forEach((item) =>
			item.classList.remove("char__item_selected")
		);
		itemRefs.current[id].classList.add("char__item_selected");
		itemRefs.current[id].focus();
	};

	const renderItems = (arr) => {
		const items = arr.map((item, i) => {
			const { thumbnail, id, name } = item;

			const imgStyle =
				thumbnail ===
				"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
					? { objectFit: "unset" }
					: { objectFit: "cover" };

			return (
				<li
					className="char__item"
					key={id}
					onClick={() => {
						props.onCharSelected(id);
						focusOnItem(i);
					}}
					ref={(el) => (itemRefs.current[i] = el)}
				>
					<img style={imgStyle} src={thumbnail} alt={name} />
					<div className="char__name">{name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	};

	const content = useMemo(
		() =>
			setListContent(
				process,
				() => renderItems(charList),
				newItemLoading
			),
		[process]
	);

	return (
		<div className="char__list">
			{content}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
				style={{ display: charEnded ? "none" : "block" }}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
