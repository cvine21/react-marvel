import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import "./charList.scss";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/useMarvelService";

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllCharacters } = useMarvelService();

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
		getAllCharacters(offset).then(onCharListLoaded);
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

	const items = renderItems(charList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{items}
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
