import "./comicsList.scss";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/useMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import { Link } from "react-router-dom";

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();

	useEffect(() => onRequest(offset, true), []);

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}
		setComicsList((comicsList) => [...comicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 8);
		setComicsEnded(ended);
	};

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const renderItems = (arr) => {
		const items = arr.map((item, i) => {
			const { thumbnail, title, price, id } = item;

			return (
				<li className="comics__item" key={i}>
					<Link to={`/comics/${id}`}>
						<img
							src={thumbnail}
							alt={title}
							className="comics__item-img"
						/>
						<div className="comics__item-name">{title}</div>
						<div className="comics__item-price">{price}$</div>
					</Link>
				</li>
			);
		});
		return <ul className="comics__grid">{items}</ul>;
	};

	const items = renderItems(comicsList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
				style={{ display: comicsEnded ? "none" : "block" }}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
