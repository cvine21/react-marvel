import { Component } from "react";
import PropTypes from "prop-types";

import "./charList.scss";

import MarvelSrevice from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false,
	};

	marvelService = new MarvelSrevice();

	componentDidMount() {
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	onCharListLoading = () => {
		this.setState({ newItemLoading: true });
	};

	onCharListLoaded = (newCharList) => {
		let ended = false;
		if (newCharList.length < 9) {
			ended = true;
		}
		this.setState(({ offset, charList }) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}));
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	renderItems(arr) {
		const items = arr.map((item) => {
			const imgStyle =
				item.thumbnail ===
				"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
					? { objectFit: "unset" }
					: { objectFit: "cover" };

			return (
				<li
					className="char__item"
					key={item.id}
					onClick={() => this.props.onCharSelected(item.id)}
				>
					<img
						style={imgStyle}
						src={item.thumbnail}
						alt={item.name}
					/>
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	}

	render() {
		const { charList, loading, error, offset, newItemLoading, charEnded } =
			this.state;
		const items = this.renderItems(charList);
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button
					className="button button__main button__long"
					disabled={newItemLoading}
					onClick={() => this.onRequest(offset)}
					style={{ display: charEnded ? "none" : "block" }}
				>
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
